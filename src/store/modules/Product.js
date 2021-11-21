
const state = {
  cartOpen: false,
  products: [],
  cart: [],
  categories: [],
  productsPageInfo: {
    productsInOnePageCount: 20,
    startFromProduct: 0,
  },
  currentProduct: {},
  currencySymbol: " E£",
  isCurrentProductLoaded: false,
  isCategoryLoaded: false,
  // sosoTest: productsData
};

const getters = {
  isCartSidebarOpen: (state) => state.cartOpen,
  AllProducts: (state) => state.products,
  products: (state) => state.products,
  cartProducts: (state) => state.cart,
  categories: (state) => state.categories,
  productsPageInfo: (state) => state.productsPageInfo,
  currentProduct: (state) => state.currentProduct,
  currencySymbol: (state) => state.currencySymbol,
  isProductLoaded: (state) => state.isCurrentProductLoaded,
  isCategoryLoaded: (state) => state.isCategoryLoaded
};

const mutations = {
  ChangeCartStatus(state, payload) {
    state.cartOpen = payload;
  },
  addToCart(state, payload) {
    state.cart.push(payload);
  },
  removeFromCart(state, payload) {
    state.cart = state.cart.filter((product) => product.name !== payload.name);
    console.log(state.cart);
  },
  setProducts(state, payload) {
    state.products = payload;
  },
  setCategories(state, payload) {
    state.categories = payload;
  },
  changePagination(state, payload) {
    state.products = state.products.slice(payload.start, payload.end);
  },
  setCurrentProduct(state, payload) {
    state.currentProduct = payload;
  },
  setCurrentProductByName(state) {
    state.currentProduct = state.products;
  },
  changeIsCurrentProductLoaded (state, payload) {
    state.isCurrentProductLoaded = payload
  },
  makeCategoriesLoaded (state, payload) {
    state.isCategoryLoaded = payload
  }
};

const actions = {
  addProductToCart({ commit }, product) {
    commit("addToCart", product);
    commit("ChangeCartStatus", true);
  },
  removeProductFromCart({ commit }, product) {
    commit("removeFromCart", product);
    console.log(product.id);
  },
  getProductsFromApi({ commit }, payload) {
    if (payload) {
      fetch(`https://rocky-oasis-81800.herokuapp.com/product/show?category=${payload}`)
        .then((result) => result.json())
        .then((data) => {
          commit("setProducts", data.products);
          commit("changeIsCurrentProductLoaded", true)
        });
    } else {
      payload = "all";
      fetch(`https://rocky-oasis-81800.herokuapp.com/product/show?category=${payload}`)
        .then((result) => result.json())
        .then((data) => {
          commit("setProducts", data.products);
          commit("changeIsCurrentProductLoaded", true)
        });
    }
  },

  addNewProduct({ dispatch }, payload) {
    fetch("https://rocky-oasis-81800.herokuapp.com/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        dispatch("getProductsFromApi");
      });
  },
  // Get And Add Categories
  getCategoriesFromApi({ commit }) {
    fetch("https://rocky-oasis-81800.herokuapp.com/category/show")
      .then((result) => result.json())
      .then((data) => {
        commit("setCategories", data.categories);
        commit("setCount", { count: "categories", value: data.categories.length })
        commit("makeCategoriesLoaded", true)
      });
  },
  addNewCategory({ dispatch }, payload) {
    fetch("https://rocky-oasis-81800.herokuapp.com/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        name: payload,
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        dispatch("getCategoriesFromApi");
        console.log(data);
      });
  },

  changePage({ commit }, payload) {
    commit("changePagination", payload);
  },

  async setCurrentProduct({ commit, dispatch }, payload) {
    await dispatch("getProductsFromApi", "all");
    await commit("setCurrentProductByName", payload);
  },

  // goToProduct({ commit, state }) {
    
  // },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
