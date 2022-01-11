from constants import *

from models.explainability_algorithms import GradCAM, Lime
class ExplainabilityService:

    def __init__(self, model):
        self.limeExplainer = Lime(model)
        self.icam = GradCAM(model, layerName='conv5_block32_concat')
        pass

    def get_lime(self, input_image):
        return self.limeExplainer.get_explanation(input_image)

    def get_heatmap(self, input_image):
        return self.icam(input_image)
    
    def get_bounding_box(self, input_image):
        pass