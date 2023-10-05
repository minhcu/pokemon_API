<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import useFetchAPI from "@/composable/fetchAPI";
import API_CONFIG from "@/api";
import Tag from "@/components/Tag.vue";
import LabelVue from "@/components/Label.vue";
import Evolution from "@/components/Evolution.vue";
import Loading from "@/components/Loading.vue";

const store = useStore();
const name = useRoute().params.id;
const pokemon = computed(() => store.getters.pokeDetail(name));
const image = computed(() => API_CONFIG.pokeIMG(pokemon.value.id));
const species = computed(() => store.getters.pokeSpecies(name));
const evolChain = computed(() => store.getters.pokeChain(name));
const pending = ref(true);

const { data, fetchData } = useFetchAPI();
fetchData(API_CONFIG.pokemon(name), pokemon.value).then(() => {
  if (!pokemon.value) store.dispatch("setPokemon", data.value);
});
fetchData(API_CONFIG.species(name), species.value).then(() => {
  if (!species.value) store.dispatch("setSpecies", data.value);
  fetchData(species.value.evolution_chain.url)
    .then(() => {
      if (!evolChain.value)
        store.dispatch("setChain", { ...data.value, name: species.value.name });
    })
    .then(() => (pending.value = false));
});

const engEntry = (entries) => {
  const entry = entries.find((entry) => entry.language.name === "en");
  return entry.flavor_text;
};
const spaceCase = (string) => string.split("-").join(" ");
</script>

<template>
  <Loading v-if="pending" />
  <div class="container" v-else>
    <router-link class="back-btn" to="/">&lt; Back</router-link>
    <div class="wrapper">
      <div class="col-full">
        <div class="image" :style="`background-image:url('${image}')`"></div>
        <div class="labels">
          <LabelVue
            v-for="typeItem in pokemon.types"
            :key="typeItem.type.name"
            :type="typeItem.type.name"
          />
        </div>
        <h2 class="name">
          {{ pokemon.name }}
        </h2>
        <p v-if="species.flavor_text_entries" class="entry">
          {{ engEntry(species.flavor_text_entries) }}
        </p>
        <div class="detail__wrap">
          <div>
            <h3 class="label">Height</h3>
            <div class="detail-tag">{{ pokemon.height }}</div>
          </div>
          <div>
            <h3 class="label">Weight</h3>
            <div class="detail-tag">{{ pokemon.weight }}</div>
          </div>
        </div>
        <div class="ability">
          <h3 class="label">Abilities</h3>
          <div class="detail__wrap">
            <div
              v-for="ability in pokemon.abilities"
              :key="ability.ability.name"
            >
              <div class="detail-tag">
                {{ spaceCase(ability.ability.name) }}
              </div>
            </div>
          </div>
        </div>
        <div class="stats">
          <h3 class="label">Stats</h3>
          <div class="detail__wrap">
            <Tag
              v-for="stat in pokemon.stats"
              :key="stat.base_stat"
              :label="stat.stat.name"
              :detail="stat.base_stat"
            />
          </div>
        </div>
        <div class="evolution">
          <h3 class="label">Evolution</h3>
          <div class="evolution__wrap">
            <Evolution v-if="evolChain" :chain="evolChain.chain" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-btn {
  display: block;
  position: fixed;
  top: 5%;
  left: 5%;
  border-radius: 30px;
  padding: 5px 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 4px 8px 0px;
  z-index: 999;
}
.col-full {
  max-width: 500px;
  width: 100%;
  margin: auto;
}
.col-full > * {
  width: 100%;
}
.image {
  width: 200px;
  height: 200px;
  margin: auto;
  background-size: cover;
}
.name {
  white-space: nowrap;
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
}
.entry {
  margin-bottom: 10px;
}
.labels {
  display: flex;
  justify-content: center;
}
.detail__wrap {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 5px;
}
.label {
  font-weight: 600;
  text-align: center;
  margin-bottom: 5px;
}
.detail-tag {
  width: 100px;
  margin: 5px;
  padding: 2px;
  border-radius: 30px;
  background-color: #f6f8fc;
  text-align: center;
  text-transform: capitalize;
}
.evolution__wrap {
  display: flex;
  justify-content: center;
}
</style>
