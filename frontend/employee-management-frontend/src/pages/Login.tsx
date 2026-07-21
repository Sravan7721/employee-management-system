import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../services/AuthService";

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (username.trim() === "") {

            toast.warning("Please enter username.");

            return;

        }

        if (password.trim() === "") {

            toast.warning("Please enter password.");

            return;

        }

        try {

            setLoading(true);

            await AuthService.login({

                username,

                password,

            });

            toast.success("Login Successful");

            navigate("/");

        }

        catch (error) {

            console.error(error);

            toast.error("Invalid Username or Password");

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
                backgroundColor: "#f5f5f5",
            }}
        >

            <div
                className="card shadow p-4"
                style={{
                    width: "400px",
                }}
            >

                <h2 className="text-center mb-4">

                    Employee Management

                </h2>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label className="form-label">

                            Username

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
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
                                setPassword(e.target.value)
                            }
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {

                            loading

                                ? "Logging in..."

                                : "Login"

                        }

                    </button>

                </form>

                <div className="text-center mt-3">

                    <span>

                        Don't have an account?

                    </span>

                    <br />

                    <button
                        className="btn btn-link"
                        onClick={() => navigate("/register")}
                    >

                        Register

                    </button>

                </div>

            </div>

        </div>

    );

};

export default Login;