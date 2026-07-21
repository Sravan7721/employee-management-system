import { useNavigate } from "react-router-dom";
import type { Employee } from "../types/employee";
import AuthService from "../services/AuthService";

interface Props {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void;
}

const EmployeeTable = ({
    employees,
    onEdit,
    onDelete,
}: Props) => {

    const navigate = useNavigate();

    const isAdmin = AuthService.isAdmin();

    return (

        <div className="table-responsive">

            <table className="table table-hover table-bordered align-middle">

                <thead className="table-primary">

                    <tr>

                        <th
                            className="text-center"
                            style={{ width: "80px" }}
                        >
                            ID
                        </th>

                        <th
                            className="text-center"
                            style={{ width: "120px" }}
                        >
                            Photo
                        </th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Department</th>

                        <th
                            className="text-end"
                            style={{ width: "150px" }}
                        >
                            Salary
                        </th>

                        <th
                            className="text-center"
                            style={{
                                width: isAdmin ? "260px" : "120px",
                            }}
                        >
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        employees.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan={7}
                                        className="text-center py-4"
                                    >
                                        No Employees Found
                                    </td>

                                </tr>

                            )

                            :

                            employees.map((employee) => (

                                <tr key={employee.id}>

                                    <td className="text-center">

                                        {employee.id}

                                    </td>

                                    <td className="text-center">

                                        {

                                            employee.photoUrl ?

                                                (

                                                    <img
                                                        src={employee.photoUrl}
                                                        alt={employee.name}
                                                        width={70}
                                                        height={70}
                                                        style={{
                                                            objectFit: "cover",
                                                            borderRadius: "50%",
                                                            border: "2px solid #0d6efd",
                                                        }}
                                                    />

                                                )

                                                :

                                                (

                                                    <img
                                                        src="https://ui-avatars.com/api/?name=Employee"
                                                        alt="No Photo"
                                                        width={70}
                                                        height={70}
                                                        style={{
                                                            borderRadius: "50%",
                                                        }}
                                                    />

                                                )

                                        }

                                    </td>

                                    <td>{employee.name}</td>

                                    <td>{employee.email}</td>

                                    <td>{employee.department}</td>

                                    <td className="text-end">

                                        {

                                            new Intl.NumberFormat(
                                                "en-IN",
                                                {
                                                    style: "currency",
                                                    currency: "INR",
                                                    maximumFractionDigits: 0,
                                                }
                                            ).format(employee.salary)

                                        }

                                    </td>

                                    <td className="text-center">

                                        <button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() =>
                                                navigate(
                                                    `/employees/${employee.id}`
                                                )
                                            }
                                        >
                                            View
                                        </button>

                                        {

                                            isAdmin &&

                                            <>

                                                <button
                                                    className="btn btn-primary btn-sm me-2"
                                                    onClick={() =>
                                                        onEdit(employee)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        onDelete(employee.id!)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </>

                                        }

                                    </td>

                                </tr>

                            ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default EmployeeTable;