import re, time, base64
import numpy as np
import cv2

class ImageConverter:

    def decodeFromBase64(self, base64String: str):
        byte_data = bytearray(base64.b64decode(base64String))
        return cv2.imdecode(np.array(byte_data), cv2.IMREAD_COLOR)

    def encodeToBase64(self, img):
        _, imagebytes = cv2.imencode('.jpg', img)
        return base64.b64encode(imagebytes).decode("utf-8") 
