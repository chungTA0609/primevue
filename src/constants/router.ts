import { RouteRecordRaw } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Home", component: Home, meta: { requiresAuth: true } },
  { path: "/login", name: "Login", component: Login },
];
export default routes;
