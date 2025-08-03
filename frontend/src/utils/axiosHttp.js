import axios from "axios";

const axiosHttp = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL
})

axiosHttp.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosHttp.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

export default axiosHttp;