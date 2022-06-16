<template>
  <TopBar :type="$store.state.userStatus"></TopBar>
  <RouterView />
  <Footer></Footer>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    TopBar,
    Footer,
  },
  data: () => ({
  }),
};
</script>

<style>
@import "@/styles/base.css";
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
</style>
