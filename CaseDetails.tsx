import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppHeader from '@/components/common/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { getCaseById, updateCase } from '@/db/api';
import { toast } from 'sonner';
import type { Case } from '@/types/types';

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');

  useEffect(() => {
    const fetchCase = async () => {
      if (!id) return;
      
      try {
        const data = await getCaseById(id);
        if (data) {
          setCaseData(data);
          setStatus(data.status);
          setPriority(data.priority);
          setAssignedTo(data.assigned_to || '');
          setResolutionNotes(data.resolution_notes || '');
        }
      } catch (error) {
        console.error('Error fetching case:', error);
        toast.error('Failed to load case details');
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  const handleSave = async () => {
    if (!id) return;

    setSaving(true);
    try {
      await updateCase(id, {
        status: status as any,
        priority: priority as any,
        assigned_to: assignedTo || undefined,
        resolution_notes: resolutionNotes || undefined
      });
      toast.success('Case updated successfully');
      navigate('/cases');
    } catch (error) {
      console.error('Error updating case:', error);
      toast.error('Failed to update case');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container mx-auto px-4 xl:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading case details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container mx-auto px-4 xl:px-8 py-8">
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground mb-4">Case not found</p>
              <Button onClick={() => navigate('/cases')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cases
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="container mx-auto px-4 xl:px-8 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/cases')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cases
          </Button>
          <h1 className="text-3xl font-bold mb-2">{caseData.case_number}</h1>
          <p className="text-muted-foreground">Case Details and Investigation</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle>Case Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Customer Name</p>
                    <p className="font-medium">{caseData.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Customer ID</p>
                    <p className="font-medium">{caseData.customer_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Case Type</p>
                    <p className="font-medium">{caseData.case_type.replace('_', ' ').toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Created Date</p>
                    <p className="font-medium">{new Date(caseData.created_date).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle>Resolution Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  placeholder="Add investigation notes, findings, and resolution details..."
                  rows={8}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle>Case Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Priority</label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Assigned To</label>
                  <Select value={assignedTo} onValueChange={setAssignedTo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select investigator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john_doe">John Doe</SelectItem>
                      <SelectItem value="jane_smith">Jane Smith</SelectItem>
                      <SelectItem value="mike_johnson">Mike Johnson</SelectItem>
                      <SelectItem value="sarah_williams">Sarah Williams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
                  {saving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
