<template>
  <div class="chip">
    <div class="chip-text">{{ text }}</div>
    <div v-if="deletable" class="chip-delete" @click="emitDelete">
      <i class="fa-solid fa-x"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    deletable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    emitDelete() {
      this.$emit("delete");
    },
  },
};
</script>

<style>
.chip {
  border-radius: 50px;
  background-color: var(--light-gray);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  overflow: hidden;
  width: fit-content;
}

.chip-text {
  padding: 0.2em 0.6em;
}

.chip-delete {
  background-color: var(--darken);
  font-size: 0.7em;
  width: 2.5em;
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
}

.chip-delete:hover {
  cursor: pointer;
}

.chip-delete:hover i {
  color: var(--light-gray);
}
</style>
