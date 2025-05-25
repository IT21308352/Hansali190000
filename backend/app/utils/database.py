from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.orm.session import Session

# Database URL (replace with your actual credentials if needed)
DATABASE_URL = "mysql+mysqlconnector://root:root@localhost:3306/paddy_cultivation_db"

# Create the database engine
engine = create_engine(DATABASE_URL, echo=True)  # echo=True for logging SQL statements

# SessionLocal is a session maker factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all ORM models
Base = declarative_base()

# Dependency that will be injected into route functions to interact with DB
def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db  # This allows FastAPI to inject the session
    finally:
        db.close()
