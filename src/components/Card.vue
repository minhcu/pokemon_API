<template>
  <router-link class="pokemon" :to="`${pokemon.id}`">
    <div class="id">#{{ pokemon.id }}</div>
    <div
      class="image"
      :style="`background-image:url('${image}')`"
      v-if="pokemon.id"
    ></div>
    <h3 class="title">
      {{ name }}
    </h3>
    <div class="labels">
      <LabelVue
        v-for="typeItem in pokemon.types"
        :key="typeItem.type.name"
        :type="typeItem.type.name"
      />
    </div>
  </router-link>
</template>

<script>
import LabelVue from "./Label.vue";
import API_CONFIG from "../api";
import { reactive, toRefs, computed } from "vue";

export default {
  name: "TheCard",
  components: { LabelVue },
  props: {
    URL: String,
    name: String,
  },
  setup(props) {
    const state = reactive({
      pokemon: {},
      image: "",
    });
    fetch(props.URL)
      .then((res) => res.json())
      .then((data) => {
        state.pokemon = data;
        state.image = API_CONFIG.pokeIMG(state.pokemon.id);
      });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.pokemon {
  cursor: pointer;
  display: block;
  padding: 10px 5px;
}
.id {
  text-align: center;
  color: var(--vt-c-indigo);
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
