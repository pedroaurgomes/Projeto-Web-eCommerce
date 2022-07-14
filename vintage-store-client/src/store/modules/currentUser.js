
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
      console.log("type: ")
      console.log(user)
      if(user.type) state.role = userTypeToRole(user.type);
      Object.assign(state, user);
      console.log("user:" + user);
      if (user.id) state.id = user.id;
      localStorage.setItem("currentUser", JSON.stringify(state));
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
      const res = await fetch(`http://localhost:8080/api/user/`, { 
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then(o => o.json());

      if (!res.ok) return new Error(res.error);
      commit("register", user);
      return res.user;
    },
    async update({ commit, state }, user) {
      console.log(state);
      const res = await fetch(`http://localhost:8080/api/user/${state.id}`, { 
        method: "PATCH",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then(o => o.json());
      console.log("Res: ")
      console.log(res);
      console.log(user);

      if (!res.ok) return new Error(res.error);
      commit("register", res.user);
      return res.user;
    },
  },
};
