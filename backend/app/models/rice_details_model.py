from sqlalchemy import Column, Integer, String, Float, Text
from app.utils.database import Base  # Import Base from your database utility

class RiceDetails(Base):
    __tablename__ = "rice_detail"
    
    variety_name = Column("Variety Name", String, primary_key=True)
    year_of_release = Column("Year of Release", Integer)
    parentage = Column("Parentage", String)
    average_yield = Column("Average Yield (t/ha)", Float)
    maturity = Column("Maturity (days)", String)  # Keep as String to handle ranges like '125-130'
    age_group = Column("Age Group", Float)  # Ensure age_group is a float or double in the DB
    basal_leaf_sheath_colour = Column("Basal Leaf Sheath Colour", String)
    recommendation = Column("Recommendation", Text)
    brown_rice_recovery = Column("Brown Rice Recovery (%)", Float)
    milling_recovery = Column("Milling Recovery (%)", Float)
    head_rice_recovery = Column("Head Rice Recovery (%)", Float)
    gelatinization_temperature = Column("Gelatinization Temperature", String)
    thousand_grain_weight = Column("1000 Grain Weight (g)", Float)
    grain_shape = Column("Grain Shape", String)
    pericarp_colour = Column("Pericarp Colour", String)
    bushel_weight = Column("Bushel Weight (Kg)", Float)
    reaction_to_pests_and_diseases = Column("Reaction to Pest and Diseases", Text)
