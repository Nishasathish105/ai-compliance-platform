
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, BarChart3, Shield, Download, ArrowRight } from 'lucide-react';

const complianceFeatures = [
  {
    icon: FileText,
    title: 'SAR Generation',
    description: 'Automated Suspicious Activity Report creation with all required fields and supporting evidence.',
    badge: 'FATF Aligned'
  },
  {
    icon: Users,
    title: 'Investigator Dashboard',
    description: 'Comprehensive case management interface for compliance officers and fraud investigators.',
    badge: 'Role-Based Access'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Real-time dashboards with fraud trends, risk metrics, and compliance KPIs.',
    badge: 'Real-Time'
  },
  {
    icon: Shield,
    title: 'Audit Trail Export',
    description: 'Complete audit logs with blockchain verification for regulatory submissions.',
    badge: 'Immutable'
  }
];

const reportTypes = [
  'Suspicious Activity Reports (SAR)',
  'Know Your Customer (KYC) Reports',
  'Anti-Money Laundering (AML) Reports',
  'Transaction Monitoring Reports',
  'Risk Assessment Reports',
  'Compliance Audit Reports'
];

const ComplianceSection = () => {
  return (
    <section className="py-20 xl:py-32 bg-background">
      <div className="container mx-auto px-4 xl:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl xl:text-5xl font-bold mb-6">
            <span className="gradient-text">Compliance & Reporting</span> Made Simple
          </h2>
          <p className="text-lg text-muted-foreground">
            Streamline your compliance workflows with automated reporting, comprehensive case management, and regulator-ready documentation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {complianceFeatures.map((feature, index) => (
            <Card 
              key={index}
              className="group border-border/50 hover:border-primary/30 hover:shadow-elegant transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="outline" className="mb-3 bg-primary/10 text-primary border-primary/20">
                  {feature.badge}
                </Badge>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Report Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reportTypes.map((report, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="flex-1">{report}</span>
                    <Download className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Investigator Dashboard Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src="https://miaoda-site-img.s3cdn.medo.dev/images/e4efc4da-b2fc-4555-a3d8-bd0cfe782771.jpg"
                alt="Fraud detection dashboard"
                className="w-full rounded-lg mb-4"
              />
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium">Active Cases</span>
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                    23 Pending
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium">High Risk Alerts</span>
                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                    7 Critical
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium">Resolved Today</span>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    45 Completed
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 p-8 xl:p-12 rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Compliance?</h3>
              <p className="text-white/90 mb-6">
                Join leading financial institutions using our AI-driven platform to combat fraud and maintain regulatory compliance.
              </p>
              <div className="flex flex-col xl:flex-row gap-4">
                <Button size="lg" variant="secondary" className="group">
                  Request Demo
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-sm text-white/80">Financial Institutions</div>
              </div>
              <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">10M+</div>
                <div className="text-sm text-white/80">Documents Verified</div>
              </div>
              <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">$2B+</div>
                <div className="text-sm text-white/80">Fraud Prevented</div>
              </div>
              <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">99.8%</div>
                <div className="text-sm text-white/80">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
