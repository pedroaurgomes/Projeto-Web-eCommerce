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

/* #home-image {
  background-color: var(--green);
  width: 100%;
  height: 60vh;
  margin-bottom: 1em;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: center;
}

#home-image > fieldset {
  border: none;
}

#home-image > fieldset > input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  width: 1em;
  height: 1em;
  padding: 0.1em;
  border: 0.2em solid var(--white);
  background-color: var(--white);
  border-radius: 50%;
}

#home-image > fieldset > input[type="radio"]:checked {
  background-color: var(--dark-gray);
} */
</style>
