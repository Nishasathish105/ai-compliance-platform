import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import DocumentUpload from './pages/DocumentUpload';
import CaseManagement from './pages/CaseManagement';
import CaseDetails from './pages/CaseDetails';
import AuditTrail from './pages/AuditTrail';
import Analytics from './pages/Analytics';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
    visible: false
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: <Dashboard />,
    visible: true
  },
  {
    name: 'Upload Document',
    path: '/upload',
    element: <DocumentUpload />,
    visible: true
  },
  {
    name: 'Cases',
    path: '/cases',
    element: <CaseManagement />,
    visible: true
  },
  {
    name: 'Case Details',
    path: '/cases/:id',
    element: <CaseDetails />,
    visible: false
  },
  {
    name: 'Audit Trail',
    path: '/audit',
    element: <AuditTrail />,
    visible: true
  },
  {
    name: 'Analytics',
    path: '/analytics',
    element: <Analytics />,
    visible: true
  }
];

export default routes;