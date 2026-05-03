import React, { useState, useEffect } from 'react'
import { savedEmployee, updateDataEmployee, editEmployee } from '../service/EmployeeService'
import '../style/employeeform.css'
import { useNavigate, useParams } from 'react-router-dom'
import toast from "react-hot-toast";

function EmployeeComponent() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            editEmployee(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                })
                .catch(() => {
                    toast.error("Failed to load employee data");
                })
        }
    }, [id])

    function saveEmployee(e) {
        e.preventDefault()

        if (!firstName || !lastName || !email) {
            toast.error("All fields are required");
            return;
        }

        const employee = { firstName, lastName, email }

        setLoading(true)

        const request = id
            ? updateDataEmployee(id, employee)
            : savedEmployee(employee);

        request
            .then(() => {
                toast.success(id ? "Employee updated" : "Employee created");

                setTimeout(() => navigate('/'), 800);
            })
            .catch(() => {
                toast.error("Something went wrong");
            })
            .finally(() => setLoading(false))
    }

    return (
        <div className="container py-4">

            {/* CENTER WRAPPER */}
            <div className="row justify-content-center">

                <div className="col-12 col-sm-10 col-md-8 col-lg-5">

                    <div className="card shadow-lg border-0">

                        {/* HEADER */}
                        <div className="card-header bg-primary text-white text-center">
                            <h5 className="mb-0">
                                {id ? "Update Employee" : "Add Employee"}
                            </h5>
                        </div>

                        {/* BODY */}
                        <div className="card-body p-4">

                            <form onSubmit={saveEmployee}>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        value={firstName}
                                        className="form-control"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastName}
                                        className="form-control"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        className="form-control"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* BUTTON */}
                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Please wait..."
                                        : id
                                            ? "Update Employee"
                                            : "Save Employee"}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default EmployeeComponent