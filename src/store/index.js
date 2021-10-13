import Vue from "vue";
import Vuex from "vuex";
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isHome: false,
    isLogged: false,
    email: "",
    isUser: false,
    userInformations:{
      firstName: "",
      lastName: "",
      email: "",
      profileImageUrl: "",
      country: "",
      city: "",
      phoneNumber: "",
      zipCode: "",
      createdIn: "",
    },
    welcomeProducts: [
      {
        id: 1,
        span: "Be Alegant",
        title: "Put That Perfume and make Girls Run at You.",
        paragraph: "Experience the decibels like your ears deserve to. Safe for the ears, good for the heart. A treat to your ears.",
        imageName: "perfume2",
      },
      {
        id: 2,
        span: "Came From Heaven",
        title: "Make Your smell like Heaven.",
        paragraph: "Experience the decibels like your ears deserve to. Safe for the ears, good for the heart. A treat to your ears.",
        imageName: "perfume3",
      },
      {
        id: 3,
        span: "Came",
        title: "Make Your smell like Heaven Like This.",
        paragraph: "Experience the decibels like your ears deserve to. Safe for the ears, good for the heart. A treat to your ears.",
        imageName: "perfume4",
      },
    ],
    welcomeBlogs: [
      {
        id: 1,
        title: "Why We Are The Best",
        author: "Youssef Hossam",
        date: "August 4, 2000",
        text: "Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum elementum. Eu ultrices egestas",
        imageName: "blog1"
      },
      {
        id: 2,
        title: "Fuck All The GOT Haters",
        author: "Karim Ahmed",
        date: "August 4, 2000",
        text: "Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum elementum. Eu ultrices egestas",
        imageName: "blog2"
      },
      {
        id: 3,
        title: "Do You Know Egypt.?",
        author: "Walid Mohammed",
        date: "August 4, 2000",
        text: "Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum elementum. Eu ultrices egestas",
        imageName: "blog3"
      },
    ]
  },
  mutations: {
    getUsersInformation (state, payload) {
      state.userInformations.firstName = payload.firstName
      state.userInformations.lastName = payload.lastName
      state.userInformations.email = payload.email
      state.userInformations.profileImageUrl = payload.profileImageUrl
      state.userInformations.country = payload.country
      state.userInformations.city = payload.city
      state.userInformations.phoneNumber = payload.phoneNumber
      state.userInformations.zipCode = payload.zipCode
      state.userInformations.createdIn = payload.createdIn
    },
    // updateUserInfo (state, payload) {

    // },
    isUserUpdate(state, payload) {
      state.isUser = payload
    }
  },
  actions: {
    async getCurrentUser ({commit}) {
      const userId = getAuth().currentUser.uid
      const db = getFirestore();
      const docRef = doc(db, "users", userId);
      const snapShot = await getDoc(docRef);
      const data = snapShot.data()
      commit("getUsersInformation", data)
    },
    async updateUserInfo ({state}) {
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
    }
  },
  modules: {},
});
