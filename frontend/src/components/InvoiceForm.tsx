import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "./LoadingSpinner";
import { toast } from "@/components/ui/sonner";
import { FraudResult } from "./FraudResult";
import { analyzeFraud } from "@/services/api";

interface FormData {
  invoiceNumber: string;
  vendorName: string;
  amount: string;
  date: string;
  description: string;
}

export function InvoiceForm() {
  const [formData, setFormData] = useState<FormData>({
    invoiceNumber: "",
    vendorName: "",
    amount: "",
    date: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ fraud: boolean; confidence: number } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    toast.success(`File selected: ${selectedFile.name}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // Check if at least some form data or a file is provided
      if (!file && Object.values(formData).every(value => value.trim() === "")) {
        toast.error("Please provide invoice details or upload a file");
        return;
      }

      // Prepare FormData for API request
      const formDataToSend = new FormData();

      // Append form fields to FormData
      formDataToSend.append("invoiceNumber", formData.invoiceNumber);
      formDataToSend.append("vendorName", formData.vendorName);
      formDataToSend.append("amount", formData.amount);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("description", formData.description);

      // Append the file if provided
      if (file) {
        formDataToSend.append("file", file);
      }

      // Call API to analyze fraud
      const response = await analyzeFraud(formDataToSend);
      setResult(response);

      // Clear file after submission (form data stays for potential adjustments)
      setFile(null);
    } catch (error) {
      console.error("Error analyzing invoice:", error);
      toast.error("Unable to analyze invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Invoice Analysis</CardTitle>
          <CardDescription>
            Upload an invoice file or enter details manually to check for potential fraud
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FileUploader onFileSelect={handleFileSelect} />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Or Enter Invoice Details Manually</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleChange}
                    placeholder="INV-12345"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vendorName">Vendor Name</Label>
                  <Input
                    id="vendorName"
                    name="vendorName"
                    value={formData.vendorName}
                    onChange={handleChange}
                    placeholder="Acme Corporation"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="1000.00"
                    type="number"
                    step="0.01"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Invoice Date</Label>
                  <Input
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    type="date"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter invoice details or additional information"
                  rows={3}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Analyzing...
              </>
            ) : (
              "Analyze Invoice"
            )}
          </Button>
        </CardFooter>
      </Card>

      {result && (
        <FraudResult
          fraud={result.fraud}
          confidence={result.confidence}
          className="animate-in fade-in"
        />
      )}
    </div>
  );
}
