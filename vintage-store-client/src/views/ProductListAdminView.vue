<template>
  <LoadingModal v-if="isLoading"></LoadingModal>
  <main class="main-column">
    <h1>Produtos</h1>
    <div class="center flex-col">
      <div class="table">
        <div class="table-row col-7 table-head">
          <div>Imagem</div>
          <div class="span-cols-2">Título</div>
          <div>Vendidos</div>
          <div>Estoque</div>
          <div>Preço</div>
        </div>
        <ul>
          <li v-for="(product, i) in products" class="table-row col-7" :key="i">
            <div>
              <img v-if="product.imgSrc" :src="product.imgSrc" />
              <img v-else src="/assets/product_img_placeholder.png" />
            </div>
            <div class="span-cols-2">
              <p class="small-margin bold">{{ product.title }}</p>
              <p class="small-margin">{{ product.description }}</p>
            </div>
            <div>{{ product.nSold }}</div>
            <div>{{ product.nInStock }}</div>
            <div>{{ formatPrice(product.price) }}</div>
            <div class="icons">
              <i @click="editProduct(product.id)" class="fa-solid fa-edit gray"></i>
              <i @click="deleteProduct(product.id)" class="fa-solid fa-x red"></i>
            </div>
          </li>
        </ul>
        <Button @click="addProduct">Novo Produto</Button>
      </div>
    </div>
  </main>
</template>

<script>

import { mapGetters } from 'vuex';

import { formatPrice } from '@/utils';

import LoadingModal from "@/components/LoadingModal.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    LoadingModal,
    Button,
  },
  data: () => ({
    isLoading: true,
  }),
  computed: {
    ...mapGetters({
      "products": "products",
    })
  },
  created() {
    this.$store.dispatch("fetchProducts")
      .then(() => this.isLoading = false);
  },
  methods: {
    formatPrice,
    async deleteProduct(id) {
      if (!confirm("Tem certeza de que gostaria de remover esse item?")) return;

      this.isLoading = true;
      await this.$store.dispatch("deleteProduct", id);
      this.isLoading = false;
    },
    editProduct(id) {
      this.$router.push({
        name: "editProduct",
        params: { id }
      })
    },
    addProduct() {
      this.$router.push({ name: "addProduct" });
    }
  }
}
</script>

<style>
@import url("@/styles/table.css");
</style>