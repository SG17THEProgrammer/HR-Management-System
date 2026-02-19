from fastapi import APIRouter
from db import db

router = APIRouter()

@router.get("/")
async def get_dashboard_summary():

    total_employees = await db.employees.count_documents({})
    total_present = await db.attendances.count_documents({"status": "present"})
    total_absent = await db.attendances.count_documents({"status": "absent"})

    return {
        "totalEmployees": total_employees,
        "totalPresentRecords": total_present,
        "totalAbsentRecords": total_absent
    }
