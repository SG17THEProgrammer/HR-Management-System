from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import employee_routes, attendance_routes, dashboard_routes
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI(title="HRMS API")
FRONTEND_URL = os.getenv("FRONTEND_URL")

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["*"],
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee_routes.router, prefix="/api/employees", tags=["Employees"])
app.include_router(attendance_routes.router, prefix="/api/attendance", tags=["Attendance"])
app.include_router(dashboard_routes.router, prefix="/api/dashboard", tags=["Dashboard"])


@app.get("/")
def root():
    return {"detail": "HRMS FastAPI Running"}
