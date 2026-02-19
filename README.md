# HR Management System

A Human Resource Management System (HRMS) built using **React, MongoDB** with **FastAPI as backend**, allowing an admin to manage employees and track attendance. The application focuses on essential HR operations with a clean, professional UI.

---

## 🔹 Features

### Employee Management
- Add new employees
- Delete employees
- View all employees in a table using filter
- Total present days per employee
- Mark attendance for an employee with **Present / Absent** status

### Attendance Management
- Filter attendance by:
  - Employee ID 
  - Specific date
  - Date range (start and end dates)
- Display attendance records in a table with color-coded status:
  - Present → Green
  - Absent → Red
- Loading spinners & toast notifications for actions

### Dashboard Summary
- Shows total present days per employee
- Employee attendance records viewable on row click (Note: On clicking the row user will get the count of absent and present at the bottom of the page)

---

## 🔹 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Material UI, React Router, Axios, react-hot-toast |
| Backend | FastAPI, Python 3.11, Pydantic, Motor (async MongoDB client) |
| Database | MongoDB (NoSQL) |
| Deployment | Vercel (Frontend), Railway / Render (Backend) |

---

## 🔹 Folder Structure
frontend/
│
├── src/
│ ├── api.js # Axios instance for API calls
│ ├── attendanceApi.js
│ ├── employeeApi.js
│ ├── components/
│ │ ├── EmployeeTable.jsx
│ │ └── AttendanceTable.jsx
│ │ └── EmployeePresentSummary.jsx 
│ │ └── Layout.jsx
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── AddEmployee.jsx
│ │ ├── MarkAttendance.jsx
│ │ └── FilterAttendance.jsx
│ │ └── Employees.jsx
│ │ └── ViewAttendance.jsx
│ └── App.jsx
│ └── main.jsx
│
backend/
│
├── main.py # FastAPI entrypoint
├── db.py # MongoDB connection
├── models/
│ ├── employee.py
│ └── attendance.py
├── schemas/
│ ├── employee.py
│ └── attendance.py
├── routes/
│ ├── employee_routes.py
│ ├── attendance_routes.py
│ └── dashboard_routes.py
├── requirements.txt
└── .env

---

## 🔹 Backend APIs

### Employee
- `GET /api/employees` → List all employees
- `POST /api/employees` → Add new employee
- `DELETE /api/employees/{id}` → Delete employee
- `GET /api/employees/summary/{employeeId}` → Get total present days
- `GET /api/employees/getEmpIdHex/{empCode}` → Convert `EMP001` to MongoDB `_id`

### Attendance
- `POST /api/attendance/mark` → Mark attendance
- `GET /api/attendance/{employee_id}` → Get all attendance for employee
- `GET /api/attendance/filter` → Filter attendance by:
  - `employeeId` (hex or simple employee Id)
  - `date` (YYYY-MM-DD)
  - `start_date` and `end_date` (YYYY-MM-DD)


All api's documentation will be seen here ⬇️
```http://127.0.0.1:8000/docs```

---

## 🔹 Workflow

1. Admin adds employees via **Add Employee** page.
2. Admin can view all employees in the table:
   - Click a row → scrolls to bottom
   - “Mark Attendance” button → navigates to `/mark/:employeeId` with ID pre-filled
3. Attendance can be marked as **Present / Absent** using toggle buttons.
4. Attendance can be filtered by:
   - Employee ID 
   - Specific date
   - Date range
5. Total present days displayed per employee.
6. Table shows colored chips for attendance status (green/red).

---

## 🔹 Installation & Running Locally

### Backend

1. **Clone the repo** and navigate to backend:

```bash
cd backend
Create virtual environment & activate:

python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate


Install dependencies:

pip install -r requirements.txt


Create .env file:

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hrms_lite?retryWrites=true&w=majority


Run FastAPI server:

uvicorn main:app --reload


Backend will run at http://127.0.0.1:8000

API docs available at http://127.0.0.1:8000/docs

Frontend

Navigate to frontend:

cd frontend


Install dependencies:

npm install


Create .env:

REACT_APP_API_URL=http://127.0.0.1:8000/api


Run React app:

npm start


