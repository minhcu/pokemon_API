<template>
  <router-link class="pokemon" :to="name">
    <div class="image" :style="`background-image:url('${image}')`"></div>
    <h3 class="title">
      {{ name }}
    </h3>
    <div class="labels">
      <LabelVue
        v-for="typeItem in types"
        :key="typeItem.type.name"
        :type="typeItem.type.name"
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
  display: block;
  padding: 10px 5px;
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
