import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {

    const navigate = useNavigate();

    const { theme, toggleTheme } = useTheme();

    const username = localStorage.getItem("username");

    const role = localStorage.getItem("role");

    const handleLogout = () => {

        AuthService.logout();

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">

            <div className="container-fluid">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    Employee Management
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/"
                            >
                                Dashboard
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/employees"
                            >
                                Employees
                            </Link>

                        </li>

                    </ul>

                    <div className="d-flex align-items-center gap-3">

                        <button
                            className="btn btn-outline-light"
                            onClick={toggleTheme}
                        >

                            {

                                theme === "light"

                                    ? "🌙 Dark"

                                    : "☀️ Light"

                            }

                        </button>

                        <div className="text-white text-end">

                            <div>

                                <strong>

                                    {username || "User"}

                                </strong>

                            </div>

                            <small>

                                {role || "USER"}

                            </small>

                        </div>

                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >

                            Logout

                        </button>

                    </div>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;