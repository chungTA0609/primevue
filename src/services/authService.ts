import AuthResponse from "../models/AuthResponse";
import User from "../models/User";
import api from "./axiosInterceptor";


class AuthService {
  async login(user: User): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/authenticate", user);
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data.accessToken));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(user: User) {
    await api.post("/register", user);
  }

  getCurrentUser(): AuthResponse | null {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
}

export default new AuthService();
