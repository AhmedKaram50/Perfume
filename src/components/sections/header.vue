<template>
  <header>
    <carousel
      :items="1"
      :loop="false"
      :dots="false"
      :autoWidth="false"
      :nav="false"
      :autoplay="true"
      :autoplayTimeout="4000"
    >
      <div class="one">
        <div class="slide">
          <span>Be Alegant</span>
          <h2>Put That Perfume and make Girls Run at You.</h2>
          <p>
            Experience the decibels like your ears deserve to. Safe for the
            ears, good for the heart. A treat to your ears.
          </p>
          <button class="main-btn">Shop Now</button>
        </div>
      </div>
      <div class="two">
        <div class="slide">
          <span>Confidence</span>
          <h2>Brains are Dumb It Follows The Best Smell</h2>
          <p>
            Experience the decibels like your ears deserve to. Safe for the
            ears, good for the heart. A treat to your ears.
          </p>
          <button class="main-btn">Shop Now</button>
        </div>
      </div>
      <div class="three">
        <div class="slide">
          <span>Came From Heaven</span>
          <h2>Make Your smell like Heaven.</h2>
          <p>
            Experience the decibels like your ears deserve to. Safe for the
            ears, good for the heart. A treat to your ears.
          </p>
          <button class="main-btn">Shop Now</button>
        </div>
      </div>
    </carousel>
  </header>
</template>

<script>
import carousel from "vue-owl-carousel";

export default {
  name: "welcome",
  components: {
    carousel,
  },
};
</script>

<style lang="scss" scoped>
header {
  text-align: left;
  .slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 65%;
    height: 100vh;
    padding: 0 100px;
    color: var(--second-color);
    span {
      font-size: 18px;
      font-family: var(--main-font);
      position: relative;
      width: fit-content;
      &::before {
        content: "";
        position: absolute;
        top: 60%;
        right: -60px;
        width: 50px;
        height: 1px;
        background: var(--main-color);
      }
    }
    h2 {
      color: var(--main-color);
      font-weight: bold;
      margin: 10px 0 25px 0;
      font-size: 50px;
      font-family: var(--main-font);
    }
    p {
      font-family: var(--main-font);
      font-size: 17px;
      margin: 0 0 30px 0;
      font-weight: 300;
    }
  }
  .one {
    background: url("../../assets/slide1.png") center;
    background-size: cover;
  }
  .two {
    background: url("../../assets/slider2.png") center;
    background-size: cover;
  }
  .three {
    background: url("../../assets/slider3.png") center;
    background-size: cover;
  }
}

@media (max-width: 576px) {
  header {
    .slide {
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;
      h2 {
        font-size: 32px;
      }
    }
  }
}
</style>
