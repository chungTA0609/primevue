import { createStore } from "vuex";
import { auth } from "./auth";
import createPersistedState from "vuex-persistedstate";
import { RootState } from "./auth/type";

const dataState = createPersistedState({
  paths: ["auth"],
});
export default createStore<RootState>({
  modules: {
    auth,
  },
  plugins: [dataState],
  mutations: {},
  actions: {},
});
