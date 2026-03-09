import axios from "axios";
import { toast } from "@/components/ui/sonner";

// In a real application, this would be environment-based
const API_URL = "http://localhost:5000/api";  // Replace with your actual backend API URL

/**
 * Analyze invoice for potential fraud
 * 
 * This function calls the Flask backend to analyze the invoice.
 */
export async function analyzeFraud(invoiceData: any): Promise<{ fraud: boolean; confidence: number }> {
  try {
    // Make the actual API call to the backend
    const response = await axios.post(`${API_URL}/predict`, invoiceData);
    
    // Return the response data from the backend
    return response.data;
    
  } catch (error) {
    console.error("API error:", error);
    toast.error("Failed to analyze invoice");
    throw error;
  }
}
