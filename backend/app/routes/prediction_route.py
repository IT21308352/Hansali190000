# app/routes/predict_route.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.controllers.prediction_controller import predict_harvest
from app.schemas.prediction_schema import FarmData

router = APIRouter()

@router.post("/")
async def predict(data: FarmData):
    try:
        return await predict_harvest(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during prediction: {str(e)}")
