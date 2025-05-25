from pydantic import BaseModel
from typing import Optional

# Schema for creating a user
class UserCreate(BaseModel):
    email: str
    name: str
    password: str

# Schema for user login
class UserLogin(BaseModel):
    email: str
    password: str

# Token response schema
class Token(BaseModel):
    access_token: str
    token_type: str

# Response schema for user data
class UserResponse(BaseModel):
    id: int
    email: str
    name: str

    class Config:
        orm_mode = True
