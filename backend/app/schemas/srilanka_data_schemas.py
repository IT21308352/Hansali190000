from pydantic import BaseModel
from typing import Optional

class SriLankaDataBase(BaseModel):
    province: str
    district: str
    annual_temperature: str  # High, Normal, Low
    annual_humidity: str     # High, Normal, Low
    annual_rainfall: str     # High, Normal, Low
    recommendation: Optional[str] = None

class SriLankaDataCreate(SriLankaDataBase):
    pass

class SriLankaDataUpdate(SriLankaDataBase):
    pass

class SriLankaData(SriLankaDataBase):
    class Config:
        orm_mode = True
