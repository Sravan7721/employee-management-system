import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../services/AuthService";

const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [role, setRole] =
        useState("USER");

    const [loading, setLoading] =
        useState(false);

    const handleRegister = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        // ==========================
        // Validation
        // ==========================

        if (username.trim() === "") {

            toast.warning("Please enter username.");

            return;

        }

        if (password.trim() === "") {

            toast.warning("Please enter password.");

            return;

        }

        if (confirmPassword.trim() === "") {

            toast.warning("Please confirm password.");

            return;

        }

        if (password !== confirmPassword) {

            toast.error("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            await AuthService.register({

                username,

                password,

                role,

            });

            toast.success(
                "Registration Successful"
            );

            setTimeout(() => {

                navigate("/login");

            }, 1200);

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Registration Failed."
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="container d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "#f5f5f5",
            }}
        >

            <div
                className="card shadow p-4"
                style={{
                    width: "430px",
                }}
            >

                <h2 className="text-center mb-2">

                    Employee Management

                </h2>

                <h4 className="text-center mb-4">

                    Register

                </h4>

                <form
                    onSubmit={handleRegister}
                >

                    <div className="mb-3">

                        <label className="form-label">

                            Username

                        </label>

                        <input
                            className="form-control"
                            value={username}
                            onChange={(e) =>
                                setUsername(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Password

                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Confirm Password

                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">

                            Role

                        </label>

                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) =>
                                setRole(
                                    e.target.value
                                )
                            }
                        >

                            <option value="USER">

                                USER

                            </option>

                            <option value="ADMIN">

                                ADMIN

                            </option>

                        </select>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-success w-100"
                        disabled={loading}
                    >

                        {

                            loading

                                ? "Registering..."

                                : "Register"

                        }

                    </button>

                </form>

                <div className="text-center mt-4">

                    Already have an account?

                    <br />

                    <Link
                        to="/login"
                    >

                        Login

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default Register;