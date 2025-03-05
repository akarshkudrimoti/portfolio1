# Face API.js Models Setup

This directory should contain the face-api.js model files required for face detection and expression recognition.

## Required Models
- TinyFaceDetector model
- FaceExpression model

## How to Set Up

1. Create a `models` directory in your `public` folder.

2. Download the models from the official face-api.js repo:
   https://github.com/justadudewhohacks/face-api.js/tree/master/weights

3. Place the following files in this directory:
   - tiny_face_detector_model-shard1
   - tiny_face_detector_model-weights_manifest.json
   - face_expression_model-shard1
   - face_expression_model-weights_manifest.json

## Alternative Setup

If you don't want to use face recognition, you can access the terminal directly
by clicking "OVERRIDE AUTHENTICATION" or "CONTINUE WITHOUT BIOMETRICS". 