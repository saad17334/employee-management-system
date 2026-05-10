import axios from "axios";

// 🔐 Axios instance
const API = axios.create({
    baseURL: "https://employee-management-system-ks05.onrender.com",
    headers: {
        "Content-Type": "application/json"
    }
});

// 🔥 Attach JWT token automatically
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// 🔥 Global response handler
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

/* ================= EMPLOYEE APIs ================= */

export const savedEmployee = (employee) =>
    API.post("/api/emp", employee);

export const editEmployee = (employeeId) =>
    API.get(`/api/emp/${employeeId}`);

export const updateDataEmployee = (employeeId, employee) =>
    API.put(`/api/emp/${employeeId}`, employee);

export const deleteEmployee = (employeeId) =>
    API.delete(`/api/emp/${employeeId}`);

/**
 * 🔥 FIXED: use API instead of axios
 */
export const listEmployees = (page, size, search) => {
    return API.get("/api/emp", {
        params: {
            page,
            size,
            search
        }
    });
};