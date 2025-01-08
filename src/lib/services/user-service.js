import {setUser} from "$lib/stores/user-store.js";
import {setSession, clearSession} from "$lib/stores/session-store.js";
import api from "$lib/api.js";

export const login = async (username, password) => {
    try {
        const response = await api.post("/api/auth/login", {
            identifier: username,
            password: password,
        });
        setUser(response.data.data.user);
        setSession({
            token: response.data.data.token,
            expired_at: response.data.data.expired_at,
        });
        return [true, null];
    } catch (err) {
        console.debug("error login", err)
        return [false, err.response.data.message];
    }
}

export const register = async (username, password, email, name) => {
    try {
        const response = await api.post("/api/auth/register", {
            username: username,
            password: password,
            email_address: email,
            name: name,
        });
        return [true, response.data];
    } catch (err) {
        console.debug("error login", err)
        return [false, err.response.data.message];
    }
}

export const logout = async () => {
    clearSession();
}

export const getUser = async (username) => {
    try {
        const response = await api.get(`/api/users/${username}`);
        if (response && response.data) {
            return response.data.data;
        }
        return null;
    } catch (err) {
        console.debug("error login", err)
        return null;
    }
}

export const updateUser = async (data) => {
    try {
        const response = await api.post(`/api/users/profile`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return [true, response.data];
    } catch (err) {
        console.debug("error login", err)
        return [false, err.response.data.message];
    }
}