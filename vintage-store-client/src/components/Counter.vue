
<template> 
  <div class="counter">
    <button
      @click="$emit('update:modelValue', clamp(modelValue - 1))"
      style="font-weight: bold"
    > - </button>
    <input
      type="number"
      min="1"
      :max="max"
      :value="modelValue"
      @input="e => $emit('update:modelValue', clamp(e.target.value))"
      :style="{'width': `${textSize}em`}"
    >
    <button
      @click="$emit('update:modelValue', clamp(modelValue + 1))"
      style="font-weight: bold"
    > + </button>
  </div>
</template>

<script>
export default {
  props:  {
    modelValue: {
      type: Number,
      required: true,
    },
    // Prop para editar o tamanho do texto (componente deve escalar de acordo)
    textSize: {
      type: Number,
      required: false,
      default: 3,
    },
    max: {
      type: Number,
      required: true,
    }
  },
  methods: {
    clamp(val) {
      return Math.min(Math.max(val, 1), this.max);
    }
  }
};
</script>

<style>
.counter {
  border: 1.5px solid black ;
  border-radius: 50px; 
  display: flex;
  flex-direction: row;
  padding: .2em .3em;
  width: fit-content; 
}

.counter > button {
  background-color: transparent;
  border: none;
  font-size: 1em;
}

@media screen and (max-width: 500px) {
  .cart-page .counter {
    flex-direction: column;
    padding: .2em 0;
  }
}

.counter > button:hover {
  cursor: pointer;
}

.counter > input{
  border: none;
  outline: none;
  text-align: center;
}

/*Removing the arrows*/ 
.counter > input::-webkit-outer-spin-button,
.counter > input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/*Removing the arrows*/ 
.counter > input[type=number] {
  -moz-appearance: textfield;
}

</style>
