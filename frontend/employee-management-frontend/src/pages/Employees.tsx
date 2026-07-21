import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeService from "../services/EmployeeService";
import AuthService from "../services/AuthService";
import type { Employee } from "../types/employee";

const Employees = () => {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [selectedEmployee, setSelectedEmployee] =
        useState<Employee | null>(null);

    // ==========================
    // User Role
    // ==========================

    const isAdmin = AuthService.isAdmin();

    // ==========================
    // Search & Filter
    // ==========================

    const [searchText, setSearchText] = useState("");

    const [department, setDepartment] =
        useState("All");

    // ==========================
    // Pagination
    // ==========================

    const [page, setPage] = useState(0);

    const [size, setSize] = useState(5);

    const [totalPages, setTotalPages] = useState(0);

    const [totalElements, setTotalElements] = useState(0);

    // ==========================
    // Sorting
    // ==========================

    const [sortBy, setSortBy] = useState("id");

    const [sortDir, setSortDir] = useState("asc");

    useEffect(() => {

        loadEmployees();

    }, [page, size, sortBy, sortDir]);

    // ==========================
    // Load Employees
    // ==========================

    const loadEmployees = async () => {

        try {

            setLoading(true);

            const response =
                await EmployeeService.getEmployees(
                    page,
                    size,
                    sortBy,
                    sortDir
                );

            setEmployees(response.data.data.content);

            setTotalPages(
                response.data.data.totalPages
            );

            setTotalElements(
                response.data.data.totalElements
            );

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load employees.");

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================
    // Search
    // ==========================

    const searchEmployees = async () => {

        try {

            setLoading(true);

            // Search By Name

            if (searchText.trim() !== "") {

                const response =
                    await EmployeeService.searchEmployee(
                        searchText
                    );

                setEmployees(response.data.data);

                setTotalPages(1);

                setTotalElements(
                    response.data.data.length
                );

                return;

            }

            // Search By Department

            if (department !== "All") {

                const response =
                    await EmployeeService.searchDepartment(
                        department
                    );

                setEmployees(response.data.data);

                setTotalPages(1);

                setTotalElements(
                    response.data.data.length
                );

                return;

            }

            loadEmployees();

        }

        catch (error) {

            console.error(error);

            toast.error("Search failed.");

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================
    // Clear Search
    // ==========================

    const clearSearch = () => {

        setSearchText("");

        setDepartment("All");

        setPage(0);

        loadEmployees();

    };

    // ==========================
    // Add Employee
    // ==========================

    const openAddEmployee = () => {

        if (!isAdmin) {

            return;

        }

        setSelectedEmployee(null);

        setShowForm(true);

    };

    // ==========================
    // Edit Employee
    // ==========================

    const openEditEmployee = (
        employee: Employee
    ) => {

        if (!isAdmin) {

            return;

        }

        setSelectedEmployee(employee);

        setShowForm(true);

    };

    // ==========================
    // Save
    // ==========================    // ==========================
                                     // Save
                                     // ==========================

                                     const saveEmployee = async (
                                         employee: Employee,
                                         photo?: File
                                     ) => {

                                         if (!isAdmin) {

                                             toast.warning("Only Admin can perform this operation.");

                                             return;

                                         }

                                         try {

                                             // ==========================
                                             // Update With Photo
                                             // ==========================

                                             if (employee.id && photo) {

                                                 const formData = new FormData();

                                                 formData.append("name", employee.name);
                                                 formData.append("email", employee.email);
                                                 formData.append("department", employee.department);
                                                 formData.append("salary", employee.salary.toString());
                                                 formData.append("photo", photo);

                                                 await EmployeeService.updateEmployeeWithPhoto(
                                                     employee.id,
                                                     formData
                                                 );

                                             }

                                             // ==========================
                                             // Update
                                             // ==========================

                                             else if (employee.id) {

                                                 await EmployeeService.updateEmployee(
                                                     employee.id,
                                                     employee
                                                 );

                                             }

                                             // ==========================
                                             // Add With Photo
                                             // ==========================

                                             else if (photo) {

                                                 const formData = new FormData();

                                                 formData.append("name", employee.name);
                                                 formData.append("email", employee.email);
                                                 formData.append("department", employee.department);
                                                 formData.append("salary", employee.salary.toString());
                                                 formData.append("photo", photo);

                                                 await EmployeeService.addEmployeeWithPhoto(
                                                     formData
                                                 );

                                             }

                                             // ==========================
                                             // Add
                                             // ==========================

                                             else {

                                                 await EmployeeService.addEmployee(
                                                     employee
                                                 );

                                             }

                                             toast.success("Employee saved successfully.");

                                             setShowForm(false);

                                             setSelectedEmployee(null);

                                             loadEmployees();

                                         }

                                         catch (error) {

                                             console.error(error);

                                             toast.error("Operation failed.");

                                         }

                                     };

                                     // ==========================
                                     // Delete
                                     // ==========================

                                     const deleteEmployee = async (
                                         id: number
                                     ) => {

                                         if (!isAdmin) {

                                             toast.warning("Only Admin can delete employees.");

                                             return;

                                         }

                                         const result = await Swal.fire({

            title: "Delete Employee?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#d33",

            cancelButtonColor: "#3085d6",

            confirmButtonText: "Yes, Delete",

        });

        if (!result.isConfirmed) {

            return;

        }

                                         try {

                                             await EmployeeService.deleteEmployee(id);

                                             toast.success("Employee deleted successfully.");

                                             loadEmployees();

                                         }

                                         catch (error) {

                                             console.error(error);

                                             toast.error("Delete failed.");

                                         }

                                     };

                                     // ==========================
                                     // Sorting
                                     // ==========================

                                     const changeSorting = (
                                         field: string
                                     ) => {

                                         if (sortBy === field) {

                                             setSortDir(
                                                 sortDir === "asc"
                                                     ? "desc"
                                                     : "asc"
                                             );

                                         }

                                         else {

                                             setSortBy(field);

                                             setSortDir("asc");

                                         }

                                     };

                                     return (

                                         <>

                                             <Navbar />

                                             <div className="container mt-4">

                                                 <div className="card shadow">

                                                     <div className="card-body">

                                                         <div className="d-flex justify-content-between align-items-center mb-4">

                                                             <h2>
                                                                 Employee Management
                                                             </h2>

                                                             <div className="d-flex gap-2">

                                                                 <button
                                                                     className="btn btn-success"
                                                                     onClick={() => {

                                                                         EmployeeService.exportToExcel(employees);

                                                                         toast.success("Excel exported successfully.");

                                                                     }}
                                                                 >
                                                                     📊 Export Excel
                                                                 </button>

                                                                 <button
                                                                     className="btn btn-danger"
                                                                     onClick={() => {

                                                                         EmployeeService.exportToPDF(employees);

                                                                         toast.success("PDF exported successfully.");

                                                                     }}
                                                                 >
                                                                     📄 Export PDF
                                                                 </button>

                                                                 {
                                                                     isAdmin && (

                                                                         <button
                                                                             className="btn btn-primary"
                                                                             onClick={() => setShowModal(true)}
                                                                         >
                                                                             Add Employee
                                                                         </button>

                                                                     )
                                                                 }

                                                             </div>

                                                         </div>

                                                         {/* Search & Filter */}

                                                         <div className="row mb-4">

                                                             <div className="col-md-4">

                                                                 <input
                                                                     className="form-control"
                                                                     placeholder="Search by Name"
                                                                     value={searchText}
                                                                     onChange={(e) =>
                                                                         setSearchText(e.target.value)
                                                                     }
                                                                 />

                                                             </div>

                                                             <div className="col-md-3">

                                                                 <select
                                                                     className="form-select"
                                                                     value={department}
                                                                     onChange={(e) =>
                                                                         setDepartment(
                                                                             e.target.value
                                                                         )
                                                                     }
                                                                 >

                                                                     <option>
                                                                         All
                                                                     </option>                                    <option>
                                                                                                                      IT
                                                                                                                  </option>

                                                                                                                  <option>
                                                                                                                      HR
                                                                                                                  </option>

                                                                                                                  <option>
                                                                                                                      Finance
                                                                                                                  </option>

                                                                                                                  <option>
                                                                                                                      Sales
                                                                                                                  </option>

                                                                                                                  <option>
                                                                                                                      Marketing
                                                                                                                  </option>

                                                                                                              </select>

                                                                                                          </div>

                                                                                                          <div className="col-md-5">

                                                                                                              <button
                                                                                                                  className="btn btn-success me-2"
                                                                                                                  onClick={searchEmployees}
                                                                                                              >
                                                                                                                  Search
                                                                                                              </button>

                                                                                                              <button
                                                                                                                  className="btn btn-secondary"
                                                                                                                  onClick={clearSearch}
                                                                                                              >
                                                                                                                  Reset
                                                                                                              </button>

                                                                                                          </div>

                                                                                                      </div>

                                                                                                      {

                                                                                                          loading ?

                                                                                                              <div className="text-center">

                                                                                                                  <div className="spinner-border text-primary"></div>

                                                                                                              </div>

                                                                                                              :

                                                                                                              <EmployeeTable

                                                                                                                  employees={employees}

                                                                                                                  onEdit={openEditEmployee}

                                                                                                                  onDelete={deleteEmployee}

                                                                                                                  onSort={changeSorting}

                                                                                                                  sortBy={sortBy}

                                                                                                                  sortDir={sortDir}

                                                                                                              />

                                                                                                      }

                                                                                                      <div className="d-flex justify-content-between align-items-center mt-4">

                                                                                                          <div>

                                                                                                              <strong>

                                                                                                                  Total Employees : {totalElements}

                                                                                                              </strong>

                                                                                                          </div>

                                                                                                          <div>

                                                                                                              <button
                                                                                                                  className="btn btn-outline-primary me-2"
                                                                                                                  disabled={page === 0}
                                                                                                                  onClick={() =>
                                                                                                                      setPage(page - 1)
                                                                                                                  }
                                                                                                              >
                                                                                                                  Previous
                                                                                                              </button>

                                                                                                              <span>

                                                                                                                  Page {page + 1} of {totalPages}

                                                                                                              </span>

                                                                                                              <button
                                                                                                                  className="btn btn-outline-primary ms-2"
                                                                                                                  disabled={page + 1 >= totalPages}
                                                                                                                  onClick={() =>
                                                                                                                      setPage(page + 1)
                                                                                                                  }
                                                                                                              >
                                                                                                                  Next
                                                                                                              </button>

                                                                                                          </div>

                                                                                                          <div>

                                                                                                              <select
                                                                                                                  className="form-select"
                                                                                                                  value={size}
                                                                                                                  onChange={(e) => {

                                                                                                                      setSize(
                                                                                                                          Number(e.target.value)
                                                                                                                      );

                                                                                                                      setPage(0);

                                                                                                                  }}
                                                                                                              >

                                                                                                                  <option value={5}>5</option>

                                                                                                                  <option value={10}>10</option>

                                                                                                                  <option value={20}>20</option>

                                                                                                              </select>

                                                                                                          </div>

                                                                                                      </div>

                                                                                                  </div>

                                                                                              </div>

                                                                                          </div>

                                                                                          {

                                                                                              showForm &&

                                                                                              <EmployeeForm

                                                                                                  employee={selectedEmployee}

                                                                                                  onSave={saveEmployee}

                                                                                                  onCancel={() => {

                                                                                                      setShowForm(false);

                                                                                                      setSelectedEmployee(null);

                                                                                                  }}

                                                                                              />

                                                                                          }

                                                                                      </>

                                                                                  );

                                                                              };

                                                                              export default Employees;