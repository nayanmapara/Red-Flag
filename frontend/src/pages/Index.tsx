
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Flag } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard after a short delay
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="text-center space-y-8 animate-in fade-in">
        <div className="flex items-center justify-center mb-4 relative">
          <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></div>
          <Flag 
            className="text-primary animate-pulse relative" 
            size={64} 
            strokeWidth={2}
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Red Flag</h1>
        <p className="text-muted-foreground text-lg">Catching Frauds Before They Cost You.</p>
        <div className="mt-4 relative">
          <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full"></div>
          <LoadingSpinner size="lg" className="relative" />
        </div>
      </div>
    </div>
  );
};

export default Index;
