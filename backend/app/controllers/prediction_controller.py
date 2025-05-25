# app/controllers/predict_controller.py

import pandas as pd
from fastapi import HTTPException
from app.utils.model_loader import load_model
from app.schemas.prediction_schema import FarmData

# Load the model
model = load_model("app/train_model/rice_yield_random_forest_model.pkl")

# Prediction controller function
async def predict_harvest(data: FarmData):
    try:
        # Ensure previous_yield_per_hectare is set to 0 if not provided
        previous_yield_per_hectare = 0  # Set to 0 by default

        # Create a DataFrame with the input data, including previous_yield_per_hectare
        new_data = pd.DataFrame([{
            'Rainfall (mm)': data.rainfall,
            'Temperature (°C)': data.temperature,
            'Relative Humidity (%)': data.humidity,
            'Sunshine Hours (hrs)': data.sunshine_hours,
            'Wind Speed (km/h)': data.wind_speed,
            'Soil Type': data.soil_type,
            'Irrigation Type': data.irrigation_type,
            'Water Source': data.water_source,
            'Paddy Variety': data.paddy_variety,
            'Fertilizer Usage (kg)': data.fertilizer_usage,
            'Area (hectare)': data.area,
            'Soil Nitrogen (mg/kg)': data.soil_nitrogen,
            'Soil Phosphorus (mg/kg)': data.soil_phosphorus,
            'Soil Potassium (mg/kg)': data.soil_potassium,
            'Pest Severity': data.pest_severity,
            'Season': data.season,
            'District': data.district,
            'Previous Yield (kg/hectare)': previous_yield_per_hectare  # Always 0
        }])

        # Predict the yield
        total_predicted_yield = model.predict(new_data)[0]
        predicted_yield_per_hectare = total_predicted_yield / data.area

        return {
            "total_predicted_yield": total_predicted_yield,
            "predicted_yield_per_hectare": predicted_yield_per_hectare
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
