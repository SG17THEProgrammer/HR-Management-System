from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import datetime

class EmployeeCreate(BaseModel):
    employeeId: str = Field(... , max_length=10)
    fullName: str

    @field_validator("fullName")
    def validate_full_name(cls, value):
        if len(value) < 3:
            raise ValueError("Name must be at least 3 characters long")
        return value
    email: EmailStr = Field(...)
    department: str 
    @field_validator("department")
    def validate_department(cls, value):
        if len(value) < 2:
            raise ValueError("Department name must be at least 2 characters long")
        return value
    createdAt: datetime = Field(default_factory=datetime.utcnow) 
