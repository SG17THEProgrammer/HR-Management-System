
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import MarkAttendance from "./pages/MarkAttendance";
import ViewAttendance from "./pages/ViewAttendance";
import FilterAttendance from "./pages/FilterAttendance";
const App = () => {
  return (
     <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mark" element={<MarkAttendance />} />
        <Route path="/view/:employeeId" element={<ViewAttendance />} />
        <Route path="/filter" element={<FilterAttendance />} />
      </Routes>
    </Layout>
  )
}

export default App