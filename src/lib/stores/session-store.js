import {persistentStore} from "$lib/stores/persistent-store.js";

export const session = persistentStore("session", {
    token: "",
    expired_at: "",
});

export function setSession(data) {
    session.set(data);
}
export function clearSession() {
    session.set({
        token: "",
        expired_at: "",
    });
}