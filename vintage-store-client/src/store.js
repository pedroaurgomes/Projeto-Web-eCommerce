import { createStore } from "vuex";

import { Role, userTypeToRole } from "@/roles";
import * as mock from "@/mock";

const store = createStore({
  state: () => ({
    // TODO: Store some of this data on the server
    user: {
      name: null,
      id: null,
      email: null,
      phone: null,
      address: null,
      city: null,
      extra: null,
      password: null,
      type: null,
    },
    userRole: Role.Newcomer,

    cachedProducts: [],

    // Products added to the cart. Each element contains the id,
    // the quantity and color of the product.
    cartItems: [],
    navigationError: null,
  }),
  getters: {
    userRole: state => state.userRole,
    user: state => state.user,
    products: state => state.cachedProducts,
    // This getter uses the product id to find the product.
    // If the product is not in cache, null is returned instead.
    product: state => id => state.cachedProducts.find(p => p.id === id) || null,
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
    navigationError(state, errorMsg) {
      state.navigationError = errorMsg;
    },
    clearNavigationError(state) {
      state.navigationError = null;
    },
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
    clearCart(state) {
      state.cartItems = [];
    },
    tryLoadCartFromLocalStorage(state) {
      const cart = localStorage.getItem("cart");
      if (!cart) return;
      state.cartItems = JSON.parse(cart);
    },
    tryLoadCurrentUserFromLocalStorage(state) {
      let currentUser = localStorage.getItem("currentUser");
      if (!currentUser) return;
      currentUser = JSON.parse(currentUser);
      state.userRole = userTypeToRole(currentUser.type);
      state.user = currentUser;
    },
    registerUser(state, user) {
      state.userRole = userTypeToRole(user.type);
      state.user = user;
    },
    addProductToCache(state, product) {
      state.cachedProducts.push(product);
    },
    resetUser(state) {
      state.user.name = null;
      state.user.id = null;
      state.user.email = null;
      state.user.phone = null;
      state.user.address = null;
      state.user.city = null;
      state.user.extra = null;
      state.user.password = null;
      state.user.type = null;
      state.userRole = Role.Newcomer;
    }
  },
  actions: {
    async fetchProduct({ commit }, productId) {
      // TODO: Replace by actual fetch to server.
      const product = await mock.fetchProduct(productId);
      commit("addProductToCache", product);
      return product;
    },
    async fetchProducts({ commit }) {
      // TODO: Replace by actual fetch to server.
      const products = await mock.fetchProducts();
      for (const p of products) {
          commit("addProductToCache", p);
      }
      return products;
    },
    async fetchOrGetProduct({ dispatch, getters }, productId) {
      const p = getters.product(productId);
      if (p) return p;
      return await dispatch("fetchProduct", productId);
    },
    async login({ commit }, { email, password }) {
      const res = await mock.login({ email, password });
      if (!res.ok) return new Error(res.error);
      commit("registerUser", res.user);
      return res.user;
    },
    async registerUser({ commit }, user) {
      const res = await mock.registerUser(user);
      if (!res.ok) return new Error(res.error);
      commit("registerUser", user);
      return res.user;
    },
    async updateUser({ commit }, user) {
      const res = await mock.updateUser(user);
      if (!res.ok) return new Error(res.error);
      commit("registerUser", res.user);
      return res.user;
    },
    async logout({ commit }) {
      localStorage.removeItem("currentUser");
      commit("resetUser");
    }
  }
});

export default store;