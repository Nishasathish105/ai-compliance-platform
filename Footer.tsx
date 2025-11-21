import React from "react";
import { Shield } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary to-primary-light text-white">
      <div className="container mx-auto py-12 xl:py-16 px-4 xl:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6" />
              <span className="text-xl font-bold">ComplianceAI</span>
            </div>
            <p className="text-white/80 text-sm">
              AI-driven compliance and fraud detection platform for financial institutions worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <div className="space-y-2 text-sm text-white/80">
              <p className="hover:text-white cursor-pointer transition-colors">Document Verification</p>
              <p className="hover:text-white cursor-pointer transition-colors">Fraud Detection</p>
              <p className="hover:text-white cursor-pointer transition-colors">AML Compliance</p>
              <p className="hover:text-white cursor-pointer transition-colors">KYC/KYB Services</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <div className="space-y-2 text-sm text-white/80">
              <p className="hover:text-white cursor-pointer transition-colors">About Us</p>
              <p className="hover:text-white cursor-pointer transition-colors">Careers</p>
              <p className="hover:text-white cursor-pointer transition-colors">Contact</p>
              <p className="hover:text-white cursor-pointer transition-colors">Partners</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <div className="space-y-2 text-sm text-white/80">
              <p className="hover:text-white cursor-pointer transition-colors">Privacy Policy</p>
              <p className="hover:text-white cursor-pointer transition-colors">Terms of Service</p>
              <p className="hover:text-white cursor-pointer transition-colors">Security</p>
              <p className="hover:text-white cursor-pointer transition-colors">Compliance</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 text-center text-sm text-white/80">
          <p>{currentYear} AI-Driven Compliance & Fraud Detection Platform</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
