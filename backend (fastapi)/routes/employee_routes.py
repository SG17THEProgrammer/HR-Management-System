from fastapi import APIRouter, HTTPException
from db import db
from schemas.employee import EmployeeCreate
from bson import ObjectId

router = APIRouter()

@router.post("/create")
async def create_employee(employee: EmployeeCreate):
    existing = await db.employees.find_one({
        "$or": [
            {"employeeId": employee.employeeId},
            {"email": employee.email}
        ]
    })

    if existing:
        raise HTTPException(status_code=400, detail="Duplicate employee or email")

    result = await db.employees.insert_one(employee.dict())
    # allEmployees = await get_employees()
    return {"detail": "Employee created successfully", "id": str(result.inserted_id)}


@router.get("/")
async def get_employees():
    employees = []
    async for emp in db.employees.find():
        emp["_id"] = str(emp["_id"])
        employees.append(emp)
    return {"employees": employees, "detail": "Employees retrieved successfully"}


@router.delete("/delete/{employee_id}")
async def delete_employee(employee_id: str):
    result = await db.employees.delete_one({"_id": ObjectId(employee_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # remainingEmployees = await get_employees()

    return {"detail": "Employee deleted successfully"}

@router.get("/summary/{employee_id}")
async def total_present_days(employee_id: str):

    presentCount = await db.attendances.count_documents({
        "employeeId": employee_id,
        "status": "present"
    })

    absentCount = await db.attendances.count_documents({
        "employeeId": employee_id,
        "status": "absent"
    })

    return {
        "employeeId": employee_id,
        "totalPresentDays": presentCount , 
        "totalAbsentDays": absentCount,
        "detail": "Total present and absent days calculated successfully"
    }


@router.get("/getEmpIdHex/{empCode}")
async def get_emp_id_hex(empCode: str):
    employee = await db.employees.find_one({"employeeId": empCode})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    return {"employeeIdHex": str(employee["_id"])}