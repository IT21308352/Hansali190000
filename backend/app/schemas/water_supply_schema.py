from pydantic import BaseModel

class WaterSupplyBase(BaseModel):
    district: str
    rainwater: str  
    river_water: str  
    irrigation: str 
    supply_methods: str  

    class Config:
        orm_mode = True
        from_attributes = True
