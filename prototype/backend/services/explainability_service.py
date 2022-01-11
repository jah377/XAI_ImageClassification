from constants import *
from models.explainability_algorithms import GradCAM, Lime, Outlining

class ExplainabilityService:

    def __init__(self, model):
        self.limeExplainer = Lime(model)
        self.icam = GradCAM(model, layerName='conv5_block32_concat')
        self.outlining = Outlining()
        pass

    def get_lime(self, input_image):
        return self.limeExplainer.get_explanation(input_image)

    def get_heatmap(self, input_image):
        return self.icam.compute_heatmap(input_image)
    
    def get_bounding_box(self, heatmap):
        return self.outlining.drawHeatmapBasedBoundingBox(heatmap)

    def get_arrows(self, heatmap):
        return self.outlining.drawHeatmapBasedArrows(heatmap)