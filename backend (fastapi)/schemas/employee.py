from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class EmployeeCreate(BaseModel):
    employeeId: str
    fullName: str
    email: EmailStr
    department: str
    createdAt: datetime = Field(default_factory=datetime.utcnow) 
