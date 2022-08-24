<template>
  <div v-if="error">{{ error }}</div>
  <router-link class="pokemon" :to="`${pokemon.id}`" v-else-if="pokemon.name">
    <div class="id">#{{ pokemon.id }}</div>
    <div class="image" :style="`background-image:url('${image}')`"></div>
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
  <div v-else>LOADING</div>
</template>

<script>
import LabelVue from "./Label.vue";
import API_CONFIG from "../api";
import { reactive, ref, toRefs } from "vue";

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
    const pending = ref(true);
    const error = ref(null);
    fetch(props.URL)
      .then((res) => res.json())
      .then((data) => {
        state.pokemon = data;
        state.image = API_CONFIG.pokeIMG(state.pokemon.id);
      })
      .catch((e) => (error.value = e))
      .finally(() => (pending.value = false));
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
