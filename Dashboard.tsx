import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '@/components/common/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  AlertTriangle, 
  FolderOpen, 
  TrendingUp,
  Upload,
  ArrowRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { getDashboardStats, getDocuments, getAlerts } from '@/db/api';
import type { Document, Alert } from '@/types/types';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDocuments: 0,
    flaggedDocuments: 0,
    activeCases: 0,
    riskScore: 0
  });
  const [recentDocs, setRecentDocs] = useState<Document[]>([]);
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, docsData, alertsData] = await Promise.all([
          getDashboardStats(),
          getDocuments(),
          getAlerts()
        ]);
        
        setStats(statsData);
        setRecentDocs(docsData.slice(0, 5));
        setRecentAlerts(alertsData.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500/10 text-green-500';
      case 'flagged': return 'bg-red-500/10 text-red-500';
      case 'processing': return 'bg-blue-500/10 text-blue-500';
      case 'pending': return 'bg-yellow-500/10 text-yellow-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground';
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
              <p className="text-muted-foreground">Loading dashboard...</p>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Compliance Dashboard</h1>
          <p className="text-muted-foreground">Monitor fraud detection and compliance activities in real-time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50 shadow-elegant hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Documents
              </CardTitle>
              <FileText className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalDocuments}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Documents processed
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-elegant hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Flagged Documents
              </CardTitle>
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{stats.flaggedDocuments}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Require investigation
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-elegant hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Cases
              </CardTitle>
              <FolderOpen className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">{stats.activeCases}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Under investigation
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-elegant hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Risk Score
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500">{stats.riskScore}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all documents
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Documents</CardTitle>
                <Link to="/upload">
                  <Button size="sm" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Upload New
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentDocs.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground mb-4">No documents uploaded yet</p>
                  <Link to="/upload">
                    <Button variant="outline" className="gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Your First Document
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentDocs.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{doc.file_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(doc.upload_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Alerts</CardTitle>
                <Link to="/cases">
                  <Button size="sm" variant="outline" className="gap-2">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentAlerts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No alerts at this time</p>
                  <p className="text-sm text-muted-foreground mt-1">All systems operating normally</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{alert.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(alert.created_date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 shadow-elegant">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/upload" className="block">
                <div className="p-6 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer">
                  <Upload className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">Upload Document</h3>
                  <p className="text-sm text-muted-foreground">Verify new documents for fraud</p>
                </div>
              </Link>
              
              <Link to="/cases" className="block">
                <div className="p-6 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer">
                  <FolderOpen className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">Manage Cases</h3>
                  <p className="text-sm text-muted-foreground">Review and investigate cases</p>
                </div>
              </Link>
              
              <Link to="/analytics" className="block">
                <div className="p-6 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer">
                  <TrendingUp className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">View Analytics</h3>
                  <p className="text-sm text-muted-foreground">Analyze fraud patterns and trends</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
