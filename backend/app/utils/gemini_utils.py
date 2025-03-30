import os
from google import genai
from dotenv import load_dotenv
import json
from pydantic import BaseModel
import datetime

load_dotenv()

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "Failed to get secret key")
client = genai.Client(api_key=GEMINI_API_KEY)

def ask_gemini(text):
    """Send a prompt to Google Gemini and return the response."""
    try:
        prompt = f"""
        Extract relevant financial data from the given text and return it strictly in the following JSON format:
        
        {{
            "amount": <float>,
            "vendor_id": <integer>,
            "tax": <float>,
            "invoice_age": <integer>,
            "duplicate_invoice": <0 or 1>,
            "high_risk_vendor": <0 or 1>
        }}

        - "amount": The total invoice amount.
        - "vendor_id": A unique identifier for the vendor (use a random number if not found).
        - "tax": The tax amount from the invoice.
        - "invoice_age": The number of days since the invoice was issued. (Current date = {datetime.datetime.now().date()}) Start from 0 and increase by 1 for each month
        - "duplicate_invoice": 1 if it's a duplicate invoice, else 0.
        - "high_risk_vendor": 1 if the vendor appears suspicious, else 0.

        If any field is missing, fill it with an estimated value based on context. 

        Raw Text: {text}
        
        Retrun: list[dict] 
        
        """

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
            # config={
            #     'response_mime_type': 'application/json',
            #     'response_schema': dict,
            # }
            )
        
        response = response.json()  # Parse the response to JSON
        response = json.loads(response)  # Parse the response to JSON
        
        response = response["candidates"][0]["content"]["parts"][0]["text"].strip("```").lstrip("json")
        
        response = json.loads(response)
        
        return response[0] if response else "No response from Gemini"
    except Exception as e:
        return f"Error: {str(e)}"