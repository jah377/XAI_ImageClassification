from tensorflow import keras

class Model:

    model = {}
    def __init__(self):
        pass

    def load(self, source: str):
        """Loads the model from the path"""
        self.model = keras.models.load_model(source)
    
    def predict(self, input):
        """Predicts"""
        return self.model.predict(input)
