<template>
  <div class="welcome-blogs">
    <div class="container">
      <div class="heading">
        <span>Good treble performance</span>
        <h2>Perfume Smell Blog</h2>
      </div>
      <div class="row">
        <div class="col-lg-4" v-for="blog in blogs" :key="blog.id">
          <blog
            :title="blog.title"
            :author="blog.author"
            :date="blog.date"
            :imageName="blog.imageName"
          >
            {{ blog.text }}
          </blog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blog from "../blog.vue";
import { mapGetters } from "vuex";

export default {
  name: "welcome-blogs",
  components: {
    blog,
  },
  computed: {
    ...mapGetters(["blogs"])
  },
};
</script>

<style lang="scss" scoped>
.welcome-blogs {
  padding: 100px 0;
  font-family: var(--main-font);
  .heading {
    span {
      font-size: 20px;
      font-family: var(--main-font);
      position: relative;
      width: fit-content;
      &::before {
        content: "";
        position: absolute;
        right: calc(50% - 25px);
        top: -20px;
        width: 50px;
        height: 1px;
        background: var(--main-color);
      }
    }
    h2 {
      color: var(--main-color);
      font-weight: bold;
      margin: 20px 0 100px 0;
      font-size: 35px;
      font-family: var(--main-font);
      width: 100%;
      line-height: 1.25;
    }
  }
}
.col-lg-4 {
  padding: 0 20px;
}
@media (max-width: 576px) {
  .col-lg-4:not(:last-child) {
    margin-bottom: 50px;
  }
}
</style>
