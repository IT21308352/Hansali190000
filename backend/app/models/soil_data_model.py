from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class SoilData(Base):
    __tablename__ = "soil_data"
    
    id = Column(Integer, primary_key=True, index=True)  # Add primary key `id`
    district = Column(String, index=True)
    season = Column(String, index=True)
    nitrogen_range = Column(String)
    phosphorus_range = Column(String)
    potassium_range = Column(String)
