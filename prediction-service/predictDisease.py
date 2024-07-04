from flask import Flask, request, jsonify, after_this_request
from flask_cors import CORS
import pickle
import os
from pred import predictDiseases
import py_eureka_client.eureka_client as eureka_client

eureka_client.init(eureka_server="http://localhost:8761/eureka",
                   app_name="disease-prediction-service",
                   instance_port=8980)

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*":{
        "origins": "*"
        }
    })

@app.route('/hello', methods=['GET'])
def hello():

    return jsonify("Flask server running")

@app.route('/prediction-api/predict', methods=["POST"])
def predict():
    data = request.form['data']
    print(data)
    pred="hello"
    pred=predictDiseases(data)
    return jsonify(pred)

#print(predictDiseases("Itching,Skin Rash,Nodal Skin Eruptions"))

if __name__ == '__main__':
    app.run(host='localhost', port=8980, debug=True, use_reloader=False)

