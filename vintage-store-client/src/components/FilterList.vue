<template>
  <div class="filter-container">
    <p>Filtros:</p>
    <ul class="filter-list">
      <li v-for="(item, i) in modelValue" :key="i">
        <Chip :text="item" :deletable="true" @delete="removeItem(i)"></Chip>
      </li>
    </ul>
  </div>
</template>
<script>
import Chip from "@/components/Chip.vue";

export default {
  components: {
    Chip,
  },
  props: {
    modelValue: {
      type: Array,
      required: true,
    }
  },
  methods: {
    removeItem(i) {
      // Create a copy of the array but without the ith index.
      const newValue = this.modelValue.filter((_, idx) => i !== idx);
      this.$emit("update:modelValue", newValue);
    },
  },
};
</script>
<style>
.filter-container {
  display: flex;
  flex-flow: row nowrap;
  gap: 1em;
}

.filter-list {
  display: flex;
  flex-flow: row wrap;
  gap: 1em;
}
</style>
