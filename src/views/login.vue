<template>
  <div class="register">
    <div class="register-img">
      <img src="../assets/perfume6.png" alt="" />
    </div>
    <div class="register-form">
      <div class="heading">
        <h4>Login</h4>
        <h5>Login To Your Account Now</h5>
        <p>
          Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Eu
          ultrices vitae auctor eu augue ut lectus arcu bibendum elementum. Eu
          ultrices egestas
        </p>
      </div>
      <form action="">
        <div class="inputs-holder">
          <div class="input-holder">
            <input type="text" name="User Name" v-model="userName" />
            <label for="User Name">User Name</label>
          </div>
          <div class="input-holder">
            <input type="password" name="password" v-model="password" />
            <label for="password">Password</label>
          </div>
        </div>
        <div class="check-boxes">
          <div class="check-holder">
            <input type="checkbox" name="check1" v-model="remember" />
            <label for="check1">Remember Me</label>
          </div>
        </div>
        <div class="error-holder" v-if="error">
          {{ errorMessage }}
        </div>
        <button type="submit" class="main-btn" @click.prevent="validaion()">
          Login
        </button>
        <p>
          Dont Have an Account<router-link :to="{ name: 'register' }"
            >Register Now</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import "../firebaseInit.js";
import { mapActions, mapGetters } from "vuex";
 
export default {
  name: "login",
  data: function () {
    return {
      userName: "",
      password: "",
      remember: true,
      error: false,
      errorMessage: "",
      userInformations: {},
    };
  },
  methods: {
    // Validation & Login
    validaion() {
      if (this.userName === "" || this.password === "") {
        this.error = true;
        this.errorMessage = "The Email And Password Are Required";
      } else {
        this.signIn({
          email: this.userName,
          password: this.password,
        });
        console.log("done")
      }
    },
    ...mapActions(["signIn"]),
  },
  computed: {
    ...mapGetters(["userId"])
  }
};
</script>

<style lang="scss" scoped>
.register {
  .register-form .inputs-holder {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .register-form .inputs-holder .input-holde {
    width: 50%;
    margin-top: 20px !important;
  }
  .register-img {
    img {
      width: 90% !important;
    }
  }
  button {
    font-size: 18px !important;
    font-weight: bold;
  }
}
</style>
