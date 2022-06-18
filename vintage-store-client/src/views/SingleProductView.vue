<template>
  <Loading v-if="isLoading"/>
  <main v-else class="main-column">
    <div class="flex-row gap-sm">
      <img src="/assets/product_img_placeholder.png" />
      <div class="flex-col">
        <h3>{{ title }}</h3>
        <h4>{{ brand }}</h4>
        <p>{{ description }}</p>
        <select v-model="selectedColor">
          <option v-for="(color, i) in colors" :key="i" :value="i">{{ color }}</option>
        </select>
        <input label="quantity" type="number" v-model="quantity" min="1">
        <p>Total: {{ formatPrice(price * quantity) }}</p>
        <p>Unitário: {{ formatPrice(price) }} ({{ quantity }}x)</p>
        <Button @click="addToCart">Comprar</Button>
      </div>
    </div>
    <div>
      <h2>Detalhes do produto</h2>
      <p>Detalhação extensa...</p>
    </div>
  </main>
</template>

<script>
import { formatPrice } from "@/utils";

import Button from "@/components/Button.vue";
import Loading from "@/components/Loading.vue";

export default {
  components: {
    Button,
    Loading,
  },
  data: () => ({
    isLoading: true,
    title: null,
    brand: null,
    description: null,
    price: null,
    colors: [],

    // Inputs that can be changed by the user.
    selectedColor: null,
    quantity: 1,
  }),
  created() {
    (async () => {
      await this.fetchProduct();
      this.isLoading = false;
    })();
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    },
  },
  methods: {
    formatPrice,
    addToCart() {
      this.$store.commit("addToCart", {
        productId: this.id,
        color: this.colors[this.selectedColor],
        quantity: this.quantity,
      });
      this.$router.replace({
        name: "cart"
      })
    },
    async fetchProduct() {
      const product = await this.$store.dispatch("fetchOrGetProduct", this.id);
      this.title = product.title;
      this.brand = product.brand;
      this.description = product.description;
      this.price = product.price;
      this.colors = product.colors;
      this.selectedColor = product.defaultColor;
    }
  }
}
</script>

<style>

</style>