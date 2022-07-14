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