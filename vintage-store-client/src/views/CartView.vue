<template>
  <main class="main-column">
    <h1>Carrinho</h1>
    <div class="center">
      <div class="table">
        <div class="col-5 table-head">
          <div>Imagem</div>
          <div class="span-cols-2">Título</div>
          <div>Qtd.</div>
          <div>Preço</div>
        </div>
        <template v-if="cartItems.length > 0">
          <div v-for="(item, i) in cartItems" class="col-5" :key="i">
            <template v-if="item.product">
              <div>
                <img v-if="item.product.imgSrc" :src="item.product.imgSrc" />
                <img v-else src="/assets/product_img_placeholder.png" />
              </div>
              <div class="span-cols-2">
                <p class="small-margin bold">{{ item.product.title }}</p>
                <p class="small-margin">{{ item.product.description }}</p>
              </div>
              <div>{{ item.quantity }}</div>
              <div>{{ formatPrice(item.quantity * item.product.price) }}</div>
              <div class="icons">
                <i @click="removeProduct(item.productId)" class="fa-solid fa-x"></i>
              </div>
            </template>
            <div v-else class="col-5">
              Loading...
            </div>
          </div>
        </template>
        <p v-else>Nenhum item no carrinho ainda...</p>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

import { formatPrice } from "@/utils";

export default {
  data: () => ({}),
  created() {
    for (const item of this.cartItems) {
      if (!item.products) {
        this.$store.dispatch("fetchProduct", item.productId);
      }
    }
  },
  computed: {
    ...mapGetters([
      "cartItems",
    ])
  },
  methods: {
    formatPrice,
    removeProduct(id) {
      this.$store.commit("removeFromCart", id);
    },
  },
};
</script>

<style>
@import url("@/styles/table.css");

.price-info {
  font-size: 1.3em;
}

.price-info p {
  margin: 0;
}
</style>
