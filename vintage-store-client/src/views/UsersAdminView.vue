<template>
  <main class="main-column">
    <h1>Usuários</h1>
    <LoadingModal v-if="isLoading"></LoadingModal>
    <div class="center">
      <div class="table">
        <div class="table-row col-4 table-head">
          <div class="span-cols-2">Usuário</div>
          <div>Cargo</div>
        </div>
        <ul>
          <li v-for="(user, i) in users" class="table-row col-4" :key="i">
            <div class="span-cols-2">
              <p>{{ user.name }}</p>
            </div>
            <div>
              <select
                v-if="userEdits[user.id]"
                name="role"
                id="select-role"
                v-model="userEdits[user.id]"
              >
                <option value="admin">admin</option>
                <option value="customer">cliente</option>
              </select>
              <p
                v-else
                class="small-margin bold"
                style="color: var(--dark-gray)"
              >
                {{ printableType(user.type) }}
              </p>
            </div>
            <div class="icons">
              <i @click="startEditing(user.id, user.type)" class="fa-solid fa-edit black"></i>
              <i @click="deleteUser(user.id)" class="fa-solid fa-x red"></i>
            </div>
          </li>
        </ul>
        <Button v-if="userEdits" @click="saveChanges">Salvar</Button>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

import LoadingModal from "@/components/LoadingModal.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    LoadingModal,
    Button,
  },
  data: () => ({
    isLoading: true,
    userEdits: {},
  }),
  computed: {
    isEditing() {
      return Object.keys(userEdits).length > 0;
    },
    ...mapGetters({
      "users": "userAdmin/users",
    })
  },
  created() {
    this.$store.dispatch("userAdmin/fetchUsers")
      .then(() => this.isLoading = false);
  },
  methods: {
    startEditing(id, initialType) {
      this.userEdits[id] = initialType;
    },
    async saveChanges() {
      const promises = Object.entries(this.userEdits)
        .map(([id, type]) => this.$store.dispatch("userAdmin/updateUser", { id, type }));
      this.isLoading = true;
      await Promise.all(promises);
      this.userEdits = {};
      this.isLoading = false;
    },
    async deleteUser(uid) {
      if (!confirm("Tem certeza de que gostaria de remover esse usuário?")) return;
      this.isLoading = true;
      await this.$store.dispatch("deleteUser", uid);
      this.isLoading = false;
    },
    printableType(type) {
      switch (type) {
        case "admin":    return "admin";
        case "customer": return "cliente";
        default:         return type;
      }
    }
  },
}
</script>

<style>
@import url("@/styles/table.css");
</style>