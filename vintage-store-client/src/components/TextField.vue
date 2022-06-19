<template>
  <div class="material-input-container">
    <fieldset
      class="material-input"
      :class="{
        'input-expand-transition': expandTransition,
        'content': this.modelValue.length > 0,
        'named': !this.unnamed,
        'unnamed': this.unnamed,
      }"
      :style="fieldsetStyle"
    >
      <legend>{{ name }}</legend>
      <input
        :type="type"
        :placeholder="nameOrPlaceholder"
        :label="label"
        :value="modelValue"
        :style="inputStyle"
        @input="emitInputEvent"
        @keydown.enter="emitSubmitEvent"
        @focus="hasFocus = true"
        @blur="hasFocus = false"
        :disabled="this.unnamed"
      />
      <i v-if="iconClass" :class="iconClass" @click="emitSubmitEvent"></i>
    </fieldset>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
      default: "Input",
    },
    placeholder: {
      type: String,
      required: false,
      default: "Texto...",
    },
    iconClass: {
      type: String,
      required: false,
      default: null,
    },
    expandTransition: {
      type: Boolean,
      required: false,
      default: false,
    },
    width: {
      type: Number,
      required: false,
      default: 15,
    },
    unnamed: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
  },
  data: () => ({
    hasFocus: false,
  }),
  computed: {
    nameOrPlaceholder() {
      return this.hasFocus ? this.placeholder : this.name;
    },
    inputStyle() {
      return { width: `${this.width}em` };
    },
    fieldsetStyle() {
      if (this.unnamed) {
        return {
          backgroundColor: "var(--light-gray)",
          color: "var(--black)",
          border: "none",
          fontWeight: "bold",
        }
      } else {
        return {};
      }
    },
  },
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
.material-input-container {
  display: flex;
  flex-direction: row;
  padding-top: .1em;
}

.material-input {
  --legend-font-size: .8rem;
  --padding-top-bottom: 0em;

  justify-self: flex-end;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  border: 2px solid var(--dark-gray);
  transition: border-color var(--transition-speed) ease;
  margin-top: calc(var(--legend-font-size) / 2);
  padding-top: calc(var(--padding-top-bottom) + var(--legend-font-size) / 2);
  padding-bottom: calc(var(--padding-top-bottom) + var(--legend-font-size) / 2);
  padding-left: 0.6em;
  padding-right: 0.6em;
  border-radius: 50px;
  box-sizing: border-box;
}

.material-input:focus-within {
  border: 2px solid var(--black);
}

.material-input:focus-within.named, .material-input.named.content {
  padding-top: var(--padding-top-bottom);
  margin-top: 0;
}

.material-input > input {
  background-color: transparent;
  color: inherit;
  font-weight: inherit;
  font-size: inherit;
  border: none;
  outline: none;
}

.material-input.input-expand-transition input {
  transition: width var(--transition-speed) 100ms ease;
}

.material-input input:focus {
  outline: none;
}

.material-input:focus-within input {
  border: none;
  outline: none;
}

.material-input.input-expand-transition:focus-within input {
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

.material-input > legend {
  display: none;
}

.material-input.named:focus-within > legend, .material-input.named.content > legend {
  display: block !important;
  font-size: var(--legend-font-size);
}
</style>
