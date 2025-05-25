from pydantic import BaseModel

class PestSeverityRecommendations(BaseModel):
    pest_severity: str
    recommendation: str

    class Config:
        orm_mode = True
