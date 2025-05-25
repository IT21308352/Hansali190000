from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.schemas.rice_details_Schema import RiceDetailsSchema
from app.controllers.rice_details_controller import fetch_rice_details, fetch_rice_varieties_by_age_group, fetch_rice_varieties_by_district

router = APIRouter()

# Fetch rice varieties grouped by age group
@router.get("/rice-varieties/by-age-group", response_model=dict[float, list[str]])
def get_rice_varieties_by_age_group(db: Session = Depends(get_db)):
    return fetch_rice_varieties_by_age_group(db)

@router.get("/rice-varieties/{district}", response_model=list[str])
def get_rice_varieties_by_district(district: str, db: Session = Depends(get_db)):
    return fetch_rice_varieties_by_district(district, db)

@router.get("/{variety_name}", response_model=RiceDetailsSchema)
def get_rice_details(variety_name: str, db: Session = Depends(get_db)):
    return fetch_rice_details(variety_name, db)


