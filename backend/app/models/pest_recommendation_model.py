from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class PestSeverityRecommendations(Base):
    __tablename__ = "pest_recommendations"
    
    id = Column(Integer, primary_key=True, index=True)  # Primary key column
    pest_severity = Column(String, index=True)
    recommendation = Column(String)

