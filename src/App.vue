<template>
  <div id="app">
    <!-- <nav-bar @topClickCallBack="topClickCallBack" /> -->
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <router-view />
    <!-- </transition> -->
  </div>
</template>

<script>
import NavBar from "./components/top/top.vue";
export default {
  name: "App",
  components: { NavBar },
  methods: {
    topClickCallBack(val, route) {
      this.currentPart = val;
      this.$router.push(route);
    },
  },
};
</script>
<style scoped>
#app {
  overflow: hidden;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
