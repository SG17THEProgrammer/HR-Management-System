import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../employeeApi";
import EmployeeTable from "../components/EmployeeTable";
import toast from "react-hot-toast";
import EmployeePresentSummary from "../components/EmployeePresentSummary";

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const fetchEmployees = async () => {
        const res = await getEmployees();
        // console.log(res);
        setEmployees(res.data.employees);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        await deleteEmployee(id);
        toast.success("Employee deleted");
        fetchEmployees();
    };

    return (
        <>
            <EmployeeTable
                employees={employees}
                onDelete={handleDelete}
                onRowClick={(id) => setSelectedEmployee(id)} />

            {selectedEmployee && (
                <EmployeePresentSummary employeeId={selectedEmployee} />
            )}
        </>
    );
}
