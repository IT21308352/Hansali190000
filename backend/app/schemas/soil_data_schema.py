from pydantic import BaseModel

class SoilData(BaseModel):
    district: str
    season: str
    nitrogen_range: str
    phosphorus_range: str
    potassium_range: str

    class Config:
        orm_mode = True
        from_attributes = True
