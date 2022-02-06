import os

from flask import Flask, jsonify, request
from flask_cors import CORS
import cv2

from services.explainability_service import ExplainabilityService
from services.image_converter import ImageConverter
from services.prediction_service import PredictionService

from constants import *
# app = Flask(__name__, static_url_path='/dsp')
app = Flask(__name__)
CORS(app)

# @app.route('/', methods=['GET'])  # When someone goes to / on the server, execute the following function
# def home():
#     return app.send_static_file('index.html')

imgConverter = ImageConverter()
predictionService = PredictionService()
explanationService = ExplainabilityService(predictionService.model)

@app.route('/api/v1/xray/analysis', methods=['POST'])
def analysis():
    body = request.form
    imageBase64 = body['xray']
    img = imgConverter.decodeFromBase64(imageBase64)
    img = cv2.resize(img, (WIDTH, HEIGHT))

    response = {}
    response["klScores"] = {'distributions': predictionService.predict(img)}

    heatmap = explanationService.get_heatmap(img)

    response["baseImage"] = {
        "image": imageBase64,
        "width": WIDTH,
        "height": HEIGHT
    }

    response["explanations"] = [
        {
            "name": "Arrows",
            "image": imgConverter.encodeToBase64(explanationService.get_arrows(heatmap)),
            "description": "",
            "width": WIDTH,
            "height": HEIGHT,
            "order": 1
        },
        {
            "name": "Bounding Box",
            "image": imgConverter.encodeToBase64(explanationService.get_bounding_box(heatmap)),
            "description": "",
            "width": WIDTH,
            "height": HEIGHT,
            "order": 2
        },
        {
            "name": "Heatmap",
            "image": imgConverter.encodeToBase64(heatmap),
            "description": "Heatmap hightlighting which areas lead to the decision of the KL Score",
            "width": WIDTH,
            "height": HEIGHT,
            "order": 3
        },
    ]

    return jsonify(response)

if __name__ == '__main__':
    if os.environ['ENV'] and os.environ['ENV'] == 'prod':
        app.run()
    else:
        host = "localhost"
        port = 8082
        debug = False
        options = {}
        app.run(host, port, debug, options)
