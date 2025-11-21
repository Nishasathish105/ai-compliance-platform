
import { Card, CardContent } from '@/components/ui/card';
import { Brain, ScanLine, Link2, Code } from 'lucide-react';

const technologies = [
  {
    icon: Brain,
    title: 'AI Models',
    items: [
      'Deep learning for document classification',
      'Computer vision for image forensics',
      'Natural language processing for text analysis',
      'Anomaly detection algorithms',
      'Pattern recognition neural networks'
    ],
    color: 'from-primary to-primary-light'
  },
  {
    icon: ScanLine,
    title: 'OCR Engines',
    items: [
      'Multi-language text extraction',
      'Handwriting recognition',
      'Layout analysis and structure detection',
      'Table and form data extraction',
      'Real-time processing capabilities'
    ],
    color: 'from-accent to-primary-glow'
  },
  {
    icon: Link2,
    title: 'Blockchain Layer',
    items: [
      'Ethereum-based smart contracts',
      'Immutable audit trail storage',
      'Cryptographic hash verification',
      'Distributed ledger technology',
      'Consensus mechanism validation'
    ],
    color: 'from-success to-primary'
  },
  {
    icon: Code,
    title: 'Integration Stack',
    items: [
      'RESTful API architecture',
      'Webhook event notifications',
      'SDK for multiple languages',
      'GraphQL query interface',
      'Real-time WebSocket connections'
    ],
    color: 'from-warning to-accent'
  }
];

const TechnologySection = () => {
  return (
    <section className="py-20 xl:py-32 bg-gradient-to-br from-secondary via-background to-secondary">
      <div className="container mx-auto px-4 xl:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl xl:text-5xl font-bold mb-6">
            Powered by <span className="gradient-text">Advanced Technology</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform leverages cutting-edge technologies to deliver unparalleled accuracy, security, and performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {technologies.map((tech, index) => (
            <Card 
              key={index}
              className="group border-border/50 hover:border-primary/30 hover:shadow-elegant transition-all duration-300"
            >
              <CardContent className="p-6 xl:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <tech.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">{tech.title}</h3>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {tech.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl glass-panel text-center">
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-sm text-muted-foreground">AI Models Trained</div>
          </div>
          <div className="p-6 rounded-xl glass-panel text-center">
            <div className="text-3xl font-bold text-accent mb-2">40+</div>
            <div className="text-sm text-muted-foreground">Languages Supported</div>
          </div>
          <div className="p-6 rounded-xl glass-panel text-center">
            <div className="text-3xl font-bold text-success mb-2">99.99%</div>
            <div className="text-sm text-muted-foreground">Uptime SLA</div>
          </div>
          <div className="p-6 rounded-xl glass-panel text-center">
            <div className="text-3xl font-bold text-warning mb-2">10M+</div>
            <div className="text-sm text-muted-foreground">Documents Processed</div>
          </div>
        </div>
        
        <div className="mt-12 p-8 xl:p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex flex-col xl:flex-row items-center gap-6">
            <img 
              src="https://miaoda-site-img.s3cdn.medo.dev/images/6b4a6107-60d0-433f-8d09-7f397505d10c.jpg"
              alt="Cybersecurity protection"
              className="w-full xl:w-64 rounded-xl shadow-elegant"
            />
            <div className="flex-1 text-center xl:text-left">
              <h3 className="text-2xl font-bold mb-3">Enterprise-Grade Security</h3>
              <p className="text-muted-foreground mb-4">
                Built with security at its core, our platform employs multiple layers of protection including end-to-end encryption, zero-trust architecture, and continuous security monitoring.
              </p>
              <div className="flex flex-wrap gap-2 justify-center xl:justify-start">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">SOC 2 Type II</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">ISO 27001</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">GDPR Compliant</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">PCI DSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
