<template>
  <TopBar :role="$store.getters.userRole"></TopBar>
  <RouterView />
  <Footer></Footer>
</template>

<script>
import * as mock from "@/mock";

import { Error as RouterError } from "@/router/errors";

import TopBar from "@/components/TopBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    TopBar,
    Footer,
  },
  data: () => ({
    unsubscribeMutation: null,
  }),
  created() {
    if (localStorage.getItem("users") === null) {
      mock.init();
    } else {
      // If there is a current user that was already logged in, login again
      // with the same data.
      this.$store.commit("tryLoadCurrentUserFromLocalStorage");
      this.$store.commit("tryLoadCartFromLocalStorage");
    }

    this.unsubscribeMutation = this.$store.subscribe(mutation => {
      if (mutation.type === "navigationError") {
        switch (mutation.payload) {
          case RouterError.NotLoggedIn:
            alert("Para acessar essa página é necessário fazer login. Você será redirecionado para a página de login.");
            break;

          case RouterError.Unauthorized:
            alert("Você não possui permissão para acessar essa página.");
            break;

          default: break;
        }
      }
    });
  },
  beforeUnmount() {
    if (this.unsubscribeMutation) this.unsubscribeMutation();
  }
};
</script>

<style>
@import "@/styles/base.css";
@import "@/styles/utils.css";
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
</style>
