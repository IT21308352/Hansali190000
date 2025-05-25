import joblib
import os

def load_model(model_path: str):
    if os.path.exists(model_path):
        return joblib.load(model_path)
    else:
        raise FileNotFoundError(f"Model file not found at {model_path}")