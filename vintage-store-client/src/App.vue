<template>
  <TopBar :type="userType"></TopBar>
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
    userType: "newcomer",
  }),
};
</script>

<style>
@import "@/assets/base.css";
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
</style>
