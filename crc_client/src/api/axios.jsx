// Axios para gstionar request a api
import axios from "axios";

// Variables de entorno
export const VITE_API_URL = import.meta.env.VITE_API_URL;

export const instance = axios.create({
    baseURL: VITE_API_URL,
    withCredentials: true,
});
