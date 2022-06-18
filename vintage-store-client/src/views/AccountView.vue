<template>
  <main class="main-column">
    <h2>Minha Conta</h2>
    <LoadingModal v-if="isLoading"></LoadingModal>
    <div class="grid-2-cols">
      <div class="flex-col gap-sm">
        <TextField
          label="name"
          name="Nome"
          v-model="name"
          placeholder="..."
        />
        <TextField
          label="email"
          name="Email"
          v-model="email"
          placeholder="..."
        />
        <TextField
          label="address"
          name="Endereço"
          v-model="address"
          placeholder="..."
        />
        <div class="flex-row flex-space-between">
          <TextField
            label="city"
            name="Cidade"
            v-model="city"
            placeholder="..."
          />
          <TextField
            label="extra"
            name="Complemento"
            v-model="extra"
            placeholder="..."
          />
        </div>
        <TextField
          label="phone"
          name="Telefone"
          v-model="phone"
          placeholder="..."
        />
        <div class="flex-row flex-space-between">
          <Button color="blue" @click="update">Salvar</Button>
          <Button color="red" @click="logout">Sair</Button>
        </div>
      </div>
      <div>
        /* Imagem do sene */
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

    // TODO: make some visual loading bar.
    isLoading: false,
  }),
  created() {
    const user = this.$store.getters.user
    this.name = user.name;
    this.email = user.email;
    this.address = user.address;
    this.city = user.city;
    this.extra = user.extra;
    this.phone = user.phone;
  },
  methods: {
    update() {
      // TODO: Data validation.
      trueWhileAction(
        b => this.isLoading = b,
        this.$store.dispatch("updateUser", {
          name: this.name,
          email: this.email,
          address: this.address,
          city: this.city,
          extra: this.extra,
          phone: this.phone
        })
      )
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