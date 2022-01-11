
from tensorflow import keras
import cv2
import numpy as np
class PredictionService:
    path = "models/model_2.h5" 

    def __init__(self):
        self.model = keras.models.load_model(self.path)
    
    def predict(self, input):
        input_reshape = cv2.resize(input, (224, 224)).reshape((1, 224, 224, 3))
        result = self.model.predict(input_reshape)
        return np.argmax(result, axis=1)