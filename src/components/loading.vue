<template>
  <div class="loading">
    <img src="../assets/loading.gif" alt="loading.." />
  </div>
</template>

<script>
export default {
  name: "loading",
};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 1);
  z-index: 9999;
}
</style>
