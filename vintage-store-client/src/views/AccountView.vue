<template>
  <main class="main-column">
    <h2>Minha Conta</h2>
    <LoadingModal v-if="isLoading"></LoadingModal>
    <div class="flex-col gap-sm">
      <TextField
        label="name"
        name="Nome"
        v-model="name"
        :width="inputWidth"
        placeholder="..."
      />
      <TextField
        label="email"
        name="Email"
        v-model="email"
        :width="inputWidth"
        placeholder="..."
      />
      <TextField
        label="address"
        name="Endereço"
        v-model="address"
        :width="inputWidth"
        placeholder="..."
      />
      <div class="flex-row">
        <TextField
          label="city"
          name="Cidade"
          v-model="city"
          :width="inputWidth / 2"
          placeholder="..."
        />
        <TextField
          label="extra"
          name="Complemento"
          v-model="extra"
          :width="inputWidth / 2 - 2"
          placeholder="..."
        />
      </div>
      <TextField
        label="phone"
        name="Telefone"
        v-model="phone"
        :width="inputWidth"
        placeholder="..."
      />
      <div class="flex-row gap-sm">
        <Button color="blue" @click="update">Salvar</Button>
        <Button color="red" @click="logout">Sair</Button>
      </div>
    </div>
  </main>
</template>
<script>
import { trueWhileAction } from "@/utils";

import TextField from "@/components/TextField.vue";
import Button from "@/components/Button.vue";
import LoadingModal from "@/components/LoadingModal.vue";

export default {
  components: {
    TextField,
    Button,
    LoadingModal,
  },
  data: () => ({
    name: "",
    email: "",
    address: "",
    city: "",
    extra: "",
    phone: "",
    isLoading: false,
    inputWidth: 25,
  }),
  created() {
    const user = this.$store.getters["currentUser/get"];
    // DUVIDA: por que não pegamos o id do user aqui ? this.id = user.id , para podermos usar o id 
    // depois para darmos fetch -> RESOLVIDO
 
    this.name = user.name;
    this.email = user.email;
    this.address = user.address;
    this.city = user.city;
    this.extra = user.extra;
    this.phone = user.phone;
  },
  methods: {
    validateEmail() {
      return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email);
    },
    update() {
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

      trueWhileAction(
        b => this.isLoading = b,
        this.$store.dispatch("currentUser/update", {
          name: this.name,
          email: this.email,
          address: this.address,
          city: this.city,
          extra: this.extra,
          phone: this.phone
        })
      );
    },
    async logout() {
      await trueWhileAction(
        b => this.isLoading = b,
        this.$store.dispatch("logout")
      );
      this.$router.replace({ name: "home" });
    }
  }
}
</script>
