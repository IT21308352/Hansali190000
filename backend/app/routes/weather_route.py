from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.controllers.weather_controller import get_weather_data
from app.schemas.weather_schema import WeatherData
from app.utils.database import get_db

router = APIRouter()

@router.get("/", response_model=WeatherData)
async def get_weather(district: str, season: str, db: Session = Depends(get_db)):
    try:
        print(f"Received request for district: {district}, season: {season}")  # Log the received request
        return get_weather_data(district, season, db)
    except HTTPException as e:
        print(f"HTTPException: {e.detail}")  # Log the HTTP exception details
        raise e  # Reraise the exception to be handled by FastAPI
    except Exception as e:
        print(f"Unexpected error at route: {e}")  # Log any unexpected errors at the route level
        raise HTTPException(status_code=500, detail=f"Unexpected error at route: {str(e)}")
