<template>
  <footer>
    <div class="overlay"></div>
    <div class="upper-footer">
      <div class="logo">
        <h5>Perfume <span>Store</span></h5>
      </div>
      <div class="subscribe">
        <h5>Subscribe Our Newsletter</h5>
        <input type="text" placeholder="Your Email Adress" v-model="email" />
        <button class="main-btn" @click="goToRegister()">Sign Up</button>
        <div class="social">
          <a href="#"><fa-icon :icon="['fab', 'facebook-f']" /></a>
          <a href="#"><fa-icon :icon="['fab', 'twitter']" /></a>
          <a href="#"><fa-icon :icon="['fab', 'linkedin-in']" /></a>
          <a href="#"><fa-icon :icon="['fab', 'github']" /></a>
        </div>
      </div>
      <div class="links">
        <ul>
          <li><router-link to="/blog">Home</router-link></li>
          |
          <li><router-link to="/blog">Services</router-link></li>
          |
          <li><router-link to="/blog">About</router-link></li>
          |
          <li><router-link to="/blog">Blog</router-link></li>
          |
          <li><router-link to="/blog">Contact</router-link></li>
        </ul>
      </div>
    </div>
    <div class="down-footer">
      <h6>
        © 2021 Perfume Theme Designed By
        <a href="https://www.linkedin.com/feed/"
          >Ahmed Karam <fa-icon :icon="['fas', 'heart']"
        /></a>
      </h6>
    </div>
  </footer>
</template>

<script>
export default {
  name: "the-footer",
  data: function () {
    return {
      email: "",
    };
  },
  methods: {
    goToRegister() {
      this.$store.state.email = this.email;
      this.$router.replace({ name: "register" });
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  position: relative;
  background: url("../assets/background.jpg") center;
  background-size: cover;
  z-index: 6;
  font-family: var(--main-font);
  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
  .upper-footer {
    padding-top: 50px;
    padding-bottom: 40px;
    position: relative;
    z-index: 6;
    border-bottom: 1px solid rgba(252, 132, 107, 0.4);
    .logo {
      width: fit-content;
      margin: 0 auto;
      margin-bottom: 60px;
      h5 {
        font-size: 36px;
        letter-spacing: 5px;
      }
      span {
        color: #fff;
        left: calc(50% - 27px);
      }
    }
    .subscribe {
      h5 {
        color: #fff;
        font-size: 22px;
        margin: 0 0 20px 0;
      }
      input {
        border: none;
        width: 600px;
        height: 60px;
        padding: 15px 25px;
        outline: none;
        color: #949494;
        border-radius: 50px;
      }
      button {
        position: absolute;
        transform: translate(calc(-100% - 5px), 5px);
      }
    }
    .social {
      margin: 50px 0;
      svg {
        font-size: 18px;
        cursor: pointer;
        color: #fff;
        margin: 0 20px;
        transition: transform 0.3s ease-in-out;
        &:hover {
          transform: rotate(360deg);
        }
      }
      svg[data-icon="facebook-f"]:hover {
        color: #1877f2;
      }
      svg[data-icon="twitter"]:hover {
        color: #1da1f2;
      }
      svg[data-icon="linkedin-in"]:hover {
        color: #0a66c2;
      }
      svg[data-icon="github"]:hover {
        color: #424344;
      }
    }
    .links {
      ul {
        padding: 0;
        list-style: none;
        display: flex;
        justify-content: center;
        gap: 30px;
        margin: 20px 0;
        color: #fff;
        li {
          a {
            text-decoration: none;
            color: #fff;
            font-size: 20px;
            transition: color 0.3s ease-in-out;
            &:hover {
              color: var(--main-color);
            }
          }
        }
      }
    }
  }
  .down-footer {
    position: relative;
    z-index: 6;
    padding: 25px 0;
    h6 {
      margin: 0;
      color: #fff;
      word-spacing: 2px;
      a {
        color: #d63031;
        text-decoration: none;
      }
    }
  }
}
@media (max-width: 576px) {
  footer {
    .upper-footer .subscribe input {
      width: 90%;
    }
    .upper-footer .links ul {
      gap: 8px;
      a {
        font-size: 15px !important;
      }
    }
    .down-footer h6 {
      font-size: 13px;
    }
  }
}
</style>
