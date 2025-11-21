
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileSearch, 
  Bell, 
  Users, 
  Database, 
  FileText, 
  Eye, 
  Webhook, 
  Shield 
} from 'lucide-react';

const features = [
  {
    icon: FileSearch,
    title: 'Document Verification',
    description: 'OCR with layout and forensic checks, signature matching, and authenticity validation',
    gradient: 'from-primary to-primary-light'
  },
  {
    icon: Bell,
    title: 'Real-Time Alerts',
    description: 'Instant fraud detection with risk scoring and detailed reason codes for flagged cases',
    gradient: 'from-destructive to-warning'
  },
  {
    icon: Users,
    title: 'KYC/KYB Analysis',
    description: 'Comprehensive identity verification with biometric matching and business validation',
    gradient: 'from-accent to-primary-glow'
  },
  {
    icon: Database,
    title: 'Blockchain Audit Trail',
    description: 'Immutable logging with tamper-proof records and cryptographic transaction proofs',
    gradient: 'from-primary to-accent'
  },
  {
    icon: FileText,
    title: 'Compliance Reporting',
    description: 'SAR generation, regulator-ready reports, and comprehensive case management',
    gradient: 'from-success to-primary'
  },
  {
    icon: Eye,
    title: 'Explainability Dashboard',
    description: 'Visual heatmaps highlighting forged areas with detailed AI reasoning transparency',
    gradient: 'from-warning to-destructive'
  },
  {
    icon: Webhook,
    title: 'API Integration',
    description: 'Seamless integration with onboarding pipelines and core banking systems',
    gradient: 'from-primary-light to-accent'
  },
  {
    icon: Shield,
    title: 'Multi-Layer Security',
    description: 'End-to-end encryption, role-based access control, and audit logging',
    gradient: 'from-primary to-success'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 xl:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--accent)/0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 xl:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl xl:text-5xl font-bold mb-6">
            Comprehensive <span className="gradient-text">Feature Set</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to combat fraud and maintain compliance in one powerful platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-elegant transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <CardContent className="p-6 relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground">Document Types Supported</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Fraud Detection Rules</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Automated Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
