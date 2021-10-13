import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import register from "../views/register.vue";
import login from "../views/login.vue";
import profile from "../views/profile.vue";
import catalog from "../views/catalog.vue";

import { getAuth } from "firebase/auth"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: "/register",
    name: "register",
    component: register,
    meta: {
      title: 'Register'
    }
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
    meta: {
      title: 'Profile',
      requiresAuth: true
    }
  },
  {
    path: "/catalog",
    name: "catalog",
    component: catalog,
    meta: {
      title: 'catalog'
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to,from,next) => {
  document.title = `Perfume | ${to.meta.title}`;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = getAuth();
  const isAuthenticated = user.currentUser;
  if (requiresAuth && !isAuthenticated) next("/login")
  else next();
})

export default router;
