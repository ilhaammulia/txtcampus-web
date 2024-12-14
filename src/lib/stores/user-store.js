import {persistentStore} from "$lib/stores/persistent-store.js";

export const user = persistentStore("user", {
    username: "",
    name: "",
    bio: "",
    profile_photo: "",
});
export function setUser(data) {
    user.set(data);
}
export function clearUser() {
    user.set({
        username: "",
        name: "",
        bio: "",
        profile_photo: "",
    });
}