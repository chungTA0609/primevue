import { MutationTree } from "vuex";
import AuthState from "../../models/AuthState";
import User from "../../models/User";

export const mutations: MutationTree<AuthState> = {
  loginSuccess(state, user: User) {
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
};
