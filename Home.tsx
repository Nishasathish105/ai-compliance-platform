import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight, FileSearch, Lock, Network, TrendingUp } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="container mx-auto px-4 xl:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-5xl font-bold mb-6">
            AI-Driven Compliance & Fraud Detection
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Combat fake documents, KYC fraud, and AML violations with automated verification and immutable audit trails powered by AI and blockchain technology.
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <Button size="lg" onClick={() => navigate('/dashboard')} className="gap-2">
              Launch Platform
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/upload')}>
              Upload Document
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-16">
            <div className="p-6 rounded-xl border border-border/50 bg-background/50 backdrop-blur">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileSearch className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Document Verification</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered OCR and forensic analysis
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border/50 bg-background/50 backdrop-blur">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Real-Time Detection</h3>
              <p className="text-sm text-muted-foreground">
                Instant fraud scoring and alerts
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border/50 bg-background/50 backdrop-blur">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Network className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AML Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Transaction graph and pattern detection
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border/50 bg-background/50 backdrop-blur">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Blockchain Audit</h3>
              <p className="text-sm text-muted-foreground">
                Immutable tamper-proof records
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
