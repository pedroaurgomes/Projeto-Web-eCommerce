<template>
  <CarouselManager></CarouselManager>
  <main class="main-column">
    <LoadingModal v-if="isLoading" />
    <div>
      <TextField
        :expandTransition="true"
        name="Busca"
        label="busca"
        placeholder="Buscar..."
        iconClass="fa-solid fa-magnifying-glass"
        @submit="pushFilter()"
        v-model="search"
      ></TextField>
      <FilterList v-model="filterItems"></FilterList>
    </div>
    <div class="product-list">
      <ProductCard
        v-for="(product, i) in filteredProducts"
        :key="i"
        :title="product.title"
        :brand="product.brand"
        :price="product.price"
        :imgSrc="product.imgSrc"
        :imgB64="product.imgB64"
        @click="gotoProduct(product.id)"
      ></ProductCard>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

import ProductCard from "@/components/ProductCard.vue";
import TextField from "@/components/TextField.vue";
import FilterList from "@/components/FilterList.vue";
import LoadingModal from "@/components/LoadingModal.vue";
import CarouselManager from "@/components/CarouselManager.vue"

export default {
  components: {
    ProductCard,
    TextField,
    FilterList,
    LoadingModal,
    CarouselManager,
  },
  data: () => ({
    search: "",
    filterItems: [],
    isLoading: true,
  }),
  created() {
    (async () => {
      await this.$store.dispatch("fetchProducts");
      this.isLoading = false;
    })();
  },
  computed: {
    filteredProducts() {
      // First, filter out the products that are not in stock.
      const inStock = this.products.filter(p => p.nInStock > 0);
      if (this.filterItems.length === 0) return inStock;
      const filters = this.filterItems.map(i => i.toLowerCase());
      return inStock
        .filter(p =>
          filters.some(f => p.title.toLocaleLowerCase().indexOf(f) !== -1)
          || (filters.includes(p.brand.toLocaleLowerCase()))
          || (p.category && filters.includes(p.category.toLocaleLowerCase()))
        );
    },
    ...mapGetters([
      "products"
    ])
  },
  methods: {
    pushFilter() {
      if (this.search.length > 0) {
        this.filterItems.push(this.search);
        this.search = "";
      }
    },
    gotoProduct(id) {
      this.$router.push({
        name: "product",
        params: { id },
      });
    },
  },
};
</script>

<style>
.product-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  gap: 1em;
}

</style>
