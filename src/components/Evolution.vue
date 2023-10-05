<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import API_CONFIG from "@/api";

const props = defineProps({
  chain: Object,
});
const image = API_CONFIG.pokeIMG(props.chain.species.url.split("/")[6]);
const hasChild = props.chain.evolves_to.length > 0;
</script>

<template>
  <!-- Evolution -->
  <div class="evolution">
    <div class="form">
      <h4 class="name">{{ chain.species.name }}</h4>
      <img :src="image" :alt="chain.species.name" />
    </div>
  </div>
  <template v-if="hasChild">
    <div class="divider">></div>
    <Evolution v-for="chain in chain.evolves_to" :key="chain" :chain="chain" />
  </template>
</template>

<style scoped>
.evolution {
  flex-direction: column;
}
.evolution,
.divider,
.form {
  display: flex;
  justify-content: space-around;
}
.divider {
  align-items: center;
  font-weight: 700;
  margin-right: 10px;
}
.form {
  align-items: center;
}
.name {
  white-space: nowrap;
  font-weight: 600;
  text-align: center;
  text-transform: capitalize;
}
@media (min-width: 768px) {
  .evolution {
    flex-direction: row;
  }
}
</style>
