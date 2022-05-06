<template>
  <div class="filter-container">
    <p>Filtros:</p>
    <ul class="filter-list">
      <li v-for="(item, i) in items" :key="i">
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
  props: {},
  data: () => ({
    items: ["Calça", "Addidas", "Nike"],
  }),
  methods: {
    removeItem(i) {
      this.items.splice(i, 1);
    },
    pushItem(name) {
      this.items.push(name);
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
