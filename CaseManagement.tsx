import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '@/components/common/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderOpen, Search, Plus, ArrowRight, Filter } from 'lucide-react';
import { getCases } from '@/db/api';
import type { Case } from '@/types/types';

const CaseManagement = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const data = await getCases();
        setCases(data);
        setFilteredCases(data);
      } catch (error) {
        console.error('Error fetching cases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  useEffect(() => {
    let filtered = cases;

    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.case_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.customer_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(c => c.priority === priorityFilter);
    }

    setFilteredCases(filtered);
  }, [searchTerm, statusFilter, priorityFilter, cases]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500/10 text-blue-500';
      case 'investigating': return 'bg-yellow-500/10 text-yellow-500';
      case 'resolved': return 'bg-green-500/10 text-green-500';
      case 'closed': return 'bg-gray-500/10 text-gray-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCaseTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'kyc_fraud': 'KYC Fraud',
      'aml_violation': 'AML Violation',
      'document_forgery': 'Document Forgery',
      'identity_theft': 'Identity Theft'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container mx-auto px-4 xl:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading cases...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="container mx-auto px-4 xl:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Case Management</h1>
            <p className="text-muted-foreground">Track and investigate fraud cases</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Case
          </Button>
        </div>

        <Card className="border-border/50 shadow-elegant mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by case number, customer name, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {filteredCases.length === 0 ? (
          <Card className="border-border/50 shadow-elegant">
            <CardContent className="py-16">
              <div className="text-center">
                <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Cases Found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'No cases have been created yet'}
                </p>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create First Case
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredCases.map((caseItem) => (
              <Card key={caseItem.id} className="border-border/50 shadow-elegant hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FolderOpen className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{caseItem.case_number}</h3>
                          <Badge className={getPriorityColor(caseItem.priority)}>
                            {caseItem.priority}
                          </Badge>
                          <Badge className={getStatusColor(caseItem.status)}>
                            {caseItem.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Customer</p>
                            <p className="font-medium">{caseItem.customer_name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Customer ID</p>
                            <p className="font-medium">{caseItem.customer_id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Case Type</p>
                            <p className="font-medium">{getCaseTypeLabel(caseItem.case_type)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Created: {new Date(caseItem.created_date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Updated: {new Date(caseItem.updated_date).toLocaleDateString()}</span>
                          {caseItem.assigned_to && (
                            <>
                              <span>•</span>
                              <span>Assigned to: {caseItem.assigned_to}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <Link to={`/cases/${caseItem.id}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseManagement;
