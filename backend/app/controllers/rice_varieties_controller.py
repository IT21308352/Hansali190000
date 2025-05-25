from fastapi import APIRouter, HTTPException, Depends
import pandas as pd
import numpy as np
import joblib
from sqlalchemy.orm import Session
from app.models.srilanka_data_model import SriLankaData
from app.models.rice_details_model import RiceDetails
from sklearn.preprocessing import LabelEncoder
import logging
import os

# Set up logging
logging.basicConfig(level=logging.INFO)

# Define the path to the 'train_model' folder
MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'train_model'))

# Load the model and encoders
logreg_model = joblib.load(os.path.join(MODEL_PATH, 'logreg_model.pkl'))
le_temperature = joblib.load(os.path.join(MODEL_PATH, 'le_temperature.pkl'))
le_rainfall = joblib.load(os.path.join(MODEL_PATH, 'le_rainfall.pkl'))

# Helper functions
def map_to_age_group(maturity_days):
    if maturity_days < 90:
        return "2.5"
    elif 90 <= maturity_days < 105:
        return "3"
    elif 105 <= maturity_days < 120:
        return "3.5"
    elif 120 <= maturity_days <= 135:
        return "4"
    elif maturity_days > 135:
        return "5"
    else:
        return None

def convert_maturity_to_numeric(value):
    if isinstance(value, str) and '-' in value:
        parts = value.split('-')
        return (int(parts[0]) + int(parts[1])) / 2
    try:
        return float(value)
    except ValueError:
        return np.nan

# Main function for prediction
def predict_rice_varieties(province_name: str, district_name: str, age_group: str, db: Session):
    # Fetch district data from MySQL database using SQLAlchemy model (SriLankaData)
    try:
        district_data = db.query(SriLankaData).filter_by(province=province_name, district=district_name).first()
        if not district_data:
            raise HTTPException(status_code=404, detail="District not found")

        # Convert the fetched data for prediction (using LabelEncoders for transformation)
        try:
            annual_temperature = le_temperature.transform([district_data.annual_temperature])[0]
            annual_rainfall = le_rainfall.transform([district_data.annual_rainfall])[0]
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error in transforming data: {str(e)}")

    except Exception as e:
        logging.error(f"Error fetching district data: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching district data: {str(e)}")

    # Fetch rice varieties data from the database (RiceDetails table)
    try:
        varieties_data = db.query(RiceDetails).all()
        if not varieties_data:
            raise HTTPException(status_code=404, detail="No rice varieties found")

        # Convert the list of RiceDetails objects into a pandas DataFrame
        varieties_data_df = pd.DataFrame([v.__dict__ for v in varieties_data])

        # Log DataFrame before modifications
        logging.info(f"DataFrame before modifications: \n{varieties_data_df.head()}")

        # Prepare the prediction data
        varieties_data_df['annual_temperature'] = annual_temperature
        varieties_data_df['annual_rainfall'] = annual_rainfall

        # Ensure 'Maturity (days)' is numeric
        varieties_data_df['maturity'] = varieties_data_df['maturity'].apply(convert_maturity_to_numeric)
        varieties_data_df.dropna(subset=['maturity'], inplace=True)

        # Add 'Age Group' if not already present
        if 'age_group' not in varieties_data_df.columns:
            varieties_data_df['age_group'] = varieties_data_df['maturity'].apply(map_to_age_group)

        # Rename columns to match the feature names used during model training
        varieties_data_df.rename(columns={
            'annual_temperature': 'Annual Temperature',
            'annual_rainfall': 'Annual Rainfall',
            'average_yield': 'Average Yield (t/ha)',
            'maturity': 'Maturity (days)'
        }, inplace=True)

        # Log DataFrame after modifications
        logging.info(f"DataFrame after modifications: \n{varieties_data_df.head()}")

        # Prepare features for prediction
        X_pred = varieties_data_df[['Average Yield (t/ha)', 'Maturity (days)', 'Annual Temperature', 'Annual Rainfall']]

        # Predict suitability for each variety
        varieties_data_df['suitability'] = logreg_model.predict(X_pred)

        # Filter suitable varieties
        suitable_varieties = varieties_data_df[varieties_data_df['suitability'] == 1]

        # Convert 'Age Group' column and user input to consistent format
        suitable_varieties['age_group'] = suitable_varieties['age_group'].astype(str)
        age_group = str(age_group)

        # Filter the varieties based on the age group
        suitable_varieties_filtered = suitable_varieties[suitable_varieties['age_group'] == age_group]

        # Return the results
        if suitable_varieties_filtered.empty:
            return {"message": "No suitable rice varieties found for the specified criteria."}

        # Map to schema and return results (converting the filtered data to a dictionary for response)
        return suitable_varieties_filtered[['variety_name', 'Average Yield (t/ha)', 'Maturity (days)', 'age_group', 'gelatinization_temperature', 'grain_shape']].to_dict(orient="records")

    except Exception as e:
        logging.error(f"Error during prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error during prediction: {str(e)}")
