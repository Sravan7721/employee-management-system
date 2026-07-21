import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DashboardChart from "../components/DashboardChart";
import EmployeeService from "../services/EmployeeService";
import DashboardService from "../services/DashboardService";
import type { DashboardChart as ChartData } from "../services/DashboardService";
import type { Dashboard } from "../types/dashboard";

const DashboardPage = () => {

    const [dashboard, setDashboard] =
        useState<Dashboard>({
            totalEmployees: 0,
            totalDepartments: 0,
            totalAdmins: 0,
            totalUsers: 0,
        });

    const [chartData, setChartData] =
        useState<ChartData[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadDashboard();

        loadChart();

    }, []);

    // ==========================
    // Dashboard Statistics
    // ==========================

    const loadDashboard = async () => {

        try {

            const response =
                await EmployeeService.getDashboard();

            setDashboard(
                response.data.data
            );

        }

        catch (error) {

            console.error(error);

            alert("Failed to load dashboard.");

        }

    };

    // ==========================
    // Dashboard Chart
    // ==========================

    const loadChart = async () => {

        try {

            const response =
                await DashboardService.getDepartmentChart();

            setChartData(
                response.data.data
            );

        }

        catch (error) {

            console.error(error);

            alert("Failed to load chart.");

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

                        Loading Dashboard...

                    </h4>

                </div>

            </>

        );

    }

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">

                    Dashboard

                </h2>

                <div className="row g-4">

                    <div className="col-md-3">

                        <div className="card shadow border-0 bg-primary text-white">

                            <div className="card-body text-center">

                                <h5>

                                    👥 Total Employees

                                </h5>

                                <h2 className="mt-3">

                                    {dashboard.totalEmployees}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow border-0 bg-success text-white">

                            <div className="card-body text-center">

                                <h5>

                                    🏢 Departments

                                </h5>

                                <h2 className="mt-3">

                                    {dashboard.totalDepartments}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow border-0 bg-warning text-dark">

                            <div className="card-body text-center">

                                <h5>

                                    👨‍💼 Total Admins

                                </h5>

                                <h2 className="mt-3">

                                    {dashboard.totalAdmins}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow border-0 bg-danger text-white">

                            <div className="card-body text-center">

                                <h5>

                                    👤 Total Users

                                </h5>

                                <h2 className="mt-3">

                                    {dashboard.totalUsers}

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                <DashboardChart
                    data={chartData}
                />

            </div>

        </>

    );

};

export default DashboardPage;