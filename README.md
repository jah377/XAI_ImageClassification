# An XAI Clinical Decision Support System Approach for the Assessment of Knee Osteoarthritis
*Data Systems Course (5294DASP6Y)*

![Screenshot of the Analysis Page displaying a heatmap overlaying a knee x-ray and having a prediction of a KL-score of 4 on the x-ray's left side](https://raw.github.com/jah377/XAI_ImageClassification/main/report/github_analysis.png)

**Awarded 3rd place at the Data Systems Symposium out of the entire Information Studies program, as voted on by the professors and peers**

This prototype was the sole work output of the 6mo-long Data Systems course, in partial fulfillment of the degree of MSc. in Data Science at the University of Amsterdam. The project was in collaboration with [Quin.md](https://quin.md/en), a medical healthcare platform based in Amsterdam.

🚶 **[Video Walkthrough 1](https://vimeo.com/673296028)** and ⚾️ **[Video Pitch](https://vimeo.com/673322353)**

## Executive Summary

Clinical decision support (CDS) systems transform healthcare by syntehsizing clinican experience with algorithmically learned medical knowledge. Current diagnoses like knee degeneration evaluation rely heavily on medical imaging. AI-based CDS systems are limited by the lack of interpretability and complex disruptive workflows. 

The project aimed to design, build, and test a CDS prototype that used AI and explainable AI algorithms to predict osteoarthrisis scores and visualize what areas of the image contributed to the prediction. Multiple clinicians were interviewed to better undstand their current workflows and desired features. The UI was built on top of the market-leading web framework React.js. The back-end was built with Python, and model training was performed using Keras; GradCAM was used to visually explain the results to the physician. 

A copy of the slides presented at the symposium can be found [here](https://raw.github.com/jah377/XAI_ImageClassification/main/report/presentation.pdf). The corresponding manuscript can be found [here](https://raw.github.com/jah377/XAI_ImageClassification/main/report/manuscript.pdf)


## How to run app locally

[Setup and run instructions for the server](/prototype/backend/README.md)

[Setup and run instructions for the UI](/prototype/doctors-ui/README.md)
