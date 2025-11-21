
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, FileX, DollarSign, FileWarning } from 'lucide-react';

const problems = [
  {
    icon: FileX,
    title: 'Fake Documents',
    description: 'Forged IDs, manipulated salary slips, and fake KYC documents bypass traditional verification methods.',
    color: 'text-destructive'
  },
  {
    icon: DollarSign,
    title: 'AML Violations',
    description: 'Money laundering activities go undetected due to inadequate transaction monitoring and entity analysis.',
    color: 'text-warning'
  },
  {
    icon: FileWarning,
    title: 'Tamper-Prone Audits',
    description: 'Manual audit processes are vulnerable to manipulation and lack transparency for regulators.',
    color: 'text-primary'
  },
  {
    icon: AlertTriangle,
    title: 'KYC Fraud',
    description: 'Identity verification challenges allow fraudulent accounts to slip through onboarding processes.',
    color: 'text-destructive'
  }
];

const ProblemSection = () => {
  return (
    <section className="py-20 xl:py-32 bg-background">
      <div className="container mx-auto px-4 xl:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl xl:text-5xl font-bold mb-6">
            The <span className="gradient-text">Compliance Crisis</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Financial institutions face mounting challenges in detecting fraud and maintaining compliance in an increasingly digital world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
          {problems.map((problem, index) => (
            <Card 
              key={index}
              className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/30"
            >
              <CardContent className="p-6 xl:p-8">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-secondary ${problem.color} group-hover:scale-110 transition-transform duration-300`}>
                    <problem.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                    <p className="text-muted-foreground">{problem.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 p-8 xl:p-12 rounded-2xl bg-gradient-to-br from-destructive/10 to-warning/10 border border-destructive/20">
          <div className="flex flex-col xl:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </div>
            <div className="flex-1 text-center xl:text-left">
              <h3 className="text-2xl font-bold mb-2">The Cost of Inaction</h3>
              <p className="text-muted-foreground">
                Financial institutions lose billions annually to fraud and face severe regulatory penalties for compliance failures. Traditional manual processes can no longer keep pace with sophisticated fraud schemes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
