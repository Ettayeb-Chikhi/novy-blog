import axios from 'axios';
import { isTokenExpired } from './utils';
const instance = axios.create({
    baseURL: "http://localhost:8082/api/v1",
    headers: {
        'Content-Type': 'application/json'
    }
})
instance.interceptors.request.use(
    (config) => {
        // make sure that it's on client side :)
        if (typeof window !== "undefined") {
            const authToken = localStorage.getItem('token');
            if (authToken && !isTokenExpired(authToken)) {
                config.headers['Authorization'] = `Bearer ${authToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;