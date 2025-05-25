from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.weather_model import WeatherData as WeatherDataModel
from app.schemas.weather_schema import WeatherData

def get_weather_data(district: str, season: str, db: Session):
    try:
        print(f"Session object: {db}")  # Log the session object
        weather_data = db.query(WeatherDataModel).filter(WeatherDataModel.district == district, WeatherDataModel.season == season).first()
        
        if not weather_data:
            raise HTTPException(status_code=404, detail="Weather data not found for the specified district and season")
        
        return WeatherData.from_orm(weather_data)
    except AttributeError as e:
        print(f"AttributeError: {e}")  # Log the attribute error
        raise HTTPException(status_code=500, detail=f"AttributeError: {str(e)}")
    except Exception as e:
        print(f"Unexpected error: {e}")  # Log any unexpected errors
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
