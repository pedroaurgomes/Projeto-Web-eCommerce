import { createStore } from "vuex";

import * as mock from "@/mock";

const store = {
  namespaced: true,
  state: () => ({
    cachedUsers: {},
  }),
  getters: {
    users: state => Object.values(state.cachedUsers),
  },
  mutations: {
    cacheUser: (state, user) => state.cachedUsers[user.id] = user,
    removeUser: (state, userId) => delete state.cachedUsers[userId]
  },
  actions: {
    async fetchUsers({ commit }) {
      const res = await mock.fetchUsers();
      if (!res.ok) return new Error(res.error);
      for (const user of res.users) {
        commit("cacheUser", user);
      }
      return res.users;
    },
    async fetchUser({ commit }, uid) {
      const res = await mock.fetchUser(uid);
      if (!res.ok) return new Error(res.error);
      commit("cacheUser", res.user);
      return res.user;
    },
    async updateUser({ commit }, update) {
      const res = await mock.updateUser(update);
      if (!res.ok) return new Error(res.error);
      commit("cacheUser", res.user);
      return res.user;
    },
    async deleteUser({ commit }, userId) {
      const res = await mock.deleteUser(userId);
      if (!res.ok) return new Error(res.error);
      commit("removeUser", userId);
      return true;
    }
  }
};

export default store;