import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export function persistentStore(key, initialValue) {
    // Only use localStorage in the browser
    const storedValue = browser ? localStorage.getItem(key) : null;
    const store = writable(storedValue !== "undefined" ? JSON.parse(storedValue) : initialValue);

    if (browser) {
        store.subscribe((value) => {
            localStorage.setItem(key, JSON.stringify(value));
        });
    }

    return store;
}