import * as mock from "@/mock";

export default {
  namespaced: false,
  state: () => ({
    cachedProducts: {},
  }),
  getters: {
    products: state => Object.values(state.cachedProducts),
    // This getter uses the product id to find the product.
    // If the product is not in cache, null is returned instead.
    product: state => id => state.cachedProducts[id] || null,
  },
  mutations: {
    removeProduct: (state, productId) => delete state.cachedProducts[productId],
    addProductToCache: (state, product) => state.cachedProducts[product.id] = product,
  },
  actions: {
    async fetchProduct({ commit }, productId) {
      const product = await mock.fetchProduct(productId);
      commit("addProductToCache", product);
      return product;
    },
    async fetchProducts({ commit }) {
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
    async deleteProduct({ commit }, productId) {
      const res = await mock.deleteProduct(productId);
      if (!res.ok) return new Error(res.error);
      commit("removeProduct", productId);
      return true;
    },
    async createProduct({ commit }, product) {
      const res = await mock.createProduct(product);
      if (!res.ok) return new Error(res.error);
      commit("addProductToCache", res.product);
      return res.product;
    },
    async updateProduct({ commit }, product) {
      const res = await mock.updateProduct(product);
      if (!res.ok) return new Error(res.error);
      commit("addProductToCache", res.product);
      return res.product;
    },
  }
}