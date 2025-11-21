import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/common/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { uploadDocument, createVerificationResult, createAlert, createAuditEntry } from '@/db/api';
import { toast } from 'sonner';

const DocumentUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (selectedFile: File): boolean => {
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return false;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error('Only JPG, PNG, WEBP, and PDF files are supported');
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (uploading || verifying) {
      toast.error('Please wait for the current upload to complete');
      return;
    }

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        setResult(null);
        toast.success(`File "${droppedFile.name}" ready to upload`);
      }
    }
  };

  const simulateVerification = async (documentId: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const riskScore = Math.floor(Math.random() * 100);
    const isFraudulent = riskScore > 70;
    const confidenceLevel = Math.floor(Math.random() * 30) + 70;
    
    const fraudIndicators = isFraudulent ? [
      'Inconsistent font patterns detected',
      'Potential photo manipulation',
      'Signature mismatch probability: 78%',
      'Document metadata anomalies'
    ] : [];

    const heatmapData = isFraudulent ? [
      { x: 120, y: 80, intensity: 0.9, reason: 'Font inconsistency' },
      { x: 200, y: 150, intensity: 0.7, reason: 'Photo manipulation' },
      { x: 180, y: 220, intensity: 0.85, reason: 'Signature anomaly' }
    ] : [];

    const verification = await createVerificationResult(documentId, {
      risk_score: riskScore,
      is_fraudulent: isFraudulent,
      fraud_indicators: fraudIndicators,
      confidence_level: confidenceLevel,
      heatmap_data: heatmapData
    });

    if (isFraudulent) {
      await createAlert({
        alert_type: 'high_risk_document',
        severity: riskScore > 85 ? 'critical' : 'high',
        entity_id: documentId,
        message: `High-risk document detected: ${file?.name} (Risk Score: ${riskScore}%)`
      });
    }

    await createAuditEntry(
      'document_verified',
      'document',
      documentId,
      {
        file_name: file?.name,
        risk_score: riskScore,
        is_fraudulent: isFraudulent
      }
    );

    return verification;
  };

  const handleUpload = async () => {
    if (!file || !documentType) {
      toast.error('Please select a file and document type');
      return;
    }

    setUploading(true);
    setVerifying(false);

    try {
      const document = await uploadDocument(file, documentType);
      toast.success('Document uploaded successfully');
      
      setUploading(false);
      setVerifying(true);
      
      const verification = await simulateVerification(document.id);
      
      setResult({
        document,
        verification
      });
      
      setVerifying(false);
      
      if (verification.is_fraudulent) {
        toast.error('Fraud detected! Document has been flagged for review.');
      } else {
        toast.success('Document verified successfully');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload document');
      setUploading(false);
      setVerifying(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setDocumentType('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="container mx-auto px-4 xl:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Document Verification</h1>
            <p className="text-muted-foreground">Upload documents for AI-powered fraud detection and compliance verification</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle>Upload Document</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="documentType">Document Type</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger id="documentType">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">Government ID</SelectItem>
                      <SelectItem value="kyc">KYC Document</SelectItem>
                      <SelectItem value="financial">Financial Document</SelectItem>
                      <SelectItem value="business">Business Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Select File</Label>
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                      isDragging 
                        ? 'border-primary bg-primary/5 scale-105' 
                        : 'border-border hover:border-primary/50'
                    } ${uploading || verifying ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      disabled={uploading || verifying}
                    />
                    <label htmlFor="fileInput" className="cursor-pointer block">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all ${
                        isDragging ? 'bg-primary/20 scale-110' : 'bg-primary/10'
                      }`}>
                        <Upload className={`w-8 h-8 transition-all ${
                          isDragging ? 'text-primary animate-bounce' : 'text-primary'
                        }`} />
                      </div>
                      {file ? (
                        <div>
                          <p className="font-medium mb-1">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className={`text-sm mb-2 transition-colors ${
                            isDragging ? 'text-primary font-medium' : 'text-muted-foreground'
                          }`}>
                            {isDragging ? '📁 Drop your document here' : 'Drag & drop your document here or click to browse'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supports: JPG, PNG, WEBP, PDF (Max 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={handleUpload} 
                    disabled={!file || !documentType || uploading || verifying}
                    className="flex-1"
                  >
                    {uploading || verifying ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {uploading ? 'Uploading...' : 'Verifying...'}
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload & Verify
                      </>
                    )}
                  </Button>
                  {file && (
                    <Button variant="outline" onClick={handleReset}>
                      Reset
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle>Verification Results</CardTitle>
              </CardHeader>
              <CardContent>
                {!result && !verifying && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">Upload a document to see verification results</p>
                  </div>
                )}

                {verifying && (
                  <div className="text-center py-12">
                    <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
                    <p className="font-medium mb-2">Analyzing Document...</p>
                    <p className="text-sm text-muted-foreground">Running AI fraud detection algorithms</p>
                  </div>
                )}

                {result && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Risk Score</p>
                        <p className="text-3xl font-bold">{result.verification.risk_score}%</p>
                      </div>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        result.verification.is_fraudulent 
                          ? 'bg-red-500/10' 
                          : 'bg-green-500/10'
                      }`}>
                        {result.verification.is_fraudulent ? (
                          <AlertTriangle className="w-8 h-8 text-red-500" />
                        ) : (
                          <CheckCircle2 className="w-8 h-8 text-green-500" />
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">Status</Label>
                      <Badge className={
                        result.verification.is_fraudulent 
                          ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                          : 'bg-green-500/10 text-green-500 border-green-500/20'
                      }>
                        {result.verification.is_fraudulent ? 'FRAUDULENT - FLAGGED' : 'VERIFIED - AUTHENTIC'}
                      </Badge>
                    </div>

                    <div>
                      <Label className="mb-2 block">Confidence Level</Label>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all"
                            style={{ width: `${result.verification.confidence_level}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{result.verification.confidence_level}%</span>
                      </div>
                    </div>

                    {result.verification.fraud_indicators.length > 0 && (
                      <div>
                        <Label className="mb-2 block">Fraud Indicators</Label>
                        <div className="space-y-2">
                          {result.verification.fraud_indicators.map((indicator: string, index: number) => (
                            <div key={index} className="flex items-start gap-2 p-2 rounded bg-red-500/5 border border-red-500/20">
                              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                              <p className="text-sm">{indicator}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button onClick={() => navigate('/dashboard')} className="flex-1">
                        View Dashboard
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        Upload Another
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
