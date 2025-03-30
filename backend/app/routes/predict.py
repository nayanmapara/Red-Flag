from flask import Blueprint, request, jsonify
import joblib
import pandas as pd
from utils.extract_utils import extract_text
from utils.gemini_utils import ask_gemini
import os
from utils.file_handler import save_file

predict_fraud = Blueprint("predict_fraud", __name__)
UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@predict_fraud.route("/predict", methods=["POST"])
def predict():
    
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    file_path = save_file(file, UPLOAD_FOLDER)

    if not file_path:
        return jsonify({"error": "Invalid file type"}), 400

    text = extract_text(file_path)
    
    analysis = ask_gemini(text)
    
    try:
        # Input data expected in JSON format
        data = analysis
        
        print("Received data:", data)  # Debugging line to check the received data
        
        # Define required features
        required_features = ["amount", "vendor_id", "tax", "invoice_age", "duplicate_invoice", "high_risk_vendor"]
        
        # Convert input into a DataFrame with proper column names
        features = pd.DataFrame([data], columns=required_features)

        # Ensure data is reshaped correctly (single row)
        features = features.iloc[0:1]  # Select the first row (avoid extra dimensions)

        # Load the pre-trained model
        model = joblib.load("app/data/invoice_fraud.pkl")

        # Get the anomaly score (higher negative values indicate more fraud)
        score = model.decision_function(features)[0]

        # Confidence mapping based on the anomaly score
        confidence = abs((abs(score) / (abs(score) + 1)) * 100 if score < 0 else 0 - 100)

        # Predict fraud (-1 for fraud, 1 for non-fraud in Isolation Forest)
        prediction = model.predict(features)[0]

        # Return the prediction along with the confidence
        return jsonify({
            "fraud": True if prediction == -1 else False,  # Fraud if prediction is -1
            "confidence": round(confidence, 2)  # Confidence as a percentage
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400
