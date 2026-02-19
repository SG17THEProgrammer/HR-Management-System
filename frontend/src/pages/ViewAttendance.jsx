import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import AttendanceTable from "../components/AttendanceTable";

export default function ViewAttendance() {
  const { employeeId } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    API.get(`/attendance/${employeeId}`).then((res) => {
      setRecords(res.data);
    });
  }, [employeeId]);

  return <AttendanceTable records={records} />;
}
