import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://192.168.1.11:8080/",
});

export default instance;