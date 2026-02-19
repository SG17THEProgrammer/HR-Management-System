from fastapi import APIRouter, HTTPException, Query
from db import db
from schemas.attendance import AttendanceCreate
from bson import ObjectId
from datetime import datetime,date
from typing import Optional, List

# print("Attendance routes loaded")

router = APIRouter()

@router.post("/mark")
async def mark_attendance(data: AttendanceCreate):
    # print(data)
    employee = await db.employees.find_one({"_id": ObjectId(data.employeeId)})
    # print(employee)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    existing = await db.attendances.find_one({
        "employeeId": data.employeeId,
        "date": data.date.isoformat()
    })

    if existing:
        raise HTTPException(status_code=400, detail="Attendance already marked")

    await db.attendances.insert_one({
        "employeeId": data.employeeId,
        "date": data.date.isoformat(),
        "status": data.status,
        "createdAt": datetime.utcnow()
    })

    return {"detail": "Attendance marked"}

@router.get("/filter")
async def filter_attendance(
    employeeId: Optional[str] = None,
    date: Optional[date] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
):
    print("Received:", employeeId, date, start_date, end_date)
    query = {}

    if employeeId:
        query["employeeId"] = employeeId

    if date:
        query["date"] = str(date)

    if start_date and end_date:
        query["date"] = {
            "$gte": str(start_date),
            "$lte": str(end_date)
        }
    

    records = []
    cursor = db.attendances.find(query)

    async for document in cursor:
        document["_id"] = str(document["_id"])
        records.append(document)

    return {"records": records, "detail": "Attendance records filtered successfully"}


@router.get("/{employee_id}")
async def get_attendance(employee_id: str, date: str = Query(None)):

    filter_query = {"employeeId": employee_id}

    if date:
        filter_query["date"] = date

    records = []
    async for record in db.attendances.find(filter_query):
        record["_id"] = str(record["_id"])
        records.append(record)

    return records

