import { Module } from "vuex";

import AuthState from "../../models/AuthState";
import User from "../../models/User";
import AuthService from "../../services/authService";
import { RootState } from "../auth/type";

const user = AuthService.getCurrentUser();
const initialState: AuthState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user: User) {
      try {
        const userData = await AuthService.login(user);
        commit("loginSuccess", userData);
        return Promise.resolve(userData);
      } catch (error) {
        commit("loginFailure");
        return Promise.reject(error);
      }
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    async register({ commit }, user: User) {
      try {
        await AuthService.register(user);
        commit("registerSuccess");
        return Promise.resolve();
      } catch (error) {
        commit("registerFailure");
        return Promise.reject(error);
      }
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
};
