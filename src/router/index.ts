import { createRouter, createWebHashHistory } from "vue-router";
import routes from "../constants/router";

const router = createRouter({
  history: createWebHashHistory("http://localhost:5173/"),
  routes,
});
export default router;
