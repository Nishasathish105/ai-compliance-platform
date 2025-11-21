import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle2, AlertTriangle, Link as LinkIcon } from 'lucide-react';

const DemoSection = () => {
  const [uploadedFile, setUploadedFile] = useState(false);

  const handleUploadDemo = () => {
    setUploadedFile(true);
  };

  return (
    <section className="py-20 xl:py-32 bg-background">
      <div className="container mx-auto px-4 xl:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl xl:text-5xl font-bold mb-6">
            See It In <span className="gradient-text">Action</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience our platform's capabilities with interactive demonstrations of document verification, fraud detection, and blockchain audit trails.
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Document Upload Demo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drop your document here or click to browse
                  </p>
                  <Button onClick={handleUploadDemo} variant="outline">
                    Select File
                  </Button>
                </div>
                
                {uploadedFile && (
                  <div className="animate-fade-in space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/20">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-success">Document Verified</div>
                        <div className="text-sm text-muted-foreground">passport_sample.pdf</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Risk Score</span>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Low Risk (12/100)
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Processing Time</span>
                        <span className="font-medium">2.3 seconds</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Confidence</span>
                        <span className="font-medium text-success">99.7%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Fraud Detection Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <img 
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/ceaf900e-181a-4a61-9eca-47a5b61cca25.jpg"
                  alt="KYC verification with heatmap overlay"
                  className="w-full rounded-lg"
                />
                <div className="absolute top-4 right-4 space-y-2">
                  <Badge className="bg-success/90 backdrop-blur-sm">
                    ✓ Photo Match: 98%
                  </Badge>
                  <Badge className="bg-success/90 backdrop-blur-sm block">
                    ✓ Signature Valid
                  </Badge>
                  <Badge className="bg-warning/90 backdrop-blur-sm block">
                    ⚠ Date Modified
                  </Badge>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-muted/50">
                <div className="text-sm font-medium mb-2">Detection Results:</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Biometric match confirmed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Document structure valid
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    Minor date inconsistency detected
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-8 border-border/50 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-primary" />
              Blockchain Transaction Proof
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="transaction" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="transaction">Transaction</TabsTrigger>
                <TabsTrigger value="hash">Hash Details</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transaction" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Transaction ID</div>
                    <div className="font-mono text-sm bg-muted p-3 rounded-lg break-all">
                      0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Block Number</div>
                    <div className="font-mono text-sm bg-muted p-3 rounded-lg">
                      #18,234,567
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Timestamp</div>
                    <div className="font-mono text-sm bg-muted p-3 rounded-lg">
                      2025-11-21 14:32:18 UTC
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Status</div>
                    <Badge className="bg-success text-success-foreground">
                      ✓ Confirmed
                    </Badge>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="hash" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Document Hash (SHA-256)</div>
                  <div className="font-mono text-sm bg-muted p-3 rounded-lg break-all">
                    e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Merkle Root</div>
                  <div className="font-mono text-sm bg-muted p-3 rounded-lg break-all">
                    4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="verification" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-sm">Document integrity verified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-sm">Blockchain record immutable</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-sm">Timestamp cryptographically proven</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-sm">Audit trail complete</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DemoSection;
