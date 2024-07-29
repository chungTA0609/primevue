import { RouteRecordRaw } from "vue-router";
// import Home from "../components/Home.vue";
import Login from "../views/Login.vue";
import AppLayout from "../layout/AppLayout.vue";
// import Excersises from "../views/Excersises.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: AppLayout,
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("../components/Home.vue"),
      },
      {
        path: "/uikit/formlayout",
        name: "formlayout",
        component: () => import("@/views/page/FormLayout.vue"),
      },
      {
        path: "/uikit/input",
        name: "input",
        component: () => import("@/views/page/InputLayout.vue"),
      },
    ],
    // meta: { requiresAuth: true },
  },
  { path: "/login", name: "Login", component: Login },
  // { path: "/excersises", name: "Excersises", component: Excersises },
];
export default routes;
