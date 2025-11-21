import { useEffect, useState } from 'react';
import AppHeader from '@/components/common/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, FolderOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { getAuditTrail } from '@/db/api';
import type { AuditTrail as AuditTrailType } from '@/types/types';

const AuditTrail = () => {
  const [auditLogs, setAuditLogs] = useState<AuditTrailType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuditTrail = async () => {
      try {
        const data = await getAuditTrail(100);
        setAuditLogs(data);
      } catch (error) {
        console.error('Error fetching audit trail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditTrail();
  }, []);

  const getActionIcon = (actionType: string) => {
    if (actionType.includes('document')) return FileText;
    if (actionType.includes('case')) return FolderOpen;
    if (actionType.includes('alert')) return AlertTriangle;
    if (actionType.includes('verified')) return CheckCircle2;
    return Shield;
  };

  const getActionColor = (actionType: string) => {
    if (actionType.includes('verified')) return 'text-green-500';
    if (actionType.includes('flagged') || actionType.includes('alert')) return 'text-red-500';
    if (actionType.includes('updated')) return 'text-blue-500';
    return 'text-primary';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container mx-auto px-4 xl:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading audit trail...</p>
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
          <h1 className="text-3xl font-bold mb-2">Audit Trail</h1>
          <p className="text-muted-foreground">Immutable blockchain-verified activity log</p>
        </div>

        <Card className="border-border/50 shadow-elegant">
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            {auditLogs.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No audit logs yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {auditLogs.map((log) => {
                  const Icon = getActionIcon(log.action_type);
                  const colorClass = getActionColor(log.action_type);
                  
                  return (
                    <div key={log.id} className="flex gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <p className="font-medium mb-1">
                              {log.action_type.replace(/_/g, ' ').toUpperCase()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {log.entity_type} • User: {log.user_id.slice(0, 8)}...
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {new Date(log.timestamp).toLocaleString()}
                          </Badge>
                        </div>
                        
                        {Object.keys(log.action_details).length > 0 && (
                          <div className="text-sm bg-muted/50 rounded p-3 mb-2">
                            <pre className="text-xs overflow-x-auto">
                              {JSON.stringify(log.action_details, null, 2)}
                            </pre>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-xs">
                          <Shield className="w-3 h-3 text-green-500" />
                          <span className="text-muted-foreground">Blockchain Hash:</span>
                          <code className="bg-muted px-2 py-0.5 rounded font-mono">
                            {log.blockchain_hash.slice(0, 16)}...{log.blockchain_hash.slice(-8)}
                          </code>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuditTrail;
