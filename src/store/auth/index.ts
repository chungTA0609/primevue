import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import AuthState from "../../models/AuthState";
import { RootState } from "./type";

const namespaced: boolean = true;
export const state: AuthState = {
  status: {
    loggedIn: false,
  },
  user: null,
};
export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
