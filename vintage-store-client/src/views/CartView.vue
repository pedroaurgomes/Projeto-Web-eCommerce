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
              <div>{{ item.ammount }}</div>
              <div>{{ formatPrice(item.product.price) }}</div>
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
    formatPrice(price) {
      return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    removeProduct(id) {
      this.$store.commit("removeFromCart", id);
    },
  },
};
</script>

<style>
.table {
  width: 100%;
  max-width: 1200px;
}

.table img {
  width: 100%;
}

.table .col-5 {
  display: grid;
  grid-template-columns: minmax(50px, 100px) repeat(5, 1fr);
  gap: 15px;
  padding: 0 0.5em;
  align-items: center;
  border-bottom: solid 1px var(--dark-gray);
  margin-bottom: 1em;
}

.table .span-cols-2 {
  grid-column: span 2;
}

.table .table-head {
  margin-bottom: 0.4em;
  padding-bottom: 0.4em;
  font-weight: bold;
  font-size: 1.2em;
}

.table .icons {
  justify-self: end;
  display: flex;
  flex-flow: row nowrap;
  gap: 1em;
}

.table i {
  color: var(--red);
  font-weight: bolder;
  cursor: pointer;
}
</style>
