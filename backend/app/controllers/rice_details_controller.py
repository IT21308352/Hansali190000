from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.rice_details_model import RiceDetails
from app.models.rice_recommendation_model import RiceVariety

# Fetch a single paddy variety by its name
def fetch_rice_details(variety_name: str, db: Session):
    variety = db.query(RiceDetails).filter(RiceDetails.variety_name == variety_name).first()
    if not variety:
        raise HTTPException(status_code=404, detail="Variety not found")
    return variety

# Fetch rice varieties grouped by age group
def fetch_rice_varieties_by_age_group(db: Session):
    varieties = db.query(RiceDetails.age_group, RiceDetails.variety_name).all()  # Fetch age_group and variety_name columns
    if not varieties:
        raise HTTPException(status_code=404, detail="No rice varieties found")
    
    grouped_varieties = {}
    for age_group, variety_name in varieties:
        if age_group not in grouped_varieties:
            grouped_varieties[age_group] = []
        grouped_varieties[age_group].append(variety_name)
    
    return grouped_varieties

# Fetch rice varieties by district
def fetch_rice_varieties_by_district(district: str, db: Session):
    rice_varieties = db.query(RiceVariety).filter(RiceVariety.district == district).all()
    
    if rice_varieties:
        return [variety.rice_variety for variety in rice_varieties]
    return []
