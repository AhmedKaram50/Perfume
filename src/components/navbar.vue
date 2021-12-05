<template>
  <div :class="{ navigation: isHome }">
    <nav class="d-none d-lg-flex justify-content-between align-items-center">
      <div class="logo">
        <h5>Perfume <span>Store</span></h5>
      </div>
      <div class="links">
        <div id="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/catalog">Catalog</router-link>
          <router-link to="/blog">Blog</router-link>
          <a href="#" @click.prevent="togglePageMenu()">Pages</a>
          <div class="pages-menu" v-if="pagesShow">
            <ul>
              <li><router-link to="/blog">About</router-link></li>
              <li><router-link to="/blog">Services</router-link></li>
              <li><router-link to="/blog">FAQ</router-link></li>
              <li><router-link to="/blog">Contact</router-link></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="user d-flex align-items-center">
        <router-link :to="{ name: 'register' }" v-if="!isSigned"
          ><fa-icon :icon="['fas', 'user-plus']"
        /></router-link>
        <div class="profile" v-else>
          <router-link :to="{ name: 'profile' }">
            <div class="profile-pic">
              <img :src="userProfilePicUrl.profileImageUrl" />
            </div>
          </router-link>
        </div>
        <fa-icon :icon="['fas', 'shopping-cart']" @click="openCart()" />
        <span>{{ cartProducts.length }}</span>
        <div class="language">
          <select name="languages" id="langs">
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
          </select>
        </div>
      </div>
    </nav>
    <!-- Menue On Mobile -->
    <div
      class="
        drop-down-nav
        d-md-none d-flex
        justify-content-between
        align-items-center
      "
    >
      <div class="logo">
        <h5>Perfume <span>Store</span></h5>
      </div>
      <div class="menu">
        <fa-icon :icon="['fas', 'bars']" @click="openMobileNav()" />
      </div>
      <div :class="openNavClass">
        <fa-icon :icon="['fas', 'times']" @click="closeMobileNav()" />
        <div class="links">
          <div id="nav">
            <router-link to="/">Home</router-link>
            <router-link to="/catalog">Catalog</router-link>
            <router-link to="/blog">Blog</router-link>
            <router-link to="/pages">Pages</router-link>
          </div>
        </div>
        <div class="user d-flex align-items-center">
          <router-link to="/login"
            ><fa-icon :icon="['fas', 'user']"
          /></router-link>
          <fa-icon :icon="['fas', 'shopping-cart']" />
          <span>{{ productCount }}</span>
          <div class="language">
            <select name="languages" id="langs">
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <cart />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import cart from "../components/cart.vue";

export default {
  name: "navbar",
  data: function () {
    return {
      productCount: 6,
      openNav: false,
      openNavClass: "slide-menu",
      pagesShow: false,
      homeClass: "navigation",
      toto: true,
      navWhite: true,
    };
  },
  components: {
    cart,
  },
  props: {
    isHome: { default: false },
  },
  methods: {
    openMobileNav() {
      this.openNavClass = "slide-menu open";
    },
    closeMobileNav() {
      this.openNavClass = "slide-menu";
    },
    togglePageMenu() {
      this.pagesShow = !this.pagesShow;
    },
    changeHomeClass() {
      this.homeClass = "navigation nav-white";
    },
    openCart() {
      this.ChangeCartStatus(true);
    },
    ...mapMutations(["ChangeCartStatus", "setUserId", "changeSignStatus"]),
    ...mapActions(["userLocalStorage", "getCurrentUserData"]),
  },
  computed: {
    isUser() {
      return this.$store.state.isLogged;
    },
    ...mapGetters(["isSigned", "userProfilePicUrl", "cartProducts", "userId"]),
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setUserId(user.uid);
        this.changeSignStatus(true);
      }
    });
  },
  mounted() {
    this.getCurrentUserData();
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  height: 0;
}
.navigation.nav-white {
  height: auto;
  nav {
    padding-block: 12px;
  }
}
nav {
  padding: 20px 40px;
  z-index: 100;
  position: relative;
  background: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
div:first-child {
  .links {
    a {
      margin: 0 30px;
      text-decoration: none;
      font-size: 20px;
      font-weight: normal;
    }
    #nav {
      padding: 0;
    }
    #nav a.router-link-exact-active {
      color: var(--main-color);
      position: relative;
    }
    #nav > a.router-link-exact-active::before,
    #nav > a::before {
      content: "";
      width: 100%;
      height: 3px;
      background-color: var(--main-color);
      bottom: -8px;
      left: 0;
      position: absolute;
      transition: all 0.3s ease-in-out;
    }
    #nav a {
      font-weight: normal;
      color: #373737;
      transition: all 0.3s ease-in-out;
      position: relative;
    }
    #nav a::before {
      width: 0%;
    }
    #nav a:hover {
      color: var(--main-color);
    }
    #nav a:hover::before {
      width: 100%;
    }
  }
  .user {
    svg {
      color: #373737;
      margin-left: 20px;
      font-size: 20px;
      cursor: pointer;
    }
    span {
      background-color: var(--main-color);
      width: 15px;
      height: 15px;
      border-radius: 50%;
      position: relative;
      top: -8px;
      left: -6px;
      font-size: 11px;
      color: #fff;
      font-weight: bold;
    }
    .language {
      margin-left: 20px;
      select {
        outline: none;
        background-color: #373737;
        color: #fff;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 14px;
        border-radius: 10px;
        border: none;
        color: var(--main-color);
        font-family: var(--main-font);
      }
    }
    .profile .profile-pic {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid rgb(0 0 0 / 30%);
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

.drop-down-nav {
  padding: 15px 20px;
  position: relative;
  .logo {
    h5 {
      font-size: 24px;
      span {
        font-size: 11px;
      }
    }
  }
  .menu {
    svg {
      font-size: 24px;
      cursor: pointer;
      color: var(--main-color);
      margin-top: 10px;
      position: relative;
      z-index: 1000;
    }
  }
  .slide-menu.open {
    right: 0%;
  }
  .slide-menu {
    position: absolute;
    z-index: 1000;
    top: 0;
    right: -100%;
    height: 100vh;
    transition: all 0.8s ease-in-out;
    width: 100%;
    background-color: #fff;
    text-align: center;
    padding: 100px 0;
    > svg {
      position: absolute;
      top: 50px;
      right: 50px;
      cursor: pointer;
      font-size: 20px;
    }
    .links {
      a {
        width: fit-content;
        margin: auto;
      }
    }
    .user {
      flex-direction: column;
      margin: 0 0;
      svg {
        margin: 0;
        margin-top: 30px;
      }
      .language {
        margin-top: 30px;
        margin-left: 0;
      }
    }
  }
}

#nav .pages-menu ul {
  padding: 0;
  list-style: none;
  background-color: rgb(255, 255, 255);
  text-align: left;
  position: absolute;
  width: 190px;
  top: 105px;
  right: 29%;
  border-radius: 10px;
  font-family: var(--main-font);
  li {
    margin: 12px 0;
    a {
      margin-left: 10px;
      font-size: 14px;
      display: inline-block;
    }
  }
  li:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    a {
      margin-bottom: 6px;
    }
  }
}

@media (max-width: 576px) {
  .navigation {
    #nav {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
  }
}
</style>
