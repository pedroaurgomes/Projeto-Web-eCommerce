import HARDCODED_PRODUCTS from "./products";
import HARDCODED_USERS from "./registered_users";

const USER_PROPERTIES = {
  "id": String,
  "name": String,
  "email": String,
  "phone": String,
  "address": String,
  "city": String,
  "extra": String,
  "password": String,
  "type": String,
}


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

export function init() {
  internalSetProducts(HARDCODED_PRODUCTS);
  internalSetUsers(HARDCODED_USERS);
}

// TODO: convert to the same ok, error?, products? API
export async function fetchProducts() {
  await fetchDelay();
  return internalGetProducts();
}

// TODO: convert to the same ok, error?, product? API
export async function fetchProduct(id) {
  await fetchDelay();
  return internalGetProducts()[id];
}

export async function deleteProduct(id) {
  await fetchDelay();
  const products = internalGetProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx < 0) return { ok: false, error: "product not found" };
  products.splice(idx, 1);
  internalSetProducts(products);
  return { ok: true };
}

export async function createProduct(product) {
  await fetchDelay();
  if (product.id) return { ok: false, error: "product object cannot have 'id' property on creation" };
  // TODO: verify that the object is valid
  const products = internalGetProducts();
  let candidateId = products.length;
  while (products.findIndex(p => p.id === candidateId) >= 0) candidateId++;
  product.id = candidateId;
  products.push(product);
  internalSetProducts(products);
  return { ok: true, product };
}

export async function updateProduct(product) {
  await fetchDelay();
  const products = internalGetProducts();
  const idx = products.findIndex(p => p.id === product.id);
  if (idx < 0) return { ok: false, error: "product could not be found" };
  products[idx] = product;
  internalSetProducts(products);
  return { ok: true, product };
}

export async function fetchUsers() {
  await fetchDelay();
  return { ok: true, users: internalGetUsers() };
}

export async function fetchUser(uid) {
  await fetchDelay();
  const users = internalGetUsers();
  const idx = users.findIndex(u => u.id === uid);
  if (idx < 0) return { ok: false, error: "user not found" };
  return { ok: true, user: users[idx] };
}

export async function updateUser(update) {
  await fetchDelay();
  if (!["valid", "partial"].includes(isValidUser(update)))
    return { ok: false, error: "invalid user object format" };

  const users = internalGetUsers();
  const idx = users.findIndex(u => u.id === update.id);
  if (idx < 0) return { ok: false, error: "user not found" };
  // Update only the fields that have changed, the res remain the same.
  users[idx] = { ...users[idx], ...update };
  internalSetUsers(users);
  return { ok: true, user: users[idx] };
}

export async function login({ email, password }) {
  await fetchDelay();
  const users = internalGetUsers();
  const idx = users.findIndex(u => u.email == email);
  if (idx < 0) return { ok: false, error: "user not found" };
  const user = users[idx];
  if (user.password !== password) return { ok: false, error: "wrong password" };
  localStorage.setItem("currentUser", JSON.stringify(user));
  return { ok: true, user: user };
}

export async function registerUser(user) {
  await fetchDelay();
  if (isValidUser(user) !== "valid")
    return { ok: false, error: "user object is not in the correct format" };
  const users = internalGetUsers();
  const idx = users.findIndex(u => u.email === user.email);
  if (idx != -1) return  { ok: false, error: "user already exists" };
  users.push(user)
  localStorage.setItem("currentUser", JSON.stringify(user));
  internalSetUsers(users);
  return { ok: true, user: user };
}

export async function updateCurrentUser(userUpdates) {
  await fetchDelay();
  if (!["partial", "valid"].includes(isValidUser(userUpdates)))
    return { ok: false, error: "user updates is not in the correct format" };
  let currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return { ok: false, error: "user not logged in" };
  currentUser = { ...JSON.parse(currentUser), ...userUpdates };
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  return { ok: true, user: currentUser };
}

function internalSetUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function internalSetProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

function internalGetUsers() {
  let users = localStorage.getItem("users");
  if (!users) {
    internalSetUsers(HARDCODED_USERS);
    // Make sure it is a clone so that it can be modified at will
    return JSON.parse(JSON.stringify(HARDCODED_USERS));
  }
  return JSON.parse(users);
}

function internalGetProducts() {
  let products = localStorage.getItem("products");
  if (!products) {
    internalSetProducts(HARDCODED_PRODUCTS);
    // Make sure it is a clone so that it can be modified at will
    return JSON.parse(JSON.stringify(HARDCODED_PRODUCTS));
  }
  return JSON.parse(products);
}

// Returns if an object is a valid user object
// * "invalid" - `userObj` is not a valid user object
// * "valid" - `userObj` has exactly all of the required fields of a user with the correct types.
// * "partial" - `userObj` has only some of the required fields of a user.
// * "superset" - `userObj` has all of the required fields plus some other fields.
function isValidUser(userObj) {
  if (typeof userObj !== "object") return "invalid";
  let hasMissingKey = false;
  const keys = new Set(Object.keys(userObj));
  for (const key of Object.keys(USER_PROPERTIES)) {
    if (!keys.has(key)) {
      hasMissingKey = true;
      continue;
    }
    keys.delete(key);
    if (!( (typeof userObj[key] === "string" && USER_PROPERTIES[key] === String)
        || (typeof userObj[key] === "number" && USER_PROPERTIES[key] === Number)
        ||  userObj[key] instanceof USER_PROPERTIES[key])) return "invalid";
  }
  // An object with only some of the expected keys and other unexpected keys, is not
  // valid.
  if (keys.size > 0 && hasMissingKey) return "invalid";
  // Event partial users can't be missing the "id" key.
  if (hasMissingKey && "id" in userObj) return "partial";
  if (keys.size > 0) return "superset";
  return "valid";
}