
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
      const res = await fetch(
        `http://localhost:8080/api/users`,
        { method: "GET", }
      ).then(o => o.json());

      if (!res.ok) return new Error(res.error);
      for (const user of res.users) {
        commit("cacheUser", user);
      }
      return res.users;
    },
    async fetchUser({ commit }, uid) {
      const res = await fetch(
        `http://localhost:8080/api/user/${userId}`,
        { method: "GET", }
      ).then(o => o.json());

      if (!res.ok) return new Error(res.error);
      commit("cacheUser", res.user);
      return res.user;
    },
    async updateUser({ commit }, id, type) {
      const res = await fetch(
        `http://localhost:8080/api/user/${id}`,{
        method: "PATCH",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
        }),
      }).then(o => o.json());
      console.log("updateUser");
      console.log(res);

      if (!res.ok) return new Error(res.error);
      commit("cacheUser", res.user);
      return res.user;
    },
    async deleteUser({ commit }, userId) {
      const res = await fetch(
        `http://localhost:8080/api/user/${userId}`,
        { method: "DELETE", }
      ).then(o => o.json());

      if (!res.ok) return new Error(res.error);
      commit("removeUser", userId);
      return true;
    }
  }
};

export default store;