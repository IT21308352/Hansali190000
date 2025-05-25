from sqlalchemy import Column, Integer, String
from app.utils.database import Base

class WeedPrediction(Base):
    __tablename__ = "weed_predictions"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    weed_class = Column(String(255), nullable=False)
