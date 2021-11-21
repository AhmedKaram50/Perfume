import router from "../../router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, getDoc, doc, updateDoc, } from "firebase/firestore";
import welcomeProducts from "../data/first-post.js";
import blogsData from "../data/blogs.js";

const state = {
  isSignedIn: false,
  userId: "",
  information: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profileImageUrl: "",
    country: "",
    city: "",
    phoneNumber: "",
    zipCode: "",
    createdIn: "",
  },
};

const getters = {
  isSigned: function (state) {
    return state.isSignedIn;
  },
  userId: (state) => state.userId,
  welcomePosts: () => welcomeProducts,
  blogs: () => blogsData,
  userInformation: (state) => state.information,
  userProfilePicUrl: (state) => state.information,
};

const mutations = {
  changeSignStatus(state, payload) {
    state.isSignedIn = payload;
  },
  setUserId(state, payload) {
    state.userId = payload;
    console.log(state.userId);
  },
  getCurrentUserId(state) {
    const auth = getAuth();
    state.userId = auth.currentUser.uid;
  },
  setUserInformation(state, payload) {
    state.information.firstName = payload.firstName;
    state.information.lastName = payload.lastName;
    state.information.email = payload.email;
    state.information.profileImageUrl = payload.profileImageUrl;
    state.information.country = payload.country;
    state.information.city = payload.city;
    state.information.phoneNumber = payload.phoneNumber;
    state.information.zipCode = payload.zipCode;
    state.information.createdIn = payload.createdIn;
  },
};

const actions = {
  signIn({ commit }, payload) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then(() => {
        commit("setUserId", auth.currentUser.uid);
        commit("changeSignStatus", true);
        router.push({ name: "Home" });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  userLocalStorage({ commit, state }) {
    if (state.userId !== "") commit("changeSignStatus", true);
    else commit("changeSignStatus", false);
  },

  async getCurrentUserData({ commit, state }) {
    await commit("getCurrentUserId");
    const db = getFirestore();
    const docRef = doc(db, "users", state.userId);
    const snapShot = await getDoc(docRef);
    await commit("setUserInformation", snapShot.data());
  },

  getUserId({ commit }) {
    commit("getCurrentUserId");
    console.log("hello from user id");
  },

  async updateUserInformation({ state }) {
    const db = getFirestore();
    const docRef = doc(db, "users", state.userId);
    await updateDoc(docRef, {
      firstName: state.information.firstName,
      lastName: state.information.lastName,
      city: state.information.city,
      country: state.information.country,
      zipCode: state.information.zipCode,
      phoneNumber: state.information.phoneNumber,
    });
    console.log("User Information Updated")
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
