from lime import lime_image

class ExplainabilityService:

    def __init__(self):
        pass

    def get_lime(self, model, input_image):
        explainer = lime_image.LimeImageExplainer()
        explanation = explainer.explain_instance(input_image.astype('uint8'), model.predict,  
                                         top_labels=3, hide_color=0, num_samples=1000)