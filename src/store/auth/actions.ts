import { ActionTree } from "vuex";
import AuthState from "../../models/AuthState";
import { RootState } from "./type";
import User from "../../models/User";
import AuthService from "../../services/authService";

export const actions: ActionTree<AuthState, RootState> = {
  async login({ commit }, user: User) {
    try {
      const userData = await AuthService.login(user);
      commit("loginSuccess", userData.accessToken);
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
};
