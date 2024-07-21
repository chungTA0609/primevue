import { createStore } from "vuex";
import { auth } from "./auth";
import createPersistedState from "vuex-persistedstate";

const dataState = createPersistedState({
  paths: ["auth"],
});
export default createStore({
  state: {
    version: "1.0.0", // a simple property
  },
  modules: {
    auth,
  },
  plugins: [dataState],
  mutations: {},
  actions: {},
});
