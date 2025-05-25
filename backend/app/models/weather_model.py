from sqlalchemy import Column, String, Integer, Float
from app.utils.database import Base

class WeatherData(Base):
    __tablename__ = "weather_data"

    id = Column(Integer, primary_key=True, index=True)
    district = Column(String(50), index=True)
    season = Column(String(50), index=True)
    average_temperature = Column(Float)
    average_rainfall = Column(Float)
    average_sunshine_hours = Column(Float)
    average_humidity = Column(Float)
    average_windspeed = Column(Float)  # Add average windspeed here
    
