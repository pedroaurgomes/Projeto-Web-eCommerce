<template>
  <main class="main-column">
    <h1>Carrinho</h1>
    <div class="center flex-col">
      <div class="table">
        <div class="table-row col-7 table-head">
          <div>Imagem</div>
          <div class="span-cols-2">Título</div>
          <div>Cor</div>
          <div>Qtd.</div>
          <div>Preço</div>
        </div>
        <ul v-if="cartItems.length > 0">
          <li v-for="(item, i) in cartItems" class="table-row col-7" :key="i">
            <template v-if="item.product">
              <div>
                <img v-if="item.product.imgSrc" :src="item.product.imgSrc" />
                <img v-else src="/assets/product_img_placeholder.png" />
              </div>
              <div class="span-cols-2">
                <p class="small-margin bold">{{ item.product.title }}</p>
                <p class="small-margin">{{ item.product.description }}</p>
              </div>
              <div>{{ item.color }}</div>
              <!-- <div>{{ item.quantity }}</div> -->
              <Counter :textSize="2" isMutable="true"></Counter>
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
        <div class="flex-row flex-space-between">
          <div class="flex-col gap-sm">
            <fieldset class="flex-row gap-sm">
              <legend>Informações para a entrega</legend>
              <TextField
                label="zip-code"
                name="CEP"
                placeholder="CEP"
                v-model="zipCode"
              />
              <Button type="outlined" size="sm" color="dark-gray" class="flex-center">Calcular</Button>
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
                label="zip-code"
                name="Número do cartão"
                placeholder="Número do cartão"
                :width="32"
                v-model="cardNumber"
              />

              <TextField
                label="zip-code"
                name="Nome no cartão"
                placeholder="Nome no cartão"
                :width="32"
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

export default {
  components: {
    TextField,
    Button,
    Counter,
  },
  data: () => ({
    zipCode: "",
    paymentMethod: "credit-card",
    cardNumber: "",
    nameInCard: "",
    ccv: "",
    shippingCost: null,
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
    submit() {
      // TODO: form validation

      alert("Compra concluida com sucesso!");
      this.$store.commit("clearCart");
      this.$router.push({ name: "home" });
    }
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
