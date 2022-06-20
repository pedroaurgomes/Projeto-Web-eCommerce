<template>
  <main class="main-column">
    <div>
      <h1 class="center-text">Login</h1>
    </div>
    <div class="center-column">
      <TextField
        label="email"
        name="Email"
        placeholder="Email..."
        v-model="email"
      ></TextField>
      <TextField
        type="password"
        label="senha"
        name="Senha"
        placeholder="Senha..."
        v-model="password"
        @submit="login"
      ></TextField>
      <br>
      <Button @click="login">Login</Button>
    </div>
    <div class="center">
      <p>
        Não possui conta?
        <a href="#" @click="showRegisterModal = true">Cadastre-se agora!</a>
      </p>
    </div>
    <RegisterModal v-if="showRegisterModal" @clickOutside="showRegisterModal = false"/>
  </main>
</template>
<script>
import TextField from "@/components/TextField.vue";
import Button from "@/components/Button.vue";
import RegisterModal from "@/components/RegisterModal.vue";

export default {
  components: {
    TextField,
    Button,
    RegisterModal,
  },
  data: () => ({
    email: "",
    password: "",
    showRegisterModal: false,
  }),
  computed: {
    fromRoute() { return this.$route.query.from; }
  },
  methods: {
    async login() {
      const res = await this.$store.dispatch("login", { email: this.email, password: this.password });
      if (res instanceof Error) {
        this.email = "";
        this.password = "";
        alert(res.message);
        return;
      }

      // By default we redirect the user to the 'account' page. However, if the user got here
      // through a redirect and set the 'from' query, then redirect it to that page. This
      // may introduce a bug, where if the 'from' query parameter is the login page itself,
      // the logged in user can't redirect to that because it no longer has access to the page.
      // So in that case, just use the default 'account' redirect.
      let name = 'account';
      if (this.fromRoute && this.fromRoute != 'login')
        name = this.fromRoute;

      this.$router.replace({ name });
    }
  }
};
</script>