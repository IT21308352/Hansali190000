import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from fastapi import UploadFile, HTTPException
from sqlalchemy.orm import Session
from io import BytesIO
from PIL import Image
import os
import json
from app.models.weed_model import WeedPrediction

# Load model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "../train_model/new_weed_model.h5")
MITIGATION_PATH = os.path.join(BASE_DIR, "../utils/mitigation.json")

model = load_model(MODEL_PATH)

# Class names
CLASS_NAMES = [
    "W_CL_03_Commelina benghalensis", "W_CL_06_Ipomoea aquatic",
    "W_CL_07_Marsilea minuta", "W_CL_09_Paspalum scrobiculatum",
    "W_CL_10_Pteris vittata", "W_CL_11_Synedrella nodiflora"
]

# Load mitigation strategies from JSON file
with open(MITIGATION_PATH, "r") as f:
    MITIGATION_STRATEGIES = json.load(f)

def preprocess_image(img):
    img = img.resize((150, 150))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img /= 255.0
    return img

async def process_weed_image(file: UploadFile, db: Session):
    try:
        contents = await file.read()
        img = Image.open(BytesIO(contents))
        img = preprocess_image(img)

        prediction = model.predict(img)
        predicted_class = CLASS_NAMES[np.argmax(prediction)]

        # Debugging Statements
        print(f"\n Predicted Class: '{predicted_class}'")
        print(f" Available Classes in JSON: {list(MITIGATION_STRATEGIES.keys())}")

        # Fetch mitigation strategies
        mitigation_strategy = MITIGATION_STRATEGIES.get(predicted_class, {})

        # Debugging Output
        if mitigation_strategy:
            print(f" Mitigation Strategies Found for '{predicted_class}':")
            for category, strategies in mitigation_strategy.items():
                print(f"🔹 {category}: {strategies}")
        else:
            print(f" No mitigation strategies available for '{predicted_class}'")
            mitigation_strategy = {"Message": "No mitigation strategy available."}

        # Save prediction to database
        weed_prediction = WeedPrediction(filename=file.filename, weed_class=predicted_class)
        db.add(weed_prediction)
        db.commit()

        # API Response
        response_data = {
            "weed_class": predicted_class,
            "mitigation": mitigation_strategy
        }
        print(f" API Final Response: {json.dumps(response_data, indent=2)}")

        return response_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
