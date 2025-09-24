import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL
console.log(import.meta.env.VITE_API_URL)
// const isProduction = import.meta.env.MODE === "production"

const axiosInstance = axios.create({
    baseURL: "/",
    timeout: 10000,
    withCredentials: true
})

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const { status, data } = error.response

            switch (status) {
                case 400:
                    console.error("Bad Request:", data)
                    break
                case 401:
                    console.error("Unauthorized:", data)
                    break
                case 403:
                    console.error("Forbidden :", data)
                    break
                case 404:
                    console.error("Not Found:", data)
                    break
                case 500:
                    console.error("Server Eroor", data)
                    break
                default:
                    console.error(`Error (${status}):`, data)
            }
        } else if (error.request) {
            console.error("Network Error : No response recieved", error.request)
        } else {
            console.error("Error :", error.message)
        }
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)
export default axiosInstance