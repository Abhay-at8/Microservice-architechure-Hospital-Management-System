from flask import Flask, request, jsonify, after_this_request
from flask_cors import CORS
import pickle
import os

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*":{
        "origins": "*"
        }
    })

@app.route('/hello', methods=['GET'])
def hello():
    file = os.path.exists('pdmodel.pkl')
    if(file):
        print("Model Found")
    else:
        print("Model file missing")
    return jsonify("Flask server running")

@app.route('/predict', methods=["POST"])
def predict():
    data = request.form['data'].split(',')
    print(data)
    pickled_model = pickle.load(open('pdmodel.pkl', 'rb'))
    pred = pickled_model.predict([data])
    print(str(pred[0]))
    return jsonify(str(pred[0]))


if __name__ == '__main__':
    app.run(host='localhost', port=8980, debug=True, use_reloader=False)

