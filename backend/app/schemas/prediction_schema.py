from pydantic import BaseModel
from typing import Optional

class FarmData(BaseModel):
    district: str
    season: str
    temperature: Optional[float] = None
    rainfall: Optional[float] = None
    sunshine_hours: Optional[float] = None
    humidity: Optional[float] = None
    wind_speed: Optional[float] = None
    soil_type: Optional[str] = None
    irrigation_type: Optional[str] = None
    water_source: Optional[str] = None
    paddy_variety: Optional[str] = None
    fertilizer_usage: Optional[float] = None
    soil_nitrogen: Optional[float] = None
    soil_phosphorus: Optional[float] = None
    soil_potassium: Optional[float] = None
    pest_severity: Optional[str] = None
    area: Optional[float] = None
    previous_yield_per_hectare: Optional[float] = None

    class Config:
        from_attributes = True
