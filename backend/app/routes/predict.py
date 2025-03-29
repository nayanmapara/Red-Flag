from flask import Blueprint, request, jsonify
import joblib
import numpy as np

predict_fraud = Blueprint("predict_fraud", __name__)

# Load the model once (avoids reloading on every request)
model = joblib.load("app/data/invoice_fraud.pkl")

@predict_fraud.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json  # Expect JSON input
        
        # Define required features & fill missing values with defaults
        required_features = ["amount", "vendor_id", "tax", "invoice_age", "duplicate_invoice", "high_risk_vendor"]
        features = np.array([data.get(feature, 0) for feature in required_features])  # Default = 0 if missing
        
        # Make prediction
        prediction = model.predict([features])[0]

        return jsonify({"fraud": True if prediction == -1 else False})

    except Exception as e:
        return jsonify({"error": str(e)}), 400
