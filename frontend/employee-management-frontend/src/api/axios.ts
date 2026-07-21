import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(

    (config) => {

        // Do NOT send token while logging in or registering
        if (
            config.url === "/auth/login" ||
            config.url === "/auth/register"
        ) {
            return config;
        }

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }

);

export default api;