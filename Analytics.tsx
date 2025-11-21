import { useEffect, useState } from 'react';
import AppHeader from '@/components/common/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, FileText, AlertTriangle } from 'lucide-react';
import { getDocuments, getCases } from '@/db/api';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDocs: 0,
    verifiedDocs: 0,
    flaggedDocs: 0,
    totalCases: 0,
    openCases: 0,
    resolvedCases: 0
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [docs, cases] = await Promise.all([
          getDocuments(),
          getCases()
        ]);

        setStats({
          totalDocs: docs.length,
          verifiedDocs: docs.filter(d => d.status === 'verified').length,
          flaggedDocs: docs.filter(d => d.status === 'flagged').length,
          totalCases: cases.length,
          openCases: cases.filter(c => c.status === 'open' || c.status === 'investigating').length,
          resolvedCases: cases.filter(c => c.status === 'resolved' || c.status === 'closed').length
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container mx-auto px-4 xl:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading analytics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const verificationRate = stats.totalDocs > 0 
    ? Math.round((stats.verifiedDocs / stats.totalDocs) * 100) 
    : 0;
  
  const fraudRate = stats.totalDocs > 0 
    ? Math.round((stats.flaggedDocs / stats.totalDocs) * 100) 
    : 0;

  const caseResolutionRate = stats.totalCases > 0
    ? Math.round((stats.resolvedCases / stats.totalCases) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="container mx-auto px-4 xl:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics & Insights</h1>
          <p className="text-muted-foreground">Fraud detection patterns and compliance metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Verification Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold mb-2">{verificationRate}%</div>
                  <p className="text-sm text-muted-foreground">
                    {stats.verifiedDocs} of {stats.totalDocs} documents
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Fraud Detection Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold mb-2 text-red-500">{fraudRate}%</div>
                  <p className="text-sm text-muted-foreground">
                    {stats.flaggedDocs} flagged documents
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Case Resolution Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold mb-2">{caseResolutionRate}%</div>
                  <p className="text-sm text-muted-foreground">
                    {stats.resolvedCases} of {stats.totalCases} cases
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle>Document Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Verified</span>
                    <span className="text-sm text-muted-foreground">{stats.verifiedDocs}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${verificationRate}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Flagged</span>
                    <span className="text-sm text-muted-foreground">{stats.flaggedDocs}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 transition-all"
                      style={{ width: `${fraudRate}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Processing</span>
                    <span className="text-sm text-muted-foreground">
                      {stats.totalDocs - stats.verifiedDocs - stats.flaggedDocs}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all"
                      style={{ 
                        width: `${Math.round(((stats.totalDocs - stats.verifiedDocs - stats.flaggedDocs) / Math.max(stats.totalDocs, 1)) * 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle>Case Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Open/Investigating</span>
                    <span className="text-sm text-muted-foreground">{stats.openCases}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-500 transition-all"
                      style={{ 
                        width: `${Math.round((stats.openCases / Math.max(stats.totalCases, 1)) * 100)}%` 
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Resolved/Closed</span>
                    <span className="text-sm text-muted-foreground">{stats.resolvedCases}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${caseResolutionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
