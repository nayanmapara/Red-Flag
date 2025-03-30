import requests

url = "http://127.0.0.1:5000/api/predict"
# file_path = "./sample_invoice.pdf" 
file_path = "./fraudulent_invoice.pdf"

with open(file_path, "rb") as f:
    files = {"file": f}
    response = requests.post(url, files=files)

print(response.json())  # Prints the extracted text & analysis