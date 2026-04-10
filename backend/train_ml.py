from app.models.invoice_model import InvoiceFraudModel
import pandas as pd

# Load the generated dataset
file_path = "./app/data/invoice_fraud_data.csv" 
data = pd.read_csv(file_path)

# Train the model
model = InvoiceFraudModel()
model.train(data)  # Train model
