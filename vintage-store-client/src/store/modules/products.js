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
      product.id = product._id;
      commit("addProductToCache", product);
      return product;
    },
    async fetchProducts({ commit }) {
      // const products = await mock.fetchProducts();
      const result = await fetch('http://localhost:8080/api/products');
      const { ok, error, products } = await result.json();
      if (!ok) return new Error(error);
      for (const p of products) {
          p.id = p._id;
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
    async createProduct({ commit }, product) {
      const res = await fetch(
        `http://localhost:8080/api/product`,
        { method: "POST",
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(product)
      }).then(o => o.json());

      // TODO: verify that the object is valid
      if (!res.ok) return new Error(res.error);
      res.product.id = res.product._id;
      commit("addProductToCache", res.product);
      return product;
    },
    async updateProduct({ commit }, product) {
      // const res = await mock.updateProduct(product);
      console.log("product: ")
      console.log(product)
      const res = await fetch(`http://localhost:8080/api/product/${product.id}`, { 
        method: "PATCH",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then(o => o.json());
      
      console.log("Res: ")
      console.log(res);
      console.log(product);

      if (!res.ok) return new Error(res.error);
      commit("addProductToCache", res.product);
      return res.product;
    },
  }
}
