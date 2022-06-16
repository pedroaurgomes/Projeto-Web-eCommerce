import { createStore } from "vuex";

import * as mock from "@/mock/utils";

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
        },
        userStatus: "newcomer",

        cachedProducts: [],

        // Products added to the cart. Each element contains the id,
        // the quantity and color of the product.
        cartItems: []
    }),
    getters: {
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
        addToCart(state, item) {
            state.cartItems.push(item);
        },
        removeFromCart(state, productId) {
            const idx = state.cartItems.findIndex(p => p.productId === productId);
            if (idx < 0) return;
            state.cartItems.splice(idx, 1);
        },
        registerUser(state, user) {
            state.userStatus = user.type;
            state.user = user;
        },
        addProductToCache(state, product) {
            state.cachedProducts.push(product);
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
        }
    }
});

export default store;