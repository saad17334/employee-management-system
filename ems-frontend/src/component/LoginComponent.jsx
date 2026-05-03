import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout.jsx";

function LoginComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        axios.post("http://localhost:8080/auth/login", {
            username,
            password
        })
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                navigate("/emplist");
            })
            .catch(() => {
                setError("Invalid username or password");
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
                    Welcome Back
                </h3>

                {/* ERROR */}
                {error && (
                    <div className="alert alert-danger py-2 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>

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

                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* LOGIN BUTTON */}
                    <button className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Please wait..." : "Login"}
                    </button>

                </form>

                {/* SIGNUP LINK */}
                <p className="text-center mt-3 mb-0 small">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-decoration-none">
                        Signup
                    </Link>
                </p>

            </div>
        </div>
            </AuthLayout>
    );
}

export default LoginComponent;