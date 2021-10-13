<template>
  <div class="home">
    <welcome />
    <first-product v-for="product in getWelcomeProducts" :key="product.id" 
      :span="product.span"
      :title="product.title"
      :paragraph="product.paragraph"
      :imageSrc="product.imageName"
    />
    <features />
    <testimonials />
    <video-baner @videoTurnOn="updateVideoOpen($event)"/>
    <video-holder vidSrc="https://www.youtube.com/embed/WEW69QU9KBE" :startAt="180" v-if="videoOn" />
    <welcome-blogs />
    <!-- <loading v-if="loading"/> -->
  </div>
</template>

<script>
import welcome from "../components/sections/header.vue";
import firstProduct from "../components/sections/first-product.vue";
import features from "../components/sections/features.vue";
import testimonials from "../components/sections/testimonials.vue";
import videoBaner from "../components/sections/video.vue";
import videoHolder from "../components/video-holder.vue";
import welcomeBlogs from "../components/sections/welcome-blogs.vue";
// import loading from "../components/loading.vue";

export default {
  name: "Home",
  components: {
    welcome,
    firstProduct,
    features,
    testimonials,
    videoBaner,
    videoHolder,
    welcomeBlogs,
    // loading
  },
  data: function() {
    return {
      videoOn: false,
      // loading: true
    }
  },
  created () {
    this.$store.state.isHome = true;
  },
  computed: {
    getWelcomeProducts() {
      return this.$store.state.welcomeProducts;
    },
    isHome () {
      return this.$store.state.isHome
    }
  },
  methods: {
    updateVideoOpen (state) {
      this.videoOn = state;
    }
  },
  
};
</script>

<style lang="scss" scoped>
</style>
