
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Cpu, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Document',
    description: 'Submit identity documents, financial records, or KYC materials through our secure API or web interface.',
    color: 'text-primary'
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI Verification',
    description: 'Our AI engine performs OCR, forensic analysis, signature matching, and cross-references against fraud databases.',
    color: 'text-accent'
  },
  {
    number: '03',
    icon: Lock,
    title: 'Blockchain Hash',
    description: 'System generates tamper-proof blockchain hash with cryptographic proof and immutable audit trail.',
    color: 'text-success'
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Results & Report',
    description: 'Receive detailed verification results, risk scores, visual heatmaps, and compliance-ready reports.',
    color: 'text-primary-glow'
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 xl:py-32 bg-gradient-to-br from-background via-secondary to-background">
      <div className="container mx-auto px-4 xl:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl xl:text-5xl font-bold mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our streamlined process delivers accurate results in seconds while maintaining complete transparency and auditability.
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden xl:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-success -translate-y-1/2" />
          
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/30 h-full">
                  <CardContent className="p-6 xl:p-8 text-center">
                    <div className="relative inline-block mb-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-elegant">
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center font-bold text-primary">
                        {step.number}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                
                {index < steps.length - 1 && (
                  <div className="hidden xl:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 p-8 xl:p-12 rounded-2xl glass-panel shadow-elegant">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">⚡ 2.5s</div>
              <div className="text-muted-foreground">Average Processing Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">✓ 99.8%</div>
              <div className="text-muted-foreground">Verification Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">🔒 100%</div>
              <div className="text-muted-foreground">Audit Trail Coverage</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
