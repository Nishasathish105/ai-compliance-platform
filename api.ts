import { supabase } from './supabase';
import type { Document, VerificationResult, Case, AuditTrail, Alert } from '@/types/types';

// Helper to get or create user ID
export const getUserId = (): string => {
  let userId = localStorage.getItem('compliance_user_id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('compliance_user_id', userId);
  }
  return userId;
};

// Documents API
export const uploadDocument = async (file: File, documentType: string) => {
  const userId = getUserId();
  const fileName = `${userId}/${Date.now()}_${file.name}`;
  
  // Upload to Supabase storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('documents')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('documents')
    .getPublicUrl(fileName);

  // Create document record
  const { data, error } = await supabase
    .from('documents')
    .insert({
      user_id: userId,
      file_name: file.name,
      file_type: file.type,
      file_url: publicUrl,
      document_type: documentType,
      status: 'pending'
    })
    .select()
    .maybeSingle();

  if (error) throw error;
  return data as Document;
};

export const getDocuments = async () => {
  const userId = getUserId();
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', userId)
    .order('upload_date', { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const getDocumentById = async (id: string) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data as Document | null;
};

// Verification Results API
export const createVerificationResult = async (documentId: string, result: Partial<VerificationResult>) => {
  const { data, error } = await supabase
    .from('verification_results')
    .insert({
      document_id: documentId,
      ...result
    })
    .select()
    .maybeSingle();

  if (error) throw error;
  return data as VerificationResult;
};

export const getVerificationResult = async (documentId: string) => {
  const { data, error } = await supabase
    .from('verification_results')
    .select('*')
    .eq('document_id', documentId)
    .maybeSingle();

  if (error) throw error;
  return data as VerificationResult | null;
};

// Cases API
export const getCases = async () => {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .order('created_date', { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const getCaseById = async (id: string) => {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data as Case | null;
};

export const createCase = async (caseData: Partial<Case>) => {
  const caseNumber = `CASE-${Date.now()}`;
  const { data, error } = await supabase
    .from('cases')
    .insert({
      case_number: caseNumber,
      ...caseData
    })
    .select()
    .maybeSingle();

  if (error) throw error;
  return data as Case;
};

export const updateCase = async (id: string, updates: Partial<Case>) => {
  const { data, error } = await supabase
    .from('cases')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data as Case;
};

// Audit Trail API
export const getAuditTrail = async (limit = 50) => {
  const { data, error } = await supabase
    .from('audit_trail')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const createAuditEntry = async (
  actionType: string,
  entityType: string,
  entityId: string,
  actionDetails: Record<string, unknown>
) => {
  const userId = getUserId();
  const { data, error } = await supabase.rpc('create_audit_entry', {
    p_action_type: actionType,
    p_entity_type: entityType,
    p_entity_id: entityId,
    p_user_id: userId,
    p_action_details: actionDetails
  });

  if (error) throw error;
  return data;
};

// Alerts API
export const getAlerts = async () => {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .order('created_date', { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const getUnreadAlerts = async () => {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('is_read', false)
    .order('created_date', { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const markAlertAsRead = async (id: string) => {
  const { data, error } = await supabase
    .from('alerts')
    .update({ is_read: true })
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data as Alert;
};

export const createAlert = async (alert: Partial<Alert>) => {
  const { data, error } = await supabase
    .from('alerts')
    .insert(alert)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data as Alert;
};

// Dashboard Stats
export const getDashboardStats = async () => {
  const userId = getUserId();
  
  // Get total documents
  const { count: totalDocs } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  // Get flagged documents
  const { count: flaggedDocs } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'flagged');

  // Get active cases
  const { count: activeCases } = await supabase
    .from('cases')
    .select('*', { count: 'exact', head: true })
    .in('status', ['open', 'investigating']);

  // Calculate average risk score
  const { data: verifications } = await supabase
    .from('verification_results')
    .select('risk_score');

  const avgRisk = verifications && verifications.length > 0
    ? Math.round(verifications.reduce((sum, v) => sum + (v.risk_score || 0), 0) / verifications.length)
    : 0;

  return {
    totalDocuments: totalDocs || 0,
    flaggedDocuments: flaggedDocs || 0,
    activeCases: activeCases || 0,
    riskScore: avgRisk
  };
};
