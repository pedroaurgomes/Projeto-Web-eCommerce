<template>
  <Loading v-if="isLoading" />
  <main v-else class="main-column">
    <h2>Cadastro</h2>

    <div class="container">
      <div class="register-form-col">
        <TextField
          label="name"
          v-model="name"
          placeholder="Nome"
        />
        <TextField
          label="id"
          v-model="id"
          placeholder="CPF"
        />
        <TextField
          label="email"
          v-model="email"
          placeholder="Email"
        />
        <TextField
          label="phone"
          v-model="phone"
          placeholder="Telefone"
        />
        <TextField
          label="address"
          v-model="address"
          placeholder="Endereço"
        />
        <div class="flex-row flex-space-between">
          <TextField
            label="city"
            v-model="city"
            placeholder="Cidade"
          />
          <TextField
            label="extra"
            v-model="extra"
            placeholder="Complemento"
          />
        </div>
        <TextField
          label="password"
          v-model="password"
          placeholder="Senha"
        />
        <Button @click="submit">Cadastrar</Button>
      </div>
      <div>
        /* Desenho do sene */
      </div>
    </div>
  </main>
</template>
<script>
import { fetchDelay } from "@/mock/utils";

import TextField from "@/components/TextField.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    TextField,
    Button
  },
  data: () => ({
    name: "",
    id: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    extra: "",
    password: "",
    isLoading: false,
  }),
  methods: {
    async submit() {
      // TODO: data validation
      this.isLoading = true;
      await this.sendRegistration();

      // Go back to the previous page
      this.$router.back();
    },
    async sendRegistration() {
      await fetchDelay();
      this.$router.commit("registerUser", {
        name: this.name,
        id: this.id,
        email: this.email,
        phone: this.phone,
        address: this.address,
        city: this.city,
        extra: this.extra,
        password: this.password,
      });
    }
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
}

.register-form-col {
  display: flex;
  flex-flow: column nowrap;
  gap: 1em;
}

.register-form-col > * {
  width: 100%;
}
</style>