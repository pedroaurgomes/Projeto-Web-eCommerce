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
        <div v-for="(product, i) in products" class="col-5" :key="i">
          <div>
            <img v-if="product.imgSrc" :src="product.imgSrc" />
            <img v-else src="@/assets/product_img_placeholder.png" />
          </div>
          <div class="span-cols-2">
            <p class="small-margin bold">{{ product.title }}</p>
            <p class="small-margin">{{ product.description }}</p>
          </div>
          <div>{{ product.ammount }}</div>
          <div>{{ formatPrice(product.price) }}</div>
          <div class="icons">
            <i @click="removeProduct(i)" class="fa-solid fa-x"></i>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data: () => ({
    products: [
      {
        title: "Produto 1",
        description: "Descrição aqui...",
        ammount: 10,
        price: 10,
        imgSrc: null,
      },
      {
        title: "Produto 2",
        description: "Descrição aqui...",
        ammount: 10,
        price: 10,
        imgSrc: null,
      },
    ],
  }),
  methods: {
    formatPrice(price) {
      return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    removeProduct(i) {
      this.products.splice(i, 1);
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
