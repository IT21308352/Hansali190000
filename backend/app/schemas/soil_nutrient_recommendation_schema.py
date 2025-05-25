from pydantic import BaseModel

class SoilNutrientRecommendations(BaseModel):
    district: str
    season: str
    nutrient: str
    level: str
    detailed_recommendation: str

    class Config:
        orm_mode = True
        from_attributes = True
