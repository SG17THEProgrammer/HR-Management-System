import API from "./api";

export const addEmployee = (data) =>
  API.post("/employees/create", data);

export const getEmployees = () =>
  API.get("/employees");

export const deleteEmployee = (id) =>
  API.delete(`/employees/delete/${id}`);

export const getEmployeeSummary = (employeeId) =>
  API.get(`/employees/summary/${employeeId}`);
