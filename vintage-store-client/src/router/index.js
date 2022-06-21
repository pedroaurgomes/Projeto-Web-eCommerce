import { createRouter, createWebHistory } from "vue-router";

import { Error } from "./errors";
import { Role } from "@/roles";
import store from "@/store";

import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // always scroll to top
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { authorize: Role.Any }
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: { authorize: Role.Any }
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
      meta: { authorize: Role.Newcomer | Role.Customer }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { authorize: Role.Newcomer }
    },
    {
      path: "/product/:id",
      name: "product",
      component: () => import("../views/SingleProductView.vue"),
      meta: { authorize: Role.Any }
    },
    {
      path: "/account",
      name: "account",
      component: () => import("../views/AccountView.vue"),
      meta: { authorize: Role.Customer | Role.Admin }
    },
    {
      path: "/admin/users",
      name: "users",
      component: () => import("../views/UsersAdminView.vue"),
      meta: { authorize: Role.Admin }
    },
    {
      path: "/admin/products",
      name: "products",
      component: () => import("../views/ProductListAdminView.vue"),
      meta: { authorize: Role.Admin }
    },
    {
      path: "/admin/editProduct/:id",
      name: "editProduct",
      component: () => import("../views/ProductFormAdminView.vue"),
      meta: { authorize: Role.Admin }
    },
    {
      path: "/admin/addProduct",
      name: "addProduct",
      component: () => import("../views/ProductFormAdminView.vue"),
      meta: { authorize: Role.Admin }
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("../views/Error404View.vue"),
      meta: { authorize: Role.Any }
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (!(to.meta.authorize & store.getters.userRole)) {
    // If it is a newcomer (user is not logged in), redirect to the login page.
    if (store.getters.userRole === Role.Newcomer) {
      store.commit("navigationError", Error.NotLoggedIn);
      return {
        name: "login",
        query: { from: from.name }
      };
    }

    // Unauthorized, redirect the user back to the `from` page.
    store.commit("navigationError", Error.Unauthorized);
    return from;
  }
  store.commit("navigationError", Error.None);
  return true;
})

export default router;
