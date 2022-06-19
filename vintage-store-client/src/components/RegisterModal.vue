<template>
  <Modal>
    <h2>Cadastrar</h2>

    <div class="register-input-col">
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
    </div>
    <br>
    <Button @click="submit">Cadastrar</Button>
  </Modal>
</template>
<script>
import TextField from "@/components/TextField.vue";
import Button from "@/components/Button.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    TextField,
    Button,
    Modal,
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
      this.isLoading = false;
    },
    async sendRegistration() {
      const res = await this.$store.dispatch("registerUser", {
        name: this.name,
        id: this.id,
        email: this.email,
        phone: this.phone,
        address: this.address,
        city: this.city,
        extra: this.extra,
        password: this.password,
        type: "customer",
      });

      if (res instanceof Error) {
        alert(`Erro na registração: ${res.message}`);
        return;
      }

      this.$router.push({ name: "account" });
    }
  }
}
</script>
<style>
.register-input-col {
  display: flex;
  flex-direction: column;
  gap: .8em;
}

.register-input-col > * {
  width: 100%;
}
</style>