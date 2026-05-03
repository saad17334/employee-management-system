import React from "react";

function AuthLayout({ children }) {
    return (
        <div className="d-flex flex-column flex-md-row vh-100 overflow-hidden">

            {/* ================= DESKTOP LEFT (UNCHANGED) ================= */}
            <div
                className="d-none d-md-flex flex-column justify-content-center text-white p-5"
                style={{
                    width: "50%",
                    background: "linear-gradient(135deg, #0d6efd, #6f42c1)"
                }}
            >
                <h1 className="fw-bold">Employee Management System</h1>

                <p className="mt-3 fs-5">
                    Manage employees, roles, and access securely with JWT authentication.
                </p>

                <ul className="mt-4 list-unstyled">
                    <li className="mb-2 d-flex align-items-start">
                        <span className="me-2">✔</span>
                        <span>Secure Login & Signup (JWT Authentication)</span>
                    </li>

                    <li className="mb-2 d-flex align-items-start">
                        <span className="me-2">✔</span>
                        <span>Role-based Access (Admin / Employee)</span>
                    </li>

                    <li className="mb-2 d-flex align-items-start">
                        <span className="me-2">✔</span>
                        <span>CRUD + Pagination + Search</span>
                    </li>

                    <li className="mb-2 d-flex align-items-start">
                        <span className="me-2">✔</span>
                        <span>Spring Boot REST APIs with JPA & MySQL</span>
                    </li>

                    <li className="mb-2 d-flex align-items-start">
                        <span className="me-2">✔</span>
                        <span>Responsive React UI with Axios integration</span>
                    </li>
                </ul>
            </div>

            {/* ================= RIGHT PANEL ================= */}
            <div className="w-100 bg-light d-flex">

                {/* ================= MOBILE (NO SCROLL VERSION) ================= */}
                <div
                    className="d-md-none w-100 d-flex flex-column justify-content-center"
                    style={{
                        height: "100vh",
                        background: "linear-gradient(135deg, #0d6efd, #6f42c1)",
                        padding: "16px",
                        overflow: "hidden"
                    }}
                >
                    <div style={{ maxWidth: "420px", width: "100%", margin: "0 auto" }}>

                        {/* HEADER */}
                        <div className="text-center text-white mb-3">
                            <h2 className="fw-bold mb-1">EMS</h2>
                            <div className="small opacity-75">
                                Employee Management System
                            </div>
                        </div>

                        {/* FORM CARD (compressed to avoid scroll) */}
                        <div
                            className="card shadow-lg border-0"
                            style={{
                                padding: "16px",
                                maxHeight: "calc(100vh - 120px)",
                                overflow: "hidden",
                                borderRadius: "12px"
                            }}
                        >
                            {children}
                        </div>

                    </div>
                </div>

                {/* ================= DESKTOP RIGHT (UNCHANGED) ================= */}
                <div
                    className="d-none d-md-flex justify-content-center align-items-center bg-light w-100"
                    style={{ minHeight: "100vh", padding: "20px" }}
                >
                    <div style={{ width: "100%", maxWidth: "420px" }}>
                        {children}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default AuthLayout;