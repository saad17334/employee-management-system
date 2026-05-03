import { useState, useEffect } from 'react'
import { listEmployees, deleteEmployee } from '../service/EmployeeService.js'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

function ListEmployeeComponent({ search: externalSearch }) {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState([])
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [size] = useState(7);
    const [totalPages, setTotalPages] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // LOCAL SEARCH STATE (from navbar)
    const [search, setSearch] = useState("");

    // sync external search (from Header)
    useEffect(() => {
        setSearch(externalSearch || "");
        setPage(0);
    }, [externalSearch]);

    // AUTH
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const decoded = jwtDecode(token);
        const userRole = decoded.role || decoded.roles;

        setRole(
            userRole.toString().includes("ADMIN")
                ? "ADMIN"
                : "EMPLOYEE"
        );
    }, [])

    // FETCH (NOW INCLUDES SEARCH)
    useEffect(() => {
        getAllEmployee();
    }, [page, search])

    function getAllEmployee() {
        setLoading(true);

        listEmployees(page, size, search)
            .then((response) => {
                setEmployee(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(() => {
                toast.error("Failed to fetch employees");
            })
            .finally(() => setLoading(false));
    }

    function addNewEmployee() {
        navigate('/add-employee')
    }

    function updatehandler(id) {
        if (role !== "ADMIN") return toast.error("Only ADMIN can update");
        navigate(`/update-employee/${id}`)
    }

    function openDeleteModal(id) {
        if (role !== "ADMIN") return toast.error("Only ADMIN can delete");
        setSelectedId(id);
        setShowModal(true);
    }

    function confirmDelete() {
        deleteEmployee(selectedId)
            .then(() => {
                toast.success("Deleted successfully");
                setShowModal(false);
                setSelectedId(null);
                getAllEmployee();
            })
            .catch(() => toast.error("Delete failed"));
    }

    return (
        <div
            className="container d-flex flex-column"
            style={{ minHeight: "100vh", paddingTop: "20px" }}
        >

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Employees</h3>

                <button
                    className="btn btn-primary"
                    onClick={addNewEmployee}
                    disabled={role !== "ADMIN"}
                >
                    + Add Employee
                </button>
            </div>

            {/* CONTENT */}
            <div className="flex-grow-1">

                {/* LOADER */}
                {loading && (
                    <div className="text-center mt-5">
                        <div className="spinner-border text-primary"></div>
                        <p>Loading...</p>
                    </div>
                )}

                {/* EMPTY */}
                {!loading && employee.length === 0 && (
                    <div className="text-center mt-5">
                        <h5>No Employees Found</h5>
                    </div>
                )}

                {/* TABLE */}
                {!loading && employee.length > 0 && (
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                            <tr className="text-center">
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            </thead>

                            <tbody>
                            {employee.map(item => (
                                <tr key={item.id} className="text-center">
                                    <td>{item.id}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>

                                    <td>
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => updatehandler(item.id)}
                                            disabled={role !== "ADMIN"}
                                        >
                                            Update
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => openDeleteModal(item.id)}
                                            disabled={role !== "ADMIN"}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* PAGINATION */}
            {!loading && employee.length > 0 && (
                <div
                    className="py-3 mt-3 border-top bg-white"
                    style={{ position: "sticky", bottom: 0, zIndex: 10 }}
                >
                    <div className="d-flex justify-content-center align-items-center gap-3">

                        <button
                            className="btn btn-outline-secondary btn-sm"
                            disabled={page === 0}
                            onClick={() => setPage(page - 1)}
                        >
                            ⬅ Prev
                        </button>

                        <span className="fw-semibold">
                            Page {page + 1} of {totalPages}
                        </span>

                        <button
                            className="btn btn-outline-secondary btn-sm"
                            disabled={page === totalPages - 1}
                            onClick={() => setPage(page + 1)}
                        >
                            Next ➡
                        </button>

                    </div>
                </div>
            )}

            {/* MODAL */}
            {showModal && (
                <>
                    <div className="modal show d-block">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5>Confirm Delete</h5>
                                    <button className="btn-close" onClick={() => setShowModal(false)} />
                                </div>

                                <div className="modal-body">
                                    Are you sure you want to delete this employee?
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={confirmDelete}
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="modal-backdrop show"></div>
                </>
            )}

        </div>
    )
}

export default ListEmployeeComponent