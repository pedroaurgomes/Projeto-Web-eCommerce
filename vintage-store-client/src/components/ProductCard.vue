<template>
  <div class="product-card" @click="$emit('click')">
    <div class="product-image">
      <img v-if="imgSrc" :src="imgSrc" />
      <img v-else src="/assets/product_img_placeholder.png" />
    </div>
    <div class="product-data">
      <h3>{{ title }}</h3>
      <h4>{{ brand }}</h4>
      <p>{{ formattedPrice }}</p>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imgSrc: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    formattedPrice() {
      return `${this.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`;
    },
  },
};
</script>

<style>
.product-card {
  display: flex;
  flex-flow: column nowrap;
  border-radius: 10px;
  width: fit-content;
  overflow: hidden;
  transition: box-shadow var(--fast-transition-speed) ease-in;
  border: 1px var(--very-light-gray) solid;
}

.product-image {
  max-width: 400px;
}

.product-card:hover {
  box-shadow: 5px 4px 6px var(--very-light-gray);
  cursor: pointer;
}

.product-data h3,
.product-data h4,
.product-data p {
  margin: 0.3em 0;
}

.product-data {
  padding: 0 1em;
}

.product-data h4 {
  color: var(--dark-gray);
}
</style>
