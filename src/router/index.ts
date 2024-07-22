import { createRouter, createWebHashHistory } from "vue-router";
import routes from "../constants/router";
// import store from "../store";

const router = createRouter({
  history: createWebHashHistory("http://localhost:5173/"),
  routes,
});
router.beforeEach((to, from, next) => {
  console.log(from);

  const isLogin = !!localStorage.getItem("user");
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLogin) {
    next("/login");
  } else {
    next();
  }
});

export default router;
