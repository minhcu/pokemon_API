<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import API_CONFIG from "@/api";
import useFetchAPI from "@/composable/fetchAPI";
import LabelVue from "@/components/Label.vue";
import CardSkeleton from "@/components/Card/CardSkeleton.vue";

const props = defineProps({
  URL: String,
  name: String,
});

const store = useStore();
const pokemon = computed(() => store.getters.pokeDetail(props.name));
const image = computed(() => API_CONFIG.pokeIMG(pokemon.value.id));

const { data, pending, fetchData } = useFetchAPI();
fetchData(props.URL, pokemon.value).then(() => {
  if (!pokemon.value) store.dispatch("setPokemon", data.value);
});
</script>
<template>
  <template v-if="pending || !pokemon">
    <CardSkeleton />
  </template>
  <router-link class="pokemon" :to="`${pokemon.name}`" v-else>
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
</template>

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
