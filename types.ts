// Database types matching SQL schema

export type DocumentType = 'id' | 'kyc' | 'financial' | 'business';
export type DocumentStatus = 'pending' | 'processing' | 'verified' | 'flagged' | 'rejected';
export type CaseType = 'kyc_fraud' | 'aml_violation' | 'document_forgery' | 'identity_theft';
export type CasePriority = 'low' | 'medium' | 'high' | 'critical';
export type CaseStatus = 'open' | 'investigating' | 'resolved' | 'closed';
export type AlertType = 'high_risk_document' | 'suspicious_pattern' | 'aml_flag' | 'duplicate_identity';
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface Document {
  id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  file_url: string;
  document_type: DocumentType;
  upload_date: string;
  status: DocumentStatus;
}

export interface VerificationResult {
  id: string;
  document_id: string;
  risk_score: number;
  is_fraudulent: boolean;
  fraud_indicators: string[];
  confidence_level: number;
  verification_date: string;
  heatmap_data: HeatmapPoint[];
}

export interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
  reason: string;
}

export interface Case {
  id: string;
  case_number: string;
  customer_name: string;
  customer_id: string;
  case_type: CaseType;
  priority: CasePriority;
  status: CaseStatus;
  assigned_to?: string;
  created_date: string;
  updated_date: string;
  resolution_notes?: string;
}

export interface AuditTrail {
  id: string;
  action_type: string;
  entity_type: string;
  entity_id?: string;
  user_id: string;
  action_details: Record<string, unknown>;
  blockchain_hash: string;
  timestamp: string;
}

export interface Alert {
  id: string;
  alert_type: AlertType;
  severity: AlertSeverity;
  entity_id?: string;
  message: string;
  is_read: boolean;
  created_date: string;
}

// UI-specific types
export interface DashboardStats {
  totalDocuments: number;
  flaggedDocuments: number;
  activeCases: number;
  riskScore: number;
}

export interface ChartData {
  name: string;
  value: number;
}
