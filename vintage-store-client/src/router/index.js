import { createRouter, createWebHistory } from "vue-router";

import { Role } from "@/roles";
import store from "@/store";

import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      meta: { authorize: Role.Any }
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
  ],
});


router.beforeEach(async (to, from) => {
  if (!(to.meta.authorize & store.getters.userRole)) {
    // If it is a newcomer, redirect to the login page.
    if (store.getters.userRole === Role.Newcomer) return { name: "login" };
    return false;
  }
  return true;
})

export default router;
