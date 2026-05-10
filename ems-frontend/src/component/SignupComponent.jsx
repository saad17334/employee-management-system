import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout.jsx";

function SignupComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("EMPLOYEE");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        axios.post(
            "https://employee-management-system-ks05.onrender.com/auth/signup",
            {
                username,
                password,
                role
            }
        )
            .then((response) => {

                localStorage.setItem("token", response.data.token);

                navigate("/emplist");
            })
            .catch(() => {
                setError("Signup failed. Try a different username.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <AuthLayout>
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light px-3">

            <div
                className="card shadow-lg p-4 w-100"
                style={{
                    maxWidth: "420px",
                    borderRadius: "16px"
                }}
            >

                {/* TITLE */}
                <h3 className="text-center mb-3 fw-bold">
                    Create Account
                </h3>

                {/* ERROR */}
                {error && (
                    <div className="alert alert-danger py-2 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup}>

                    <p className="text-center text-muted small mb-3">
                        Employee Management System
                    </p>

                    {/* USERNAME */}
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* ROLE */}
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="EMPLOYEE">Employee</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>

                    {/* BUTTON */}
                    <button className="btn btn-success w-100" disabled={loading}>
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>

                </form>

                {/* LOGIN LINK */}
                <p className="text-center mt-3 mb-0 small">
                    Already have an account?{" "}
                    <Link to="/login" className="text-decoration-none">
                        Login
                    </Link>
                </p>

            </div>
        </div>
            </AuthLayout>
    );
}

export default SignupComponent;