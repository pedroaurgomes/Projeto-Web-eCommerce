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
      // const product = await mock.fetchProduct(productId);
      const result = await fetch(`http://localhost:8080/api/product/${productId}`);
      const { ok, error, product } = await result.json();
      if (!ok) return new Error(error);
      commit("addProductToCache", product);
      return product;
    },
    async fetchProducts({ commit }) {
      // const products = await mock.fetchProducts();
      const result = await fetch('http://localhost:8080/api/products');
      const { ok, error, products } = await result.json();
      if (!ok) return new Error(error);
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
      //const res = await mock.deleteProduct(productId);
      const res = await fetch(
        `http://localhost:8080/api/product/${productId}`,
        { method: "DELETE", }
      ).then(o => o.json());
      
      if (!res.ok) return new Error(res.error);
      commit("removeProduct", productId);
      return true;
    },
    async createProduct({ commit,dispatch }, product) {
      //const res = await mock.createProduct(product);
      let products = await dispatch('fetchProducts');

      const res = await fetch(
        `http://localhost:8080/api/product`,
        { method: "POST",
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
          title: product.title,
          brand: product.brand,
          price: product.price,
          description: product.description,
          colors: product.colors,
          defaultColor: product.defaultColor,
          imgSrc: product.imgSrc,
          longDescription: product.longDescription,
          nSold: product.nSold,
          nInStock: product.nInStock
        })
      });
      
      // TODO: verify that the object is valid
      if (!res.ok) return new Error(res.error);
      commit("addProductToCache", product);
      return product;
    },
    async updateProduct({ commit }, product) {
      const res = await mock.updateProduct(product);
      if (!res.ok) return new Error(res.error);
      commit("addProductToCache", res.product);
      return res.product;
    },
  }
}