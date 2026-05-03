import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function getUser() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            username: payload.sub,
            role: payload.role || payload.roles
        };
    } catch {
        localStorage.removeItem("token");
        return null;
    }
}

function Header({ onSearch }) {

    const navigate = useNavigate();
    const user = getUser();

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    if (!user) return null;

    const role = user.role?.toString().includes("ADMIN") ? "ADMIN" : "EMPLOYEE";

    const handleSearch = (value) => {
        setSearch(value);

        setTimeout(() => {
            onSearch?.(value);
        }, 300);
    };

    return (
        <>
            {/* ================= NAVBAR ================= */}
            <nav className="navbar bg-dark shadow px-3 w-100 d-flex align-items-center">

                {/* BRAND */}
                <span
                    className="navbar-brand fw-bold text-white"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    EMS
                </span>

                {/* 🔥 DESKTOP SEARCH (NEXT TO MENU) */}
                <div className="ms-auto d-none d-md-flex align-items-center gap-2">

                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search employees..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: "220px" }}
                    />

                    {/* MENU BUTTON */}
                    <button
                        className="btn btn-outline-light btn-sm"
                        onClick={() => setOpen(!open)}
                    >
                        ☰ Menu
                    </button>

                </div>

                {/* 🔥 MOBILE MENU BUTTON ONLY */}
                <button
                    className="btn btn-outline-light btn-sm d-md-none ms-auto"
                    onClick={() => setOpen(!open)}
                >
                    ☰ Menu
                </button>

            </nav>

            {/* ================= DROPDOWN / SIDEBAR ================= */}
            {open && (
                <>
                    {/* BACKDROP */}
                    <div
                        onClick={() => setOpen(false)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.4)",
                            zIndex: 998
                        }}
                    />

                    {/* PANEL */}
                    <div
                        style={{
                            position: "absolute",
                            top: "60px",
                            right: "15px",
                            width: "260px",
                            background: "#212529",
                            color: "white",
                            borderRadius: "10px",
                            padding: "15px",
                            zIndex: 999
                        }}
                    >

                        {/* USER INFO */}
                        <div className="border-bottom pb-2 mb-3">
                            <div className="fw-bold">👤 {user.username}</div>

                            <span className={`badge mt-2 ${
                                role === "ADMIN" ? "bg-danger" : "bg-success"
                            }`}>
                                {role}
                            </span>
                        </div>

                        {/* 🔥 MOBILE SEARCH ONLY */}
                        <div className="d-md-none mb-3">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Search employees..."
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>

                        {/* ACTIONS */}
                        <div className="d-flex flex-column gap-2">

                            <button
                                className="btn btn-outline-light btn-sm text-start"
                                onClick={() => {
                                    navigate("/create-admin");
                                    setOpen(false);
                                }}
                                disabled={role !== "ADMIN"}
                            >
                                ➕ Create Admin
                            </button>

                            <button
                                className="btn btn-warning btn-sm text-start"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/login");
                                }}
                            >
                                🚪 Logout
                            </button>

                        </div>

                    </div>
                </>
            )}
        </>
    )
}

export default Header