import axios from "axios";
import config from "../config/backend.json";

const Api = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: config.timeout,
    headers: {
        "Content-Type": "application/json"
    },
    validateStatus: function () {
        return true;
    }
});

Api.interceptors.response.use(
    response => {
        console.log(response.headers);
        const token = response.headers["x-auth-token"];
        console.log("response", token);
        if (token) {
            localStorage.setItem("jwtToken", token);
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

Api.interceptors.request.use(
    config => {
        console.log("request");
        const token = localStorage.getItem("jwtToken");
        if (token) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers["x-auth-token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default Api;