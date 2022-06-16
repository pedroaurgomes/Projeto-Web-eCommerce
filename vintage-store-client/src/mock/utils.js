import products from "./products";
import users from "./registered_users";

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// This function is only necessary in the development stage and simulates
// the delay of a potetial `fetch` call. Code that uses this function is
// obligated to use promises, this making it compatible with the code that
// will be written in the future to interact with the server.
export async function fetchDelay() {
    await delay(500);
}

export async function fetchProducts() {
    await fetchDelay();
    return products;
}

export async function fetchProduct(id) {
    await fetchDelay();
    return products[id];
}

export async function login({ email, password }) {
    await fetchDelay();
    const idx = users.findIndex(u => u.email == email);
    if (idx < 0) return { ok: false, error: "user not found" };
    if (users[idx].password !== password) return { ok: false, error: "wrong password" };
    return { ok: true, user: users[idx] };
}