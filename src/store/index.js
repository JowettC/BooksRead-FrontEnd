import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

/* eslint-disable no-new */
export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      localStorage.setItem("token", payload);
      state.token = payload;
    },
  },
  actions: {
    init({ commit }) {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        commit("SET_TOKEN", localToken);
      }
    },
    login: ({ commit }, payload) => {
      commit("SET_TOKEN", payload);
    },
    logout: ({ state }) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
  getters: {
    isAuthenticated: (state) => {
      return state.token;
    },
  },
  modules: {},
});

