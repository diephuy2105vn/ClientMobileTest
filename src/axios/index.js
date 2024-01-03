import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://10.13.130.154:8080",
});

export default instance;
