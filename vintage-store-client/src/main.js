import { createApp } from "vue";
import App from "./App.vue";
import { Role } from "./roles";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");

// Helper for debugging
window.refreshLocalStorage = async () => {
  localStorage.clear();
  const [products, users] = await Promise.all([
    import("./mock/products"),
    import("./mock/registered_users"),
  ]);
  localStorage.setItem("products", JSON.stringify(products.default));
  localStorage.setItem("users", JSON.stringify(users.default));

  if (store.getters.userRole & (Role.Admin | Role.Customer)) {
    localStorage.setItem("currentUser", JSON.stringify(store.getters.user));
  }
}