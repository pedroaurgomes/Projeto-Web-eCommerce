<template>
  <Loading v-if="isLoading"/>
  <main v-else class="main-column">
    <div class="flex-row flex-wrap gap-md product-description">
      <img v-if="imgSrc" :src="imgSrc" class="product-image" />
      <img v-else src="/assets/product_img_placeholder.png" class="product-image" />
      <div class="flex-col gap-sm product-data">
        <h3 class="no-margin">{{ title }}</h3>
        <h4 class="no-margin">{{ brand }}</h4>
        <p class="small-margin">{{ description }}</p>
        <select v-model="selectedColor">
          <option v-for="(color, i) in colors" :key="i" :value="i">{{ color }}</option>
        </select>
        <Counter v-model="quantity"></Counter>
        <p class="no-margin">Total: {{ formatPrice(price * quantity) }}</p>
        <p class="no-margin">Unitário: {{ formatPrice(price) }} ({{ quantity }}x)</p>
        <Button @click="addToCart">Comprar</Button>
      </div>
    </div>
    <div>
      <h2>Detalhes do produto</h2>
      <p>{{longDescription}}</p>
    </div>
    <br>
  </main>
</template>

<script>
import { formatPrice } from "@/utils";

import Button from "@/components/Button.vue";
import Counter from "@/components/Counter.vue";
import Loading from "@/components/Loading.vue";

export default {
  components: {
    Button,
    Loading,
    Counter,
  },
  data: () => ({
    isLoading: true,
    title: null,
    brand: null,
    description: null,
    price: null,
    imgSrc: null,
    longDescription: null,
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
      this.$router.push({ name: "cart" });
    },
    async fetchProduct() {
      const product = await this.$store.dispatch("fetchOrGetProduct", this.id);
      this.title = product.title;
      this.brand = product.brand;
      this.description = product.description;
      this.price = product.price;
      this.imgSrc = product.imgSrc;
      this.colors = product.colors;
      this.longDescription = product.longDescription;
      this.selectedColor = product.defaultColor;
    }
  }
}
</script>

<style scoped>
.product-image {
  width: 500px;
}

.product-description {
  justify-content: center;
}

.product-data {
  flex: 1 1 auto;
  max-width: 500px;
}
</style>