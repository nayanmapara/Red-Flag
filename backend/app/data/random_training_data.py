import pandas as pd
import numpy as np
import random

# Function to generate synthetic training data
def generate_training_data(num_samples=1000):
    data = []
    
    for _ in range(num_samples):
        # Generate random values for features
        amount = random.uniform(50, 5000)  # Amount between $50 and $5000
        vendor_id = random.randint(1, 50)  # Vendor ID between 1 and 50
        tax = amount * random.uniform(0.02, 0.15)  # Tax between 2% and 15% of amount
        invoice_age = random.randint(1, 120)  # Invoice age between 1 and 120 days
        
        # Feature for duplicate invoices (some random probability of duplication)
        duplicate_invoice = random.choice([0, 1]) if random.random() < 0.1 else 0  # 10% chance of being a duplicate
        
        # Feature for high-risk vendors (based on vendor_id)
        high_risk_vendor = 1 if vendor_id in [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] else 0  # Certain vendor IDs are high risk
        
        # Generate label (1 for fraud, 0 for non-fraud)
        label = 0  # Default non-fraud
        if amount > 1000 and duplicate_invoice == 1:
            label = 1  # Fraud: Large amount and duplicate invoice
        
        if high_risk_vendor == 1 and amount > 500:
            label = 1  # Fraud: High-risk vendor with a large amount
        
        # Append generated data
        data.append([amount, vendor_id, tax, invoice_age, duplicate_invoice, high_risk_vendor, label])
    
    # Create a DataFrame
    columns = ["amount", "vendor_id", "tax", "invoice_age", "duplicate_invoice", "high_risk_vendor", "label"]
    df = pd.DataFrame(data, columns=columns)
    
    return df

# Generate 1000 training samples
training_data = generate_training_data(1000)

# Save to CSV (optional)
training_data.to_csv('synthetic_training_data.csv', index=False)

print("Training data generated and saved to 'synthetic_training_data.csv'.")
