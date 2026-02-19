# 🚀 HR Management System (HRMS)

A clean, modern **Human Resource Management System (HRMS)** built with:

* ⚛️ **React** (Frontend)
* ⚡ **FastAPI** (Backend)
* 🍃 **MongoDB** (Database)

This system allows an **Admin** to manage employees and track attendance efficiently with a professional UI and smooth workflow.

---

# 📌 Table of Contents

1. Project Overview
2. Features
3. Tech Stack
4. Project Structure
5. Backend APIs
6. Complete Workflow
7. Installation Guide (Step-by-Step)
8. Environment Variables
9. Deployment
10. Functional Notes

---

# 📖 1. Project Overview

The HRMS application helps administrators:

* Manage employee records
* Mark daily attendance
* Track present/absent counts
* Filter attendance by employee or date
* View summary reports

It is designed with simplicity, speed, and clarity in mind.

---

# ✨ 2. Features

## 👨‍💼 Employee Management

* Add new employees
* Delete employees
* View all employees in a searchable/filterable table
* View total present days per employee
* Navigate directly to attendance marking page
* Row click shows:

  * Total Present count
  * Total Absent count

---

## 📅 Attendance Management

* Mark attendance as:

  * ✅ Present (Green)
  * ❌ Absent (Red)
* Filter attendance by:

  * Employee ID
  * Specific Date
  * Date Range (Start Date – End Date)
* View attendance in color-coded table
* Loading spinners for smooth UX
* Toast notifications for actions

---

## 📊 Dashboard Summary

* Total present days per employee
* Click employee row → shows attendance stats at bottom
* Clean Material UI layout

---

# 🛠 3. Tech Stack

| Layer      | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Frontend   | React, Material UI, React Router, Axios, react-hot-toast |
| Backend    | FastAPI, Python 3.11, Pydantic, Motor (Async MongoDB)    |
| Database   | MongoDB                                                  |
| Deployment | Netlify (Frontend), Render (Backend)                     |

---

# 📁 4. Project Structure

```
frontend/
│
├── src/
│   ├── api.js
│   ├── attendanceApi.js
│   ├── employeeApi.js
│   ├── components/
│   │   ├── EmployeeTable.jsx
│   │   ├── AttendanceTable.jsx
│   │   ├── EmployeePresentSummary.jsx 
│   │   └── Layout.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── AddEmployee.jsx
│   │   ├── MarkAttendance.jsx
│   │   ├── FilterAttendance.jsx
│   │   ├── Employees.jsx
│   │   └── ViewAttendance.jsx
│   ├── App.jsx
│   └── main.jsx
│
backend/
│
├── main.py
├── db.py
├── models/
│   ├── employee.py
│   └── attendance.py
├── schemas/
│   ├── employee.py
│   └── attendance.py
├── routes/
│   ├── employee_routes.py
│   ├── attendance_routes.py
│   └── dashboard_routes.py
├── requirements.txt
└── .env
```

---

# 🔌 5. Backend APIs

All API documentation is available at (once you run the server):

```
http://127.0.0.1:8000/docs
```

---

## 👨‍💼 Employee APIs

GET `/api/employees`
→ List all employees

POST `/api/employees/create`
→ Add new employee

DELETE `/api/employees/delete/{id}`
→ Delete employee

GET `/api/employees/summary/{employeeId}`
→ Get total present days

GET `/api/employees/getEmpIdHex/{empCode}`
→ Convert employee Id to MongoDB _id

---

## 📅 Attendance APIs

POST `/api/attendance/mark`
→ Mark attendance

GET `/api/attendance/{employee_id}`
→ Get all attendance for employee

GET `/api/attendance/filter`
→ Filter attendance by:

* employeeId (hex or simple ID)
* date (YYYY-MM-DD)
* start_date (YYYY-MM-DD)
* end_date (YYYY-MM-DD)

---

## 📊 Dashboard API
GET `/api/dashboard`
→ Get total employees, total present counts and total absent records

---

# 🔄 6. Complete Workflow

1. Admin adds employee from **Add Employee** page.
2. Admin views employee list.
3. Click employee row:

   * Scrolls to bottom
   * Shows total Present & Absent count
4. Click "Mark Attendance":

   * Navigates to `/mark/:employeeId`
   * Employee ID auto-filled
5. Select Present or Absent.
6. Save → Toast notification appears.
7. Admin can filter attendance anytime by going to Filter Attendance Page.
8. Dashboard updates automatically.

---

# 💻 7. Installation Guide (Run Locally)

---

## 🔹 Backend Setup

### Step 1: Navigate to backend folder

```
cd backend
```

### Step 2: Create Virtual Environment

Windows:

```
python -m venv venv
venv\Scripts\activate
```

Mac/Linux:

```
python -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```
pip install -r requirements.txt
```

### Step 4: Create `.env` File

Create a `.env` file inside `backend/` and add:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<cluster_name>
FRONTEND_URL = http://localhost:3000
```

Replace:

* `<username>` with your MongoDB username
* `<password>` with your MongoDB password
* `<cluster_name>` with your MongoDB Cluster Name

---

### Step 5: Run FastAPI Server

```
uvicorn main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

Swagger Docs (API Documentation):

```
http://127.0.0.1:8000/docs
```

---

## 🔹 Frontend Setup

### Step 1: Navigate to frontend

```
cd frontend
```

### Step 2: Install Dependencies

```
npm install
```

### Step 3: Create `.env` File

Inside `frontend/`, create:

```
BACKEND_URL=http://127.0.0.1:8000/api
```

---

### Step 4: Run React App

```
npm run dev
```

Frontend will run at:

```
http://localhost:3000
```

---

# 🌍 8. Environment Variables Summary

## Backend (.env)

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<cluster_name>
FRONTEND_URL = http://localhost:3000
```

## Frontend (.env)

```
BACKEND_URL=http://127.0.0.1:8000/api
```

---

# 🚀 9. Deployment

## Frontend Deployment

* Deploy on **Netlify**
* Add environment variable (in code itself):

  * BACKEND_URL=http://127.0.0.1:8000/api

## Backend Deployment

* Deploy on **Render**
* Add environment variable:

  * MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<cluster_name>
  * FRONTEND_URL = http://localhost:3000

---

# 🎯 10. Functional Notes

* Attendance status is color-coded:

  * Present → Green chip
  * Absent → Red chip
* Employee row click:

  * Displays Present & Absent count at bottom
* Mark Attendance page:

  * Employee ID auto-filled via route param
* Filters support:

  * Single date
  * Date range
  * Employee ID
* All operations show:

  * Loading spinners
  * Toast notifications

---

# 🧠 Best Practices Implemented

* Async MongoDB with Motor
* Clean API separation (Routes / Models / Schemas)
* Modular frontend API layer
* Environment variable configuration
* RESTful endpoint structure
* Professional UI with Material UI

---

# 👨‍💻 Author

Built by Shray with ❤️ using React + FastAPI + MongoDB
