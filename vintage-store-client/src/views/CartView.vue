<template>
  <main class="main-column cart-page">
    <LoadingModal v-if="isLoading"></LoadingModal>
    <h1>Carrinho</h1>
    <div class="center flex-col">
      <div class="table">
        <div class="table-row col-7 table-head">
          <div class="cart-image-col">Imagem</div>
          <div class="cart-title-col">Título</div>
          <div>Cor</div>
          <div>Qtd.</div>
          <div>Preço</div>
        </div>
        <ul v-if="cartItems.length > 0">
          <li v-for="(item, i) in cartItems" class="table-row col-7" :key="i">
            <template v-if="item.product">
              <div class="cart-image-col">
                <img v-if="item.product.imgB64" :src="item.product.imgB64" />
                <img v-else-if="item.product.imgSrc" :src="item.product.imgSrc" />
                <img v-else src="/assets/product_img_placeholder.png" />
              </div>
              <div class="cart-title-col">
                <p class="small-margin bold">{{ item.product.title }}</p>
                <p class="small-margin">{{ item.product.description }}</p>
              </div>
              <div>{{ item.color }}</div>
              <Counter
                :textSize="1"
                :modelValue="item.quantity"
                :max="item.product.nInStock"
                @update:modelValue="quantity => $store.commit('updateCartItem', { idx: i, quantity })"
              ></Counter>
              <div>{{ formatPrice(item.quantity * item.product.price) }}</div>
              <div class="icons">
                <i @click="removeProduct(item.productId)" class="fa-solid fa-x red"></i>
              </div>
            </template>
            <div v-else class="col-5">
              Loading...
            </div>
          </li>
        </ul>
        <p v-else>Nenhum item no carrinho ainda...</p>
        <div class="flex-row flex-space-between flex-wrap gap-md">
          <div class="flex-col gap-sm">
            <fieldset class="flex-row gap-sm">
              <legend>Informações para a entrega</legend>
              <TextField
                label="zip-code"
                name="CEP"
                placeholder="CEP"
                :width="10"
                v-model="zipCode"
              />
              <Button
                type="outlined"
                size="sm"
                color="dark-gray"
                class="flex-center"
                @click="calculateShippingCost"
                >Calcular</Button>
            </fieldset>
            <fieldset class="flex-col gap-sm">
              <legend>Método de pagamento</legend>

              <div class="flex-col gap-sm">
                <div class="flex-row">
                  <input type="radio" name="paymentMethod" id="pm-credit" value="credit-card" v-model="paymentMethod">
                  <label for="pm-credit">Cartão de crédito</label>
                </div>

                <div class="flex-row">
                  <input type="radio" name="paymentMethod" id="pm-debit"  value="debit-card"  v-model="paymentMethod">
                  <label for="pm-debit">Cartão de débito</label>
                </div>
              </div>

              <TextField
                label="card-number"
                name="Número do cartão"
                placeholder="Número do cartão"
                :width="20"
                v-model="cardNumber"
              />

              <TextField
                label="name-in-cart"
                name="Nome no cartão"
                placeholder="Nome no cartão"
                :width="20"
                v-model="nameInCard"
              />

              <TextField
                label="zip-code"
                name="CCV"
                :width="3"
                placeholder="CCV"
                v-model="ccv"
              />
            </fieldset>
          </div>
          <div class="flex-col gap-sm price-info">
            <p>Frete: {{ shippingCost ? formatPrice(shippingCost) : 'pressione "calcular"' }}</p>
            <TextField
              label="zip-code"
              unnamed
              :modelValue="`Total: ${formatPrice(totalCost)}${!shippingCost ? ' + frete' : ''}`"
            />
            <Button size="lg" @click="submit">Finalizar</Button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

import { formatPrice } from "@/utils";

import TextField from "@/components/TextField.vue";
import Button from "@/components/Button.vue";
import Counter from "@/components/Counter.vue";
import LoadingModal from "@/components/LoadingModal.vue";
import { Role } from "@/roles";

export default {
  components: {
    TextField,
    Button,
    Counter,
    LoadingModal,
  },
  data: () => ({
    zipCode: "",
    paymentMethod: "credit-card",
    cardNumber: "",
    nameInCard: "",
    ccv: "",
    shippingCost: null,
    isLoading: false,
  }),
  created() {
    for (const item of this.cartItems) {
      if (!item.product) {
        this.$store.dispatch("fetchProduct", item.productId);
      }
    }
  },
  computed: {
    totalCost() {
      const shipping = this.shippingCost || 0;
      let sum = this.cartItems
        .filter(item => !!item.product)
        .reduce((acc, item) => acc + item.product.price*item.quantity, 0);
      return shipping + sum;
    },
    ...mapGetters([
      "cartItems",
    ])
  },
  methods: {
    formatPrice,
    removeProduct(id) {
      this.$store.commit("removeFromCart", id);
    },
    validateZipCode() {
      if (!this.zipCode) {
        alert("Pro favor insira o CEP");
        return false;
      }

      const isZipCodeValid = /^\d{5}-\d{3}$/.test(this.zipCode);
      if (!isZipCodeValid) {
        alert("CEP precisa seguir formato XXXXX-XXX");
        return false;
      }

      return true;
    },
    validateCardInfo() {
      if (!this.cardNumber) {
        alert("Insira o número de cartão");
        return false;
      }

      if (!this.nameInCard) {
        alert("Insira um nome do cartão");
        return false;
      }

      if (!this.ccv) {
        alert("Insira um código de segurança");
        return false;
      }

      return true;
    },
    async submit() {
      if (!this.validateZipCode()) return;
      if (!this.validateCardInfo()) return;

      if (this.$store.getters.userRole !== Role.Customer) {
        alert("Por favor, faça login antes de realizar uma compra");
        this.$router.push({
          name: "login",
          query: { from: this.$route.name },
        });
        return;
      }

      this.isLoading = true;
      await this.$store.dispatch("purchase");
      this.isLoading = false;
      alert("Compra concluida com sucesso!");
      this.$router.push({ name: "home" });
    },
    calculateShippingCost() {
      if (!this.validateZipCode()) return;
      // Very simple way of producing a cost that is kind of random and determined
      // by the zip code.
      let hash = 0;
      for (let i = 0; i < this.zipCode.length; i++) {
        hash += Math.pow(10, i) * this.zipCode.charCodeAt(i);
        hash += this.zipCode.charCodeAt(i);
        hash %= 100;
      }
      this.shippingCost = hash;
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

.table .cart-title-col {
  grid-column: span 2;
}

@media screen and (max-width: 500px) {
  .table .cart-title-col {
    grid-column: span 3;
  }

  .table .cart-image-col {
    display: none;
  }
}
</style>
