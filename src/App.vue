<template>
  <div id="app">
    <navbar :isHome="isHome"/>
    <router-view />
    <the-footer v-if="!isSign"/>
    <!-- <loading v-if="!loading"/> -->
  </div>
</template>

<script>
import navbar from "./components/navbar.vue";
import theFooter from "./components/footer.vue";
// import loading from "./components/loading.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  components: {
    navbar,
    theFooter,
    // loading
  },
  data: function () {
    return {
      isHome: false,
      isSign: false,
      loading: false,
    }
  },
  methods: {
    checkRoute () {
      if(this.$route.name === "Home") this.isHome = true
      else this.isHome = false
      if(this.$route.name === "register" || this.$route.name === "login") this.isSign = true
      else this.isSign = false
    }
  },
  watch: {
    $route () {
      this.checkRoute()
    }
  },
  created () {
    const auth = getAuth();
    onAuthStateChanged(auth ,user => {
      if (user) {
        this.$store.commit("isUserUpdate", true)
        this.$store.dispatch("getCurrentUser")
        console.log("%cdone", "color: green")
        console.log(this.$store.state.isUser)
      } else {
        this.$store.commit("isUserUpdate", false)
        console.log("%cFaild", "color: red")
        console.log(this.$store.state.isUser)
      }
    })
  },
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap');
@import url('sass/global.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

body{
  font-family: var(--main-font)
}

/* Logo */
.logo{
  h5{
    color: var(--main-color);
    font-size: 30px;
    margin: 20px 0;
    font-weight: bold;
    cursor: pointer;
  }
  h5{
    position: relative;
    &::before,
    &::after{
      content: '';
      position: absolute;
      bottom: -10px;
      right: 0;
      width: 30%;
      height: 1px;
      background-color: var(--main-color);
    }
    &::after{
      left: 0;
    }
    span{
      position: absolute;
      bottom: -14px;
      font-size: 13px;
      left: calc(50% - 15px);
      font-weight: 400;
      color: var(--second-color)

    }
  }
  img{
    width: 100%;
    height: 100%;
  }
}
/* Logo */
</style>
