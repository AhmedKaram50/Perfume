import Vue from "vue";
import Vuex from "vuex";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
// Modules
import User from "./modules/User.js";
import Product from "./modules/Product.js";
import Admin from "./modules/Admin.js";
// Data

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isHome: false,
  },
  mutations: {},
  actions: {
    async updateUserInfo({ state }) {
      const userId = getAuth().currentUser.uid;
      const db = getFirestore();
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
        firstName: state.userInformations.firstName,
        lastName: state.userInformations.lastName,
        email: state.userInformations.email,
        city: state.userInformations.city,
        profileImageUrl: state.userInformations.profileImageUrl,
        country: state.userInformations.country,
        zipCode: state.userInformations.zipCode,
        phoneNumber: state.userInformations.phoneNumber,
        createdIn: state.userInformations.createdIn,
      });
    },
  },
  modules: {
    User,
    Product,
    Admin
  },
});
