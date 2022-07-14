import * as mock from "@/mock";

import { Role, userTypeToRole } from "@/roles";

const initialState = () => ({
  name: null,
  id: null,
  email: null,
  phone: null,
  address: null,
  city: null,
  extra: null,
  password: null,
  type: null,
  role: Role.Newcomer,
})

export default {
  namespaced: true,
  // TODO: store some of this data on the server only
  state: initialState,
  getters: {
    role: state => state.role,
    get: state => state,
  },
  mutations: {
    reset: state => Object.assign(state, initialState()),
    register(state, user) {
      state.role = userTypeToRole(user.type);
      Object.assign(state, user);
      if (user._id) state.id = user._id;
    },
    tryLoadFromLocalStorage(state) {
      let currentUser = localStorage.getItem("currentUser");
      console.log("failed to load currentUser from localStorage.");
      if (!currentUser) return;
      currentUser = JSON.parse(currentUser);
      state.role = userTypeToRole(currentUser.type);
      Object.assign(state, currentUser);
    },
  },
  actions: {
    async register({ commit }, user) {
      const res = await mock.registerUser(user);
      if (!res.ok) return new Error(res.error);
      commit("register", user);
      return res.user;
    },
    async update({ commit }, user) {
      const res = await mock.updateCurrentUser(user);
      if (!res.ok) return new Error(res.error);
      commit("register", res.user);
      return res.user;
    },
  },
};