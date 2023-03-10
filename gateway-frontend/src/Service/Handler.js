import axios from "axios";

const connector = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, PUT, OPTIONS",
    },
});

connector.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : config.headers.Authorization;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete connector.defaults.headers.common.Authorization;
        }

        const lang = localStorage.getItem("locale");
        if (lang) {
            config.headers.lang = lang;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

connector.interceptors.response.use(
    (response) => {
        return response;
    },
    (err, e) => {
        if (err.response && err.response.status == 422) {
            //Toast the error here
        }
        return Promise.reject(err);
    }
);

export default connector;