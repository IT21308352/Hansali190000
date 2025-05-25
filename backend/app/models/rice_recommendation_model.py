from sqlalchemy import Column, Integer, String, Text
from app.utils.database import Base

class RiceVariety(Base):
    __tablename__ = "rice_recommendation"

    id = Column(Integer, primary_key=True, index=True)
    province = Column(String(100), index=True)
    district = Column(String(100), index=True)
    age_group = Column(String(50), index=True)
    rice_variety = Column(Text)  # To store comma-separated varietiesyou know comuname
    