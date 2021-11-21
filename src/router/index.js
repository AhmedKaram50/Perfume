import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import register from "../views/register.vue";
import login from "../views/login.vue";
import profile from "../views/profile.vue";
import catalog from "../views/catalog.vue";
import product from "../views/product.vue";
import AdminHome from "../views/dashboard/AdminHome.vue";
import users from "../views/dashboard/Users.vue";
import adminProducts from "../views/dashboard/Products.vue";
import addProduct from "../views/dashboard/AddProduct.vue";
import editProduct from "../views/dashboard/EditProduct.vue";
import categories from "../views/dashboard/Categories.vue";
import addCategory from "../views/dashboard/AddCategory.vue";

import { getAuth } from "firebase/auth";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/register",
    name: "register",
    component: register,
    meta: {
      title: "Register",
    },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
    meta: {
      title: "Profile",
      requiresAuth: true,
    },
  },
  {
    path: "/catalog",
    name: "catalog",
    component: catalog,
    meta: {
      title: "catalog",
    },
  },
  {
    path: "/catalog/:name",
    name: "product",
    component: product,
    meta: {
      title: "product",
    },
  },
  {
    path: "/dashboard/AdminHome",
    name: "AdminHome",
    component: AdminHome,
    meta: {
      title: "AdminHome"
    }
  },
  {
    path: "/dashboard/Users",
    name: "users",
    component: users,
    meta: {
      title: "Users"
    }
  },
  {
    path: "/dashboard/Products",
    name: "product",
    component: adminProducts,
    meta: {
      title: "Product"
    }
  },
  {
    path: "/dashboard/AddProduct",
    name: "AddProduct",
    component: addProduct,
    meta: {
      title: "Add Product"
    }
  },
  {
    path: "/dashboard/EditProduct",
    name: "EditProduct",
    component: editProduct,
    meta: {
      title: "Edit Product"
    }
  },
  {
    path: "/dashboard/Categories",
    name: "Categories",
    component: categories,
    meta: {
      title: "Categories"
    }
  },
  {
    path: "/dashboard/AddCategory",
    name: "AddCategory",
    component: addCategory,
    meta: {
      title: "Add Category"
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `Perfume | ${to.meta.title}`;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = getAuth();
  const isAuthenticated = user.currentUser;
  if (requiresAuth && !isAuthenticated) next("/login");
  else next();
});

export default router;
