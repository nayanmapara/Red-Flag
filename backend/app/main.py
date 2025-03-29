from flask import Flask, request, jsonify
from routes.predict import predict_fraud

app = Flask(__name__)

# Register API route
app.register_blueprint(predict_fraud, url_prefix="/api")

@app.route("/")
def home():
    return jsonify({"message": "Invoice Fraud Detection API Running!"})

if __name__ == "__main__":
    app.run(debug=True)
