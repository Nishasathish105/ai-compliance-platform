import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUnreadAlerts } from '@/db/api';

const AppHeader = () => {
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const alerts = await getUnreadAlerts();
        setUnreadCount(alerts.length);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Upload', path: '/upload' },
    { name: 'Cases', path: '/cases' },
    { name: 'Audit Trail', path: '/audit' },
    { name: 'Analytics', path: '/analytics' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 xl:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">ComplianceAI</span>
              <span className="text-xs text-muted-foreground">Fraud Detection</span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? 'default' : 'ghost'}
                  size="sm"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
