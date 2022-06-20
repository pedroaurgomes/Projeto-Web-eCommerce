<template>
  <div class="material-textarea-container">
    <fieldset
      class="material-textarea"
      :class="{ 'content': this.modelValue.length > 0 }"
    >
      <legend>{{ name }}</legend>
      <textarea
        class="text-area"
        type="text"
        :placeholder="nameOrPlaceholder"
        :label="label"
        :value="modelValue"
        :style="textareaStyle"
        @input="emitInputEvent"
        @keydown.enter="emitSubmitEvent"
        @focus="hasFocus = true"
        @blur="hasFocus = false"
      ></textarea>
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
    width: {
      type: Number,
      required: false,
      default: 15,
    },
  },
  data: () => ({
    hasFocus: false,
  }),
  computed: {
    nameOrPlaceholder() {
      return this.hasFocus ? this.placeholder : this.name;
    },
    textareaStyle() {
      return { width: `${this.width}em` };
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
.material-textarea > textarea {
  padding: 5px;
  height: 12em;
  background-color: transparent;
  color: inherit;
  font-weight: inherit;
  font-size: inherit;
  border: none;
  outline: none;
  font-family: inherit;
}

.big-input {
  height:14em;

}

.material-textarea-container {
  display: flex;
  flex-direction: row;
  padding-top: .1em;
}

.material-textarea {
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
  border-radius: 20px;
  box-sizing: border-box;
}

.material-textarea:focus-within {
  border: 2px solid var(--black);
}

.material-textarea:focus-within, .material-textarea.content {
  padding-top: var(--padding-top-bottom);
  margin-top: 0;
}

.material-textarea > textarea:focus, .material-textarea:focus-within > textarea {
  border: none;
  outline: none;
}

.material-textarea:focus-within > i {
  color: var(--black);
}

.material-textarea > legend {
  display: none;
}

.material-textarea:focus-within > legend, .material-textarea.content > legend {
  display: block !important;
  font-size: var(--legend-font-size);
}
</style>