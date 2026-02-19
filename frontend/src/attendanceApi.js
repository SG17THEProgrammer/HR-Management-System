import API from "./api";

export const getSummary = () =>
  API.get("/attendance/summary");

export const getDashboardStats = () =>
  API.get("/dashboard");
