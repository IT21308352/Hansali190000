from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class SoilNutrientRecommendations(Base):
    __tablename__ = "soil_nutrient_recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    district = Column(String, index=True)
    season = Column(String, index=True)
    nutrient = Column(String, index=True)
    level = Column(String, index=True)
    detailed_recommendation = Column(String)

