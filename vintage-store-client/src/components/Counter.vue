
<template> 
  <div class="counter">
    <button
      @click="$emit('update:modelValue', modelValue + 1)"
      style="font-weight: bold"
    > + </button>
    <input
      type="number"
      min="1"
      :value="modelValue"
      @input="e => $emit('update:modelValue', e.target.value)"
      :style="{'width': `${textSize}em`}"
    >
    <button
      @click="$emit('update:modelValue', Math.max(modelValue - 1, 1))"
      style="font-weight: bold"
    > - </button>
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
    }
  },
  methods: { 
    increment() {
      this.count++;
      // emit the event: "Input"
    },
    decrement() {
      if (this.count > 1){
        this.count--;
      }
      // emit the event: "Input"
    },
  }
};
</script>

<style>
.counter {
  border: 1.5px solid black ;
  border-radius: 50px; 
  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
  padding: 3px 5px;
  width: fit-content; 
}

.counter > button{
  background-color: white;
  border: none;
  font-size: 1em;
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