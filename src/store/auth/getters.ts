import { GetterTree } from "vuex";
import AuthState from "../../models/AuthState";
import { RootState } from "./type";

export const getters: GetterTree<AuthState, RootState> = {
  // fullName(state): string {
  //   const { user } = state;
  //   const firstName = (user && user.firstName) || "";
  //   const lastName = (user && user.lastName) || "";
  //   return `${firstName} ${lastName}`;
  // },
};
