from pydantic import BaseModel
from typing import Dict, List, Union

class WeedPredictionResponse(BaseModel):
    weed_class: str
    mitigation: Dict[str, Union[List[str], str]]  # Adjusted to handle multiple mitigation strategies

    class Config:
        orm_mode = True
