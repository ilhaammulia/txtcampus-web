import axios from 'axios';
import { goto } from "$app/navigation";
import { session, clearSession } from "$lib/stores/session-store.js";

let tokenValue = null;
session.subscribe((value) => {
    tokenValue = value?.token || null;
});

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    if (tokenValue) {
        config.headers.Authorization = tokenValue;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            clearSession();
            goto('/login').then(r => console.log);
        }
        return Promise.reject(error);
    }
);

export default api;