from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class WaterSupply(Base):
    __tablename__ = 'water_supply'

    id = Column(Integer, primary_key=True, index=True)
    district = Column(String, index=True)
    rainwater = Column(String)  # 'Yes' or 'No'
    river_water = Column(String)  # 'Yes' or 'No'
    irrigation = Column(String)  # 'Yes' or 'No'
    supply_methods = Column(String)  # E.g., "Drip", "Surface", etc.
