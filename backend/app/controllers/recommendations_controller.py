from sqlalchemy.orm import Session
from app.models.soil_data_model import SoilData as SoilDataModel
from app.models.soil_nutrient_recommendation_model import SoilNutrientRecommendations as SoilNutrientRecommendationsModel
from app.models.pest_recommendation_model import PestSeverityRecommendations as PestSeverityRecommendationsModel
from fastapi import HTTPException
from app.schemas.soil_data_schema import SoilData
from app.schemas.soil_nutrient_recommendation_schema import SoilNutrientRecommendations
from typing import List
from app.models.water_supply_model import WaterSupply
from app.schemas.water_supply_schema import WaterSupplyBase  # Import WaterSupplyBase directly
from app.models.district_recommendation_model import DistrictRecommendations
from app.schemas.district_recommendations_schema import DistrictRecommendationsBase

# Controller function to get pest recommendations
async def get_pest_recommendations(db: Session, pest_severity: str):
    try:
        # Fetch pest severity recommendations for the given pest severity
        pest_recommendations = db.query(PestSeverityRecommendationsModel).filter(
            PestSeverityRecommendationsModel.pest_severity == pest_severity
        ).all()

        if not pest_recommendations:
            raise HTTPException(status_code=404, detail="No recommendations found for the given pest severity.")

        return pest_recommendations

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching pest recommendations: {str(e)}")

# Controller function to get soil recommendations
async def get_soil_recommendations(db: Session, district: str, season: str, nitrogen: float, phosphorus: float, potassium: float) -> List[SoilNutrientRecommendations]:
    try:
        # Step 1: Fetch soil data for the given district and season
        soil_data = db.query(SoilDataModel).filter(
            SoilDataModel.district == district,
            SoilDataModel.season == season
        ).first()

        if not soil_data:
            raise HTTPException(status_code=404, detail="No soil data found for the given district and season.")

        # Step 2: Determine the nitrogen, phosphorus, and potassium levels from the soil_data table
        nitrogen_level = determine_level(soil_data.nitrogen_range, nitrogen)
        phosphorus_level = determine_level(soil_data.phosphorus_range, phosphorus)
        potassium_level = determine_level(soil_data.potassium_range, potassium)

        # Step 3: Fetch recommendations for the levels of each nutrient (from soil_nutrient_recommendations)
        recommendations = []

        # Nitrogen Recommendation
        if nitrogen_level:
            nitrogen_recommendation = db.query(
                SoilNutrientRecommendationsModel.id,
                SoilNutrientRecommendationsModel.district,
                SoilNutrientRecommendationsModel.season,
                SoilNutrientRecommendationsModel.nutrient,
                SoilNutrientRecommendationsModel.level,
                SoilNutrientRecommendationsModel.detailed_recommendation
            ).filter(
                SoilNutrientRecommendationsModel.district == district,
                SoilNutrientRecommendationsModel.season == season,
                SoilNutrientRecommendationsModel.nutrient == "Nitrogen",
                SoilNutrientRecommendationsModel.level == nitrogen_level
            ).first()
            if nitrogen_recommendation:
                recommendations.append(nitrogen_recommendation)

        # Phosphorus Recommendation
        if phosphorus_level:
            phosphorus_recommendation = db.query(
                SoilNutrientRecommendationsModel.id,
                SoilNutrientRecommendationsModel.district,
                SoilNutrientRecommendationsModel.season,
                SoilNutrientRecommendationsModel.nutrient,
                SoilNutrientRecommendationsModel.level,
                SoilNutrientRecommendationsModel.detailed_recommendation
            ).filter(
                SoilNutrientRecommendationsModel.district == district,
                SoilNutrientRecommendationsModel.season == season,
                SoilNutrientRecommendationsModel.nutrient == "Phosphorus",
                SoilNutrientRecommendationsModel.level == phosphorus_level
            ).first()
            if phosphorus_recommendation:
                recommendations.append(phosphorus_recommendation)

        # Potassium Recommendation
        if potassium_level:
            potassium_recommendation = db.query(
                SoilNutrientRecommendationsModel.id,
                SoilNutrientRecommendationsModel.district,
                SoilNutrientRecommendationsModel.season,
                SoilNutrientRecommendationsModel.nutrient,
                SoilNutrientRecommendationsModel.level,
                SoilNutrientRecommendationsModel.detailed_recommendation
            ).filter(
                SoilNutrientRecommendationsModel.district == district,
                SoilNutrientRecommendationsModel.season == season,
                SoilNutrientRecommendationsModel.nutrient == "Potassium",
                SoilNutrientRecommendationsModel.level == potassium_level
            ).first()
            if potassium_recommendation:
                recommendations.append(potassium_recommendation)

        # Step 4: Return recommendations
        if not recommendations:
            raise HTTPException(status_code=404, detail="No recommendations found for the given soil data.")

        # Convert recommendations to Pydantic models
        return [SoilNutrientRecommendations.from_orm(rec) for rec in recommendations]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching soil recommendations: {str(e)}")

# Helper function to determine the level (Low, Medium, High) based on the nutrient range
def determine_level(nutrient_range: str, nutrient_value: float) -> str:
    try:
        # Parse the range (e.g., '25-45') into min and max values
        min_value, max_value = map(float, nutrient_range.split('-'))
        if nutrient_value < min_value:
            return "Low"
        elif nutrient_value > max_value:
            return "High"
        else:
            return "Medium"
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid nutrient range format: {str(e)}")


# Controller function to get water supply recommendations based on district
async def get_water_supply_recommendations(db: Session, district: str):
    try:
        # Fetch water supply data for the given district
        water_supply_data = db.query(WaterSupply).filter(
            WaterSupply.district == district
        ).all()

        if not water_supply_data:
            raise HTTPException(status_code=404, detail="No water supply data found for the given district.")

        # Return a list of data as WaterSupplyBase schema, as WaterSupplyBase is used for both request and response
        return [WaterSupplyBase.from_orm(data) for data in water_supply_data]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching water supply recommendations: {str(e)}")

# Controller function to create a new water supply record
async def create_water_supply(db: Session, water_supply: WaterSupplyBase):  # Use WaterSupplyBase directly
    try:
        # Create a new water supply record
        new_water_supply = WaterSupply(**water_supply.dict())
        db.add(new_water_supply)
        db.commit()
        db.refresh(new_water_supply)

        # Return the created data as WaterSupplyBase schema
        return WaterSupplyBase.from_orm(new_water_supply)

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error creating water supply record: {str(e)}")

# Controller function to get district recommendations based on district and season
async def get_district_recommendations(db: Session, district: str, season: str):
    try:
        # Fetch district recommendations for the given district and season
        district_data = db.query(DistrictRecommendations).filter(
            DistrictRecommendations.district == district,
            DistrictRecommendations.season == season
        ).first()

        if not district_data:
            raise HTTPException(status_code=404, detail="No district recommendations found for the given district and season.")

        # Return data as DistrictRecommendationsBase schema
        return DistrictRecommendationsBase.from_orm(district_data)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching district recommendations: {str(e)}")
