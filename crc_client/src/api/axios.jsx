import axios from "axios";

export const instance = axios.create({
    baseURL: "http://84.46.239.60/api",
    withCredentials: true,
});
