import { Button } from '@/components/ui/button';
import { Shield, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary to-background">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6bTAgMjBjMC0xLjEuOS0yIDItMnMyIC45IDIgMi0uOSAyLTIgMi0yLS45LTItMnptLTIwIDBjMC0xLjEuOS0yIDItMnMyIC45IDIgMi0uOSAyLTIgMi0yLS45LTItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
      
      <div className="container mx-auto px-4 xl:px-8 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center">
          <div className="text-center xl:text-left space-y-6 xl:space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Blockchain-Powered Security</span>
            </div>
            
            <h1 className="text-4xl xl:text-6xl font-bold leading-tight">
              <span className="gradient-text">AI-Driven Compliance</span>
              <br />
              <span className="text-foreground">& Fraud Detection</span>
            </h1>
            
            <p className="text-lg xl:text-xl text-muted-foreground max-w-2xl mx-auto xl:mx-0">
              Combat fake documents, KYC fraud, and AML violations with automated verification and immutable audit trails. Designed for banks and financial institutions.
            </p>
            
            <div className="flex flex-col xl:flex-row gap-4 justify-center xl:justify-start">
              <Button size="lg" className="group shadow-elegant hover:shadow-glow transition-all duration-300">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-8 justify-center xl:justify-start pt-4">
              <div className="text-center xl:text-left">
                <div className="text-3xl font-bold text-primary">99.8%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center xl:text-left">
                <div className="text-3xl font-bold text-primary">2.5s</div>
                <div className="text-sm text-muted-foreground">Avg. Processing</div>
              </div>
              <div className="text-center xl:text-left">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Audit Trail</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <img 
              src="https://miaoda-site-img.s3cdn.medo.dev/images/12996514-8f56-4863-b4cf-c18922cfc305.jpg"
              alt="Professional compliance officer analyzing documents"
              className="relative rounded-2xl shadow-elegant w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
