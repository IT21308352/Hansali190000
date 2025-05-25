from pydantic import BaseModel
from typing import Optional

class DistrictRecommendationsBase(BaseModel):
    district: str
    season: str
    recommendation_1: Optional[str] = None
    recommendation_2: Optional[str] = None
    recommendation_3: Optional[str] = None
    recommendation_4: Optional[str] = None
    recommendation_5: Optional[str] = None
    recommendation_6: Optional[str] = None
    recommendation_7: Optional[str] = None
    recommendation_8: Optional[str] = None
    recommendation_9: Optional[str] = None
    recommendation_10: Optional[str] = None

    class Config:
        orm_mode = True
        from_attributes = True
