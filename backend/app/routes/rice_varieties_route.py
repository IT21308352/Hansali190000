from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.controllers.rice_varieties_controller import predict_rice_varieties
import logging

router = APIRouter()

class RiceVarietyRequest(BaseModel):
    province_name: str  # Updated name
    district_name: str  # Updated name
    age_group: str

@router.post("/rice_varieties/")
async def predict_rice_varieties_route(request: RiceVarietyRequest, db: Session = Depends(get_db)):
    try:
        # Log received data
        logging.info(f"Received data: {request}")

        # Call the function with correct attributes
        return predict_rice_varieties(request.province_name, request.district_name, request.age_group, db)
    except Exception as e:
        logging.error(f"Invalid input: {e}")
        raise HTTPException(status_code=400, detail=f"Invalid input: {e}")
