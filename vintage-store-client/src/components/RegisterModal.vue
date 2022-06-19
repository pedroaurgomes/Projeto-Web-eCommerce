<template>
  <Modal>
    <h2>Cadastrar</h2>

    <div class="register-input-col">
      <TextField
        label="name"
        v-model="name"
        name="Nome"
        placeholder="Nome"
      />
      <TextField
        label="id"
        v-model="id"
        name="CPF"
        placeholder="CPF"
      />
      <TextField
        label="email"
        v-model="email"
        name="Email"
        placeholder="Email"
      />
      <TextField
        label="phone"
        v-model="phone"
        name="Telefone"
        placeholder="Telefone"
      />
      <TextField
        label="address"
        v-model="address"
        name="Endereço"
        placeholder="Endereço"
      />
      <div class="flex-row flex-space-between">
        <TextField
          label="city"
          v-model="city"
          name="Cidade"
          placeholder="Cidade"
        />
        <TextField
          label="extra"
          v-model="extra"
          name="Complemento"
          placeholder="Complemento"
        />
      </div>
      <TextField
        type="password"
        label="password"
        v-model="password"
        name="Senha"
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
      if((/^[a-zA-Z\s]*$/.test(this.name))
      && (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email))
      && (/^[a-zA-Z\s0-9.,]*$/.test(this.address))
      && (/^[a-zA-Z\s]*$/.test(this.city))
      && (/^[a-zA-Z\s]*$/.test(this.extra))
      && (/^[0-9]*$/.test(this.phone))){
        this.isLoading = true;
        await this.sendRegistration();
        this.isLoading = false;
      }else{
        alert("Dados Inconsistentes!");
      }
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