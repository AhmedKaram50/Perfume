import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from "axios"
import './icons.js';
import "./firebaseInit.js"
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import "@storefront-ui/vue/styles.scss";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(BootstrapVue);


let app;
const auth = getAuth();
onAuthStateChanged(auth, () => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
})



