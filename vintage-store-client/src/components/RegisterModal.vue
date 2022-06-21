<template>
  <Modal>
    <h2>Cadastrar</h2>

    <div class="register-input-col">
      <TextField
        label="name"
        v-model="name"
        name="Nome"
        placeholder="Nome"
        :width="inputWidth"
      />
      <TextField
        label="id"
        v-model="id"
        name="CPF"
        placeholder="CPF"
        :width="inputWidth"
      />
      <TextField
        label="email"
        v-model="email"
        name="Email"
        placeholder="Email"
        :width="inputWidth"
      />
      <TextField
        label="phone"
        v-model="phone"
        name="Telefone"
        type="tel"
        placeholder="Telefone"
        :width="inputWidth"
      />
      <TextField
        label="address"
        v-model="address"
        name="Endereço"
        placeholder="Endereço"
        :width="inputWidth"
      />
      <div class="flex-row flex-space-between">
        <TextField
          label="city"
          v-model="city"
          name="Cidade"
          placeholder="Cidade"
          :width="inputWidth / 2"
        />
        <TextField
          label="extra"
          v-model="extra"
          name="Complemento"
          placeholder="Complemento"
          :width="inputWidth / 2 - 2"
        />
      </div>
      <TextField
        type="password"
        label="password"
        v-model="password"
        name="Senha"
        placeholder="Senha"
        :width="inputWidth"
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
    inputWidth: 25,
  }),
  methods: {
    validateEmail() {
      return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email);
    },
    async submit() {
      if (!this.name) {
        alert("Nome precisa ser preenchido");
        return;
      }

      if (!this.validateEmail()) {
        alert("Email não está no formato esperado");
        return;
      }

      if (!this.address) {
        alert("Endereço precisa ser preenchido");
        return;
      }

      if (!this.city) {
        alert("Cidade precisa ser preenchida");
        return;
      }

      if (!/^[0-9]+$/.test(this.phone)) {
        alert("Telefone precisa ser preenchido e somente caracteres numericos");
        return;
      }

      this.isLoading = true;
      await this.sendRegistration();
      this.isLoading = false;
    },
    async sendRegistration() {
      const res = await this.$store.dispatch("currentUser/register", {
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