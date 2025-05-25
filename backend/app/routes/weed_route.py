from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.controllers.weed_controller import process_weed_image
from app.utils.database import get_db
from app.schemas.weed_schema import WeedPredictionResponse

router = APIRouter()

@router.post("/predict/", response_model=WeedPredictionResponse)
async def predict_weed(file: UploadFile = File(...), db: Session = Depends(get_db)):
    return await process_weed_image(file, db)
