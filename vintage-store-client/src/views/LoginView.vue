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
  methods: {
    async login() {
      const res = await this.$store.dispatch("login", { email: this.email, password: this.password });
      if (res instanceof Error) {
        this.email = "";
        this.password = "";
        alert(res.message);
        return;
      }

      this.$router.replace({
        name: this.$route.query.from || 'account'
      });
    }
  }
};
</script>