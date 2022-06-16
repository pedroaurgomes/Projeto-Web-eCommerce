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
        label="senha"
        name="Senha"
        placeholder="Senha..."
        v-model="password"
      ></TextField>
      <Button @click="login">Login</Button>
    </div>
    <div class="center">
      <p>
        Não possui conta?
        <router-link to="register">Cadastre-se agora!</router-link>
      </p>
    </div>
  </main>
</template>
<script>
import TextField from "@/components/TextField.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    TextField,
    Button,
  },
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    async login() {
      const res = await this.$store.dispatch("login", { email: this.email, password: this.password });
      if (res instanceof Error) {
        this.email = "";
        this.password = "";
        alert(res.message);
        return;
      }

      this.$router.back();
    }
  }
};
</script>
