<template>
  <button class="button" :style="style">
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: "blue"
    }
  },
  computed: {
    style() {
      return {
        backgroundColor: `var(--${this.color})`
      }
    }
  }
}
</script>
<style>
.button {
  border: none;
  color: white;
  padding: 0.625em 1.25em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  border-radius: 50px;
  cursor: pointer;
  transition: box-shadow var(--transition-speed) ease;
}

.button:hover {
  box-shadow: var(--dark-gray) 2px 2px 4px 0px;
}
</style>
