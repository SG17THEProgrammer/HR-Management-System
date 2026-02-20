from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Literal

class AttendanceCreate(BaseModel):
    employeeId: str = Field(...)
    date: date
    status: Literal["present", "absent"]
    createdAt: datetime = Field(default_factory=datetime.utcnow) 
    