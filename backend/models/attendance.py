from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date
from bson import ObjectId


class AttendanceModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    employeeId: str
    date: date
    status: str  # "present" or "absent"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {
            ObjectId: str
        }
