from sqlalchemy import Column, String, Integer, Text
from app.utils.database import Base

class SriLankaData(Base):
    __tablename__ = "srilanka_data"

    id = Column(Integer, primary_key=True, autoincrement=True)
    province = Column(String, nullable=False)
    district = Column(String, nullable=False)
    annual_temperature = Column(String, nullable=False)  # Changed from Enum to String
    annual_humidity = Column(String, nullable=False)     # Changed from Enum to String
    annual_rainfall = Column(String, nullable=False)     # Changed from Enum to String
    recommendation = Column(Text, nullable=True)
