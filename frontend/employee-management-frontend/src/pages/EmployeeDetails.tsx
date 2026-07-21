import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmployeeService from "../services/EmployeeService";
import type { Employee } from "../types/employee";

const EmployeeDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [employee, setEmployee] =
        useState<Employee | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadEmployee();

    }, []);

    const loadEmployee = async () => {

        try {

            setLoading(true);

            const response =
                await EmployeeService.getEmployeeById(
                    Number(id)
                );

            setEmployee(response.data.data);

        }

        catch (error) {

            console.error(error);

            alert("Failed to load employee.");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <>

                <Navbar />

                <div className="container mt-5 text-center">

                    <div className="spinner-border text-primary"></div>

                    <h4 className="mt-3">

                        Loading Employee...

                    </h4>

                </div>

            </>

        );

    }

    if (!employee) {

        return (

            <>

                <Navbar />

                <div className="container mt-5">

                    <div className="alert alert-danger">

                        Employee not found.

                    </div>

                </div>

            </>

        );

    }

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-body">

                        <h2 className="mb-4">

                            Employee Details

                        </h2>

                        <div className="row">

                            <div className="col-md-4 text-center">

                                <img
                                    src={
                                        employee.photoUrl
                                            ? employee.photoUrl
                                            : "https://ui-avatars.com/api/?name=Employee"
                                    }
                                    alt={employee.name}
                                    width={180}
                                    height={180}
                                    style={{
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "3px solid #0d6efd",
                                    }}
                                />

                            </div>

                            <div className="col-md-8">

                                <table className="table">

                                    <tbody>

                                        <tr>

                                            <th>ID</th>

                                            <td>{employee.id}</td>

                                        </tr>

                                        <tr>

                                            <th>Name</th>

                                            <td>{employee.name}</td>

                                        </tr>

                                        <tr>

                                            <th>Email</th>

                                            <td>{employee.email}</td>

                                        </tr>

                                        <tr>

                                            <th>Department</th>

                                            <td>{employee.department}</td>

                                        </tr>

                                        <tr>

                                            <th>Salary</th>

                                            <td>

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

                                        </tr>

                                    </tbody>

                                </table>

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        navigate("/employees")
                                    }
                                >

                                    Back

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

};

export default EmployeeDetails;