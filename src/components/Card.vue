<template>
  <router-link class="pokemon" :to="name">
    <div class="image" :style="`background-image:url('${image}')`"></div>
    <h3 class="title">
      {{ name }}
    </h3>
    <div class="labels">
      <LabelVue
        v-for="type in types"
        :key="type.type.name"
        :type="type.type.name"
      />
    </div>
  </router-link>
</template>

<script>
import LabelVue from "./Label.vue";
export default {
  name: "TheCard",
  props: {
    image: String,
    name: String,
    types: Array,
  },
  components: { LabelVue },
};
</script>

<style scoped>
.pokemon {
  cursor: pointer;
}
.image {
  padding-top: 100%;
  background-size: contain;
}
.title {
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;
}
.labels {
  display: flex;
  justify-content: center;
}
</style>
