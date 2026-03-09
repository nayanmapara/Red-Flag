
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface FraudResultProps {
  fraud: boolean;
  confidence: number;
  className?: string;
}

export function FraudResult({ fraud, confidence, className }: FraudResultProps) {
  const progressColor = fraud 
    ? "bg-fraud" 
    : "bg-safe";
  
  const resultText = fraud 
    ? "Potential Fraud Detected" 
    : "Invoice Appears Legitimate";
  
  const resultDescription = fraud 
    ? "This invoice shows patterns consistent with fraudulent activity." 
    : "No fraud patterns detected in this invoice.";

  const Icon = fraud ? AlertTriangle : CheckCircle;
  const iconColor = fraud ? "text-fraud" : "text-safe";
  const backgroundColor = fraud ? "bg-fraud-light" : "bg-safe-light";

  return (
    <Card className={cn("w-full overflow-hidden", className)}>
      <div className={cn("h-2", progressColor)} />
      <CardHeader className={cn("bg-card flex flex-row items-center gap-4", "px-6")}>
        <div className={cn("p-2 rounded-full", backgroundColor)}>
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
        <div>
          <CardTitle className="text-xl">{resultText}</CardTitle>
          <CardDescription>{resultDescription}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Confidence Score</span>
            <span className={cn(
              "text-sm font-bold",
              fraud ? "text-fraud" : "text-safe"
            )}>
              {confidence}%
            </span>
          </div>
          <Progress
            value={confidence}
            className={cn(
              "h-2 w-full",
              fraud ? "[&>div]:bg-fraud" : "[&>div]:bg-safe"
            )}
          />
          <div className="text-sm text-muted-foreground mt-4">
            <p>
              {fraud 
                ? "Our AI has detected suspicious patterns in this invoice. Please review it carefully before proceeding with payment."
                : "Based on our analysis, this invoice appears to be legitimate. However, always use your judgment before processing payments."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
