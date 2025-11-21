
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Zap, Network, Lock } from 'lucide-react';

const solutions = [
  {
    icon: Zap,
    title: 'Automated Document Verification',
    description: 'Advanced OCR with forensic analysis detects forged documents, manipulated images, and fake signatures in real-time.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/c0bb1611-a24a-4288-aa30-dba795cb86de.jpg'
  },
  {
    icon: CheckCircle2,
    title: 'Real-Time Fraud Scoring',
    description: 'AI-powered risk assessment generates instant fraud scores with detailed reason codes for every customer interaction.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/e4efc4da-b2fc-4555-a3d8-bd0cfe782771.jpg'
  },
  {
    icon: Network,
    title: 'AML Graph Analytics',
    description: 'Transaction and entity graph analysis uncovers suspicious patterns and relationships aligned with FATF standards.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/d4a5b6c8-4f98-4b3a-af4b-1bc68a4044ab.jpg'
  },
  {
    icon: Lock,
    title: 'Blockchain Audit Trails',
    description: 'Immutable logging of every verification and manual action creates tamper-proof records with cryptographic proof.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/4ea86b0b-fbfb-450d-b395-ffa3ed10b574.jpg'
  }
];

const SolutionSection = () => {
  return (
    <section className="py-20 xl:py-32 bg-gradient-to-br from-secondary to-background">
      <div className="container mx-auto px-4 xl:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl xl:text-5xl font-bold mb-6">
            <span className="gradient-text">Intelligent Solutions</span> for Modern Compliance
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-driven platform combines cutting-edge technology with regulatory expertise to deliver comprehensive fraud detection and compliance management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
          {solutions.map((solution, index) => (
            <Card 
              key={index}
              className="group overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-elegant transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <CardContent className="p-6 xl:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                    <solution.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                    <p className="text-muted-foreground">{solution.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-success/10 border border-success/20">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="font-medium text-success">GDPR Compliant • FATF Aligned • SOC 2 Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
