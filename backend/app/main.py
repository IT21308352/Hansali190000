from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware

# Routers
from app.routes.weather_route import router as weather_router
from app.routes.prediction_route import router as predict_router
from app.routes.user_route import router as user_route
from app.routes.recommendations_route import router as recommendations_router
from app.routes.recommendations_route import router as district_recommendations_router
from app.routes.rice_details_route import router as rice_details_route
from app.routes.rice_varieties_route import router as rice_varieties_router
from app.routes.weed_route import router as weed_router

# Database
from app.utils.database import engine, Base

# Initialize DB tables
Base.metadata.create_all(bind=engine)

# Create app
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Optional debug: show SQLite version
import sqlite3
print("SQLite version:", sqlite3.sqlite_version)

# Routes
app.include_router(weather_router, prefix="/weather")
app.include_router(predict_router, prefix="/predict")
app.include_router(user_route, prefix="/auth", tags=["auth"])
app.include_router(recommendations_router, prefix="/api", tags=["Pest Recommendations"])
app.include_router(district_recommendations_router, prefix="/api", tags=["District Recommendations"])
app.include_router(rice_details_route, prefix="/rice-details", tags=["rice Details"])
app.include_router(rice_varieties_router, prefix="/api", tags=["rice-varieties"])
app.include_router(weed_router, prefix="/weed", tags=["Weed Detection"])