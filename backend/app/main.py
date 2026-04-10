from flask import Flask, request, jsonify
from routes.predict import predict_fraud
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Register API route
app.register_blueprint(predict_fraud, url_prefix="/api")

@app.route("/")
def home():
    return jsonify({"message": "Invoice Fraud Detection API Running!"})

if __name__ == "__main__":
    app.run(debug=True)
