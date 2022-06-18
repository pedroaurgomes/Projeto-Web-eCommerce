<template>
    <div class="modal-container" @click="clickOutside">
        <div class="modal" @click.stop="" :style="style">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      required: false,
      default: "white",
    }
  },
  computed: {
    style() {
      return {
        backgroundColor: this.backgroundColor,
      };
    }
  },
  methods: {
    clickOutside() {
      this.$emit("clickOutside")
    }
  }
}
</script>

<style>
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.modal {
    border-radius: 10px;
    padding: 1em;
}
</style>