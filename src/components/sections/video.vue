<template>
  <div class="video">
    <div class="overlay">
      <div class="container">
        <div class="holder">
          <h2>The Right Headphones</h2>
          <p>
            In ornare quam viverra orci sagittis. Duis ultricies lacus sed
            turpis tincidunt id aliquet risus. Arcu felis bibendum ut tristique
            et
          </p>
          <button @click="openVideoHolder()">
            <fa-icon :icon="['fas', 'play']" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "video-banner",
  data: function () {
    return {
      videoHolder: false,
    };
  },
  methods: {
    openVideoHolder() {
      this.videoHolder = true;
      this.$emit("videoTurnOn", this.videoHolder);
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.video {
  background: url("../../assets/land2.jpg") center;
  background-size: cover;
  position: relative;
  .holder {
    font-family: var(--main-font);
    padding: 150px 0;
    h2 {
      color: var(--main-color);
      font-size: 34px;
    }
    p {
      line-height: 1.7;
      color: #fff;
      width: 80%;
      margin: 40px auto;
      font-size: 19px;
    }
    button {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: rgba(252, 132, 107, 0.2);
      border: 2px solid var(--main-color);
      color: var(--main-color);
      font-size: 22px;
      backdrop-filter: blur(10px);
      position: relative;
      z-index: 12;
      &::before {
        content: "";
        position: absolute;
        top: calc(50% - ((100%) / 2));
        left: calc(50% - ((100%) / 2));
        width: calc(100%);
        height: calc(100%);
        background-color: rgba(252, 132, 107, 0.4);
        border-radius: 50%;
        z-index: -1;
        animation: videoAnimation 3s infinite ease-in-out;
      }
    }
  }
  .overlay {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
}
@keyframes videoAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.7);
  }
  100% {
    transform: scale(1);
  }
}
</style>
