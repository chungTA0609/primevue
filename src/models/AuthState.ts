import AuthResponse from "./AuthResponse";

export default interface AuthState {
  status: {
    loggedIn: boolean;
  };
  user: AuthResponse | null;
}
