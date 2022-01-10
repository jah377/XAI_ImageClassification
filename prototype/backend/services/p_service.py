
from services.model import Model

class PredictionService:
    models = []

    def __init__(self):
        paths = [
        "services/model_2.h5" 
            ]
        self.models = [Model().load(path) for path in paths]
    
    def predict(self, input):
        results = [model.predict(input) for model in self.models]
        [print(r) for r in results]
        return results