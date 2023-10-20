from flask import Flask
from flask_cors import CORS
api = Flask(__name__)
CORS(api, supports_credentials=True)
@api.route('/GetReceipts')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }
    
    return response_body