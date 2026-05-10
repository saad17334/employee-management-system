import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateAdminComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleCreateAdmin = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        axios.post("https://employee-management-system-ks05.onrender.com/admin/create-admin",
            { username, password },
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        )
            .then(() => {
                setMessage("✅ Admin created successfully");
                setTimeout(() => navigate("/emplist"), 1500);
            })
            .catch((error) => {
                if (error.response?.status === 409) {
                    setMessage("❌ Username already exists");
                } else if (error.response?.status === 403) {
                    setMessage("❌ Only ADMIN can create admins");
                } else {
                    setMessage("❌ Something went wrong");
                }
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">

            <div className="card p-4 shadow" style={{ width: "400px", borderRadius: "12px" }}>

                <h3 className="text-center mb-3">Create Admin</h3>

                {message && <div className="alert alert-info">{message}</div>}

                <form onSubmit={handleCreateAdmin}>

                    <input
                        className="form-control mb-2"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="btn btn-dark w-100">
                        Create Admin
                    </button>

                </form>

                <button
                    className="btn btn-link mt-2"
                    onClick={() => navigate("/emplist")}
                >
                    Back
                </button>

            </div>
        </div>
    );
}

export default CreateAdminComponent;