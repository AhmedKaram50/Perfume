// import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const state = {
  isAdmin: false,
  counts: {
    users: 0,
    products: 0,
    categories: 0,
    sellsToday: 0,
    totalEarnings: 0,
  },
  isInformationLoaded: false,
  AllUsers: []
};

const getters = {
  counts: (state) => state.counts,
  isInformationLoaded: (state) => state.isInformationLoaded,
  allUsers: (state) => state.AllUsers
};

const mutations = {
  setCount: (state, payload) => {
    state.counts[payload.count] = payload.value;
  },
  isInformationLoaded: (state, payload) => {
    state.isInformationLoaded = payload;
  },
  setAllUsersData: (state, payload) => {
    state.AllUsers.push(payload)
  }
};

const actions = {
  getPostsCount({ commit }) {
    fetch(`https://rocky-oasis-81800.herokuapp.com/product/show?category=all`)
      .then((result) => result.json())
      .then((data) => {
        commit("setCount", { count: "products", value: data.products.length });
      });
  },


  async getAllCounts({ commit, dispatch }) {
    const db = getFirestore();
    const coll = collection(db, "users");
    const snapShot = await getDocs(coll);
    commit("setCount", { count: "users", value: snapShot.size });
    dispatch("getCategoriesFromApi")
    dispatch("getPostsCount");
    commit("isInformationLoaded", true);
  },

  getAllUsers ({commit}) {
    const db = getFirestore();
    const coll = collection(db, "users")
    getDocs(coll).then(result => {
      result.forEach(doc => {
        console.log(doc.data())
        commit("setAllUsersData", doc.data())
      })
    })
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
