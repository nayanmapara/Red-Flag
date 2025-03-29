import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest

class InvoiceFraudModel:
    def __init__(self):
        self.model = IsolationForest(n_estimators=100, contamination=0.05)

    def train(self, data):
        X = data.drop(columns=["fraud"])  # (1=fraud, 0=non-fraud)
        self.model.fit(X)
        joblib.dump(self.model, "app/data/invoice_fraud.pkl")

    def predict(self, X):
        loaded_model = joblib.load("app/data/invoice_fraud.pkl")
        prediction = loaded_model.predict([X])[0]
        return {"fraud": True if prediction == -1 else False}
