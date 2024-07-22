import axios from "axios";
import store from "../store";
import router from "../router";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the JWT token to the request headers
api.interceptors.request.use(
  (config) => {
    const user = store.state.auth.user;
    if (user && user.accessToken) {
      config.headers["Authorization"] = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors and refresh token logic
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Handle token refresh logic here if you have refresh tokens
      // Example: await store.dispatch('auth/refreshToken');
      store.dispatch("auth/logout");
      router.push("/login");
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
