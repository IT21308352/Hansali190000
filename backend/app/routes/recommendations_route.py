from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.controllers.recommendations_controller import get_soil_recommendations, get_pest_recommendations
from app.utils.database import get_db  # Database session dependency
from app.controllers.recommendations_controller import get_water_supply_recommendations
from app.controllers.recommendations_controller import get_district_recommendations
from app.schemas.district_recommendations_schema import DistrictRecommendationsBase


router = APIRouter()

# Route for soil recommendations
@router.post("/soil-recommendations")
async def get_soil_recommendations_route(district: str, season: str, nitrogen: float, phosphorus: float, potassium: float, db: Session = Depends(get_db)):
    try:
        # Call the controller to get soil recommendations
        recommendations = await get_soil_recommendations(db, district, season, nitrogen, phosphorus, potassium)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching soil recommendations: {str(e)}")


# Route for pest severity recommendations
@router.post("/pest-recommendations")
async def get_pest_recommendations_route(pest_severity: str, db: Session = Depends(get_db)):
    try:
        # Call the controller to get pest recommendations
        recommendations = await get_pest_recommendations(db, pest_severity)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching pest recommendations: {str(e)}")
    

# Route for fetching water supply recommendations based on district
@router.post("/water-supply-recommendations")
async def get_water_supply_recommendations_route(district: str, db: Session = Depends(get_db)):
    try:
        # Call the controller to get water supply recommendations
        recommendations = await get_water_supply_recommendations(db, district)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching water supply recommendations: {str(e)}")
    

# Route for fetching district recommendations based on district and season
@router.post("/district-recommendations")
async def get_district_recommendations_route(district: str, season: str, db: Session = Depends(get_db)):
    try:
        # Call the controller to get district recommendations
        recommendations = await get_district_recommendations(db, district, season)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching district recommendations: {str(e)}")

# Example route for fetching water supply recommendations based on district
@router.post("/water-supply-recommendations")
async def get_water_supply_recommendations_route(district: str, db: Session = Depends(get_db)):
    try:
        # Call the controller to get water supply recommendations
        recommendations = await get_water_supply_recommendations(db, district)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching water supply recommendations: {str(e)}")
