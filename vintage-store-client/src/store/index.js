import { createStore } from "vuex";

import * as mock from "@/mock";
import userAdmin from "./modules/userAdmin";
import products from "./modules/products";
import currentUser from "./modules/currentUser";

const store = createStore({
  modules: {
    userAdmin,
    currentUser,
    products, // Not namespaced
  },
  state: () => ({
    // Products added to the cart. Each element contains the id,
    // the quantity and color of the product.
    cartItems: [],
    navigationError: null,
  }),
  getters: {
    userRole: (_state, _getters, _rootState, rootGetters) => rootGetters["currentUser/role"],
    cartItems: (state, getters) => {
      return state.cartItems.map(item => ({
        product: getters.product(item.productId),
        // There will the the field `productId` which can also be obtained
        // through `product.id`. However, if the product is not present in
        // cache, it will appear as `null`. `productId` however, will always
        // be present.
        ...item,
      }));
    },
  },
  mutations: {
    navigationError: (state, errorMsg) => state.navigationError = errorMsg,
    clearNavigationError: state => state.navigationError = null,
    addToCart(state, item) {
      state.cartItems.push(item);
      // Store it in localStorage as well.
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, productId) {
      const idx = state.cartItems.findIndex(p => p.productId === productId);
      if (idx < 0) return;
      state.cartItems.splice(idx, 1);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    updateCartItem(state, update) {
      const idx = update.idx;
      delete update.idx;
      if (!state.cartItems[idx]) return;
      Object.assign(state.cartItems[idx], update);
    },
    clearCart: state => state.cartItems = [],
    tryLoadCartFromLocalStorage(state) {
      const cart = localStorage.getItem("cart");
      if (!cart) return;
      state.cartItems = JSON.parse(cart);
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const res = await mock.login({ email, password });
      if (!res.ok) return new Error(res.error);
      commit("currentUser/register", res.user);
      return res.user;
    },
    async logout({ commit }) {
      localStorage.removeItem("currentUser");
      commit("currentUser/reset");
    },
  }
});

export default store;