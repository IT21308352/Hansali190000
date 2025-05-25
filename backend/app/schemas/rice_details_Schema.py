from pydantic import BaseModel

class RiceDetailsSchema(BaseModel):
    variety_name: str
    year_of_release: int
    parentage: str
    average_yield: float
    maturity: str  # Change this to string to accept the range format
    age_group: float
    basal_leaf_sheath_colour: str
    recommendation: str
    brown_rice_recovery: float
    milling_recovery: float
    head_rice_recovery: float
    gelatinization_temperature: str
    thousand_grain_weight: float
    grain_shape: str
    pericarp_colour: str
    bushel_weight: float
    reaction_to_pests_and_diseases: str

    class Config:
        orm_mode = True
        alias_generator = lambda string: string.replace(" ", "_").lower()
