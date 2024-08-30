import axios from "axios";
import config from "../config/backend.json";

const Api = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: config.timeout,
    headers: {
        "Content-Type": "application/json"
    }
});

export default Api;