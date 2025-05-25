from sqlalchemy.orm import Session
from app.models.user_model import User
from app.schemas.user_schema import UserCreate, UserLogin, Token
from app.utils.hashing import hash_password, verify_password
from app.utils.jwt import create_access_token

# Create a new user
def create_user(db: Session, user: UserCreate):
    hashed_password = hash_password(user.password)
    db_user = User(email=user.email, name=user.name, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Authenticate the user (check if email and password match)
def authenticate_user(db: Session, user: UserLogin):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user and verify_password(user.password, db_user.hashed_password):
        return db_user
    return None
