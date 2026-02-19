
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import MarkAttendance from "./pages/MarkAttendance";
import ViewAttendance from "./pages/ViewAttendance";
import FilterAttendance from "./pages/FilterAttendance";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mark/:employeeId" element={<MarkAttendance />} />
        <Route path="/view/:employeeId" element={<ViewAttendance />} />
        <Route path="/filter" element={<FilterAttendance />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/add" element={<AddEmployee />} />
      </Routes>
    </Layout>
  )
}

export default App