from sqlalchemy import Column, Integer, String, Text
from app.utils.database import Base

class DistrictRecommendations(Base):
    __tablename__ = 'district_recommendations'

    id = Column(Integer, primary_key=True, index=True)
    district = Column(String, index=True)
    season = Column(String, index=True)
    recommendation_1 = Column('recommendation 1', Text)
    recommendation_2 = Column('recommendation 2', Text)
    recommendation_3 = Column('recommendation 3', Text)
    recommendation_4 = Column('recommendation 4', Text)
    recommendation_5 = Column('recommendation 5', Text)
    recommendation_6 = Column('recommendation 6', Text)
    recommendation_7 = Column('recommendation 7', Text)
    recommendation_8 = Column('recommendation 8', Text)
    recommendation_9 = Column('recommendation 9', Text)
    recommendation_10 = Column('recommendation 10', Text)
