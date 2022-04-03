import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    setUser(context, user) {
      context.commit('SET_USER', user)
    },
    setToken(context, token) {
      context.commit('SET_TOKEN', token)
      console.log('token = ', token);
    },
  },
  modules: {},
});
