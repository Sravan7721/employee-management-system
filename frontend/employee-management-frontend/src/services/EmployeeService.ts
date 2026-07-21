import api from "../api/axios";
import type { Employee } from "../types/employee";
import type { Dashboard } from "../types/dashboard";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
}

export interface EmployeePage {
    content: Employee[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
}

class EmployeeService {

    // =====================================
    // Dashboard
    // =====================================

    getDashboard() {

        return api.get<ApiResponse<Dashboard>>(
            "/dashboard"
        );

    }

    // =====================================
    // Pagination
    // =====================================

    getEmployees(
        page: number,
        size: number,
        sortBy: string,
        sortDir: string
    ) {

        return api.get<ApiResponse<EmployeePage>>(
            `/employees/page?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
        );

    }

    // =====================================
    // Get All Employees
    // =====================================

    getAllEmployees() {

        return api.get<ApiResponse<Employee[]>>(
            "/employees"
        );

    }

    // =====================================
    // Search By Name
    // =====================================

    searchEmployee(name: string) {

        return api.get<ApiResponse<Employee[]>>(
            `/employees/search?name=${encodeURIComponent(name)}`
        );

    }

    // =====================================
    // Search By Department
    // =====================================

    searchDepartment(department: string) {

        return api.get<ApiResponse<Employee[]>>(
            `/employees/search/department?department=${encodeURIComponent(department)}`
        );

    }

    // =====================================
    // Get Employee By ID
    // =====================================

    getEmployeeById(id: number) {

        return api.get<ApiResponse<Employee>>(
            `/employees/${id}`
        );

    }

    // =====================================
    // Add Employee
    // =====================================

    addEmployee(employee: Employee) {

        return api.post<ApiResponse<Employee>>(
            "/employees",
            employee
        );

    }

    // =====================================
    // Add Employee With Photo
    // =====================================

    addEmployeeWithPhoto(formData: FormData) {

        return api.post<ApiResponse<Employee>>(
            "/employees/with-photo",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

    }

    // =====================================
    // Update Employee
    // =====================================

    updateEmployee(
        id: number,
        employee: Employee
    ) {

        return api.put<ApiResponse<Employee>>(
            `/employees/${id}`,
            employee
        );

    }

    // =====================================
    // Update Employee With Photo
    // =====================================

    updateEmployeeWithPhoto(
        id: number,
        formData: FormData
    ) {

        return api.put<ApiResponse<Employee>>(
            `/employees/with-photo/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

    }

    // =====================================
    // Delete Employee
    // =====================================

    deleteEmployee(id: number) {

        return api.delete<ApiResponse<string>>(
            `/employees/${id}`
        );

    }

    // =====================================
    // Export Employees To Excel
    // =====================================

    exportToExcel(employees: Employee[]) {

        const data = employees.map((employee) => ({

            ID: employee.id,

            Name: employee.name,

            Email: employee.email,

            Department: employee.department,

            Salary: employee.salary,

        }));

        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Employees"
        );

        const excelBuffer = XLSX.write(
            workbook,
            {
                bookType: "xlsx",
                type: "array",
            }
        );

        const file = new Blob(
            [excelBuffer],
            {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }
        );

        saveAs(
            file,
            "employees.xlsx"
        );

    }

    // =====================================
    // Export Employees To PDF
    // =====================================

    exportToPDF(employees: Employee[]) {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("EMPLOYEE MANAGEMENT SYSTEM", 14, 20);

        doc.setFontSize(12);
        doc.text("Employee Report", 14, 30);

        doc.setFontSize(10);

        doc.text(
            `Generated On : ${new Date().toLocaleString()}`,
            14,
            38
        );

        autoTable(doc, {

            startY: 45,

            head: [[
                "ID",
                "Name",
                "Email",
                "Department",
                "Salary"
            ]],

            body: employees.map(employee => [

                employee.id,

                employee.name,

                employee.email,

                employee.department,

                `₹${employee.salary.toLocaleString("en-IN")}`

            ]),

            styles: {

                halign: "center",

                fontSize: 10,

            },

            headStyles: {

                fillColor: [25, 118, 210]

            }

        });

        const finalY =
            (doc as any).lastAutoTable.finalY + 10;

        doc.text(
            `Total Employees : ${employees.length}`,
            14,
            finalY
        );

        doc.save("employees.pdf");

    }

}

export default new EmployeeService();