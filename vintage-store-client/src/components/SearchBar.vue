<template>
  <fieldset class="material-input">
    <input
      type="text"
      :placeholder="placeholder"
      label="search"
      :value="modelValue"
      @input="emitInputEvent"
      @keydown.enter="emitSubmitEvent"
    />
    <i class="fa-solid fa-magnifying-glass" @click="emitSubmitEvent"></i>
  </fieldset>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "Buscar...",
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  data: () => ({}),
  methods: {
    emitInputEvent(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    emitSubmitEvent() {
      this.$emit("submit", this.modelValue);
    },
  },
};
</script>
<style>
.material-input {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  border: 2px solid var(--dark-gray);
  transition: border-color var(--transition-speed) ease;
  padding: 0.2em 0.6em;
  border-radius: 50px;
}

.material-input:focus-within {
  border: 2px solid var(--black);
}

.material-input input {
  border: none;
  outline: none;
  width: 15em;
  transition: width var(--transition-speed) 100ms ease;
}

.material-input input:focus {
  outline: none;
}

.material-input:focus-within input {
  border: none;
  outline: none;
  width: 25em;
}

.material-input i {
  color: var(--dark-gray);
  transition: color var(--transition-speed) ease;
  cursor: pointer;
}

.material-input:focus-within > i {
  color: var(--black);
}
</style>
