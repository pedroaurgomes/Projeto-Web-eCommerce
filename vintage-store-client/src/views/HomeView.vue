<template>
  <Loading v-if="isLoading" />
  <template v-else>
    <section id="home-image">
      <fieldset>
        <input
          type="radio"
          id="home-image-01"
          name="home-image-carousels"
          checked
        />
        <input type="radio" id="home-image-02" name="home-image-carousels" />
        <input type="radio" id="home-image-03" name="home-image-carousels" />
      </fieldset>
    </section>
    <main class="main-column">
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
        <FilterList ref="filter"></FilterList>
      </div>
      <div class="product-list">
        <ProductCard
          v-for="(product, i) in products"
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
</template>

<script>
import { mapGetters } from "vuex";

import ProductCard from "@/components/ProductCard.vue";
import TextField from "@/components/TextField.vue";
import FilterList from "@/components/FilterList.vue";
import Loading from "@/components/Loading.vue";

export default {
  components: {
    ProductCard,
    TextField,
    FilterList,
    Loading,
  },
  data: () => ({
    search: "",
    isLoading: true,
  }),
  created() {
    (async () => {
      await this.$store.dispatch("fetchProducts");
      this.isLoading = false;
    })();
  },
  computed: {
    ...mapGetters([
      "products"
    ])
  },
  methods: {
    pushFilter() {
      if (this.search.length > 0) {
        this.$refs.filter.pushItem(this.search);
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

#home-image {
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
}
</style>
