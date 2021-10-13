<template>
  <div class="video-holder" v-on:click="closeVideo()">
    <iframe id="video_player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen="" 
      :src="`${this.vidSrc}?start=${this.startAt}&amp;autoplay=1&amp;showinfo=0`">
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'vide-holder',
  props: {
    vidSrc: {default: "a"},
    startAt: {default: 0}
  },
  methods: {
    closeVideo() {
      this.$parent.videoOn = false
    }
  }
}
</script>

<style>
.video-holder{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 999;
}

.video-holder iframe{
  width: 60%;
  margin: 0 auto;
  height: 420px
}
</style>