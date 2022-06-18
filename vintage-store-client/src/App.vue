<template>
  <TopBar :role="$store.getters.userRole"></TopBar>
  <RouterView />
  <Footer></Footer>
</template>

<script>
import * as mock from "@/mock";

import TopBar from "@/components/TopBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    TopBar,
    Footer,
  },
  created() {
    if (localStorage.getItem("users") === null) {
      mock.init();
    } else {
      // If there is a current user that was already logged in, login again
      // with the same data.
      this.$store.commit("tryLoadCurrentUserFromLocalStorage");
      this.$store.commit("tryLoadCartFromLocalStorage");
    }
  }
};
</script>

<style>
@import "@/styles/base.css";
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
</style>
