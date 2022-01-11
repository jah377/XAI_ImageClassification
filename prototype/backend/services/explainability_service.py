from lime import lime_image
from skimage.segmentation import mark_boundaries
import cv2

from models.gradcam import GradCAM
class ExplainabilityService:

    def __init__(self):
        pass

    def get_lime(self, model, input_image):
        image_re = input_image.reshape((1, 224, 224, 3))
        explainer = lime_image.LimeImageExplainer()
        explanation = explainer.explain_instance(image_re.astype('uint8'), model.predict,  
                                         top_labels=3, hide_color=0, num_samples=1000)
        temp_1, mask_1 = explanation.get_image_and_mask(explanation.top_labels[0], positive_only=True, num_features=5, hide_rest=False)
        return mark_boundaries(temp_1, mask_1)

    def get_heatmap(self, model, input_image):
        image_re = input_image.reshape((1, 224, 224, 3))
        icam = GradCAM(model, layerName='conv5_block32_concat') 
        heatmap = icam.compute_heatmap(image_re)
        heatmap = cv2.resize(heatmap, (224, 224))
        return heatmap