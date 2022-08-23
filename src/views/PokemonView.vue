<script>
import LabelVue from "../components/Label.vue";
import Tag from "../components/Tag.vue";
import Evolution from "../components/Evolution.vue";
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import API_CONFIG from "../api";

export default {
  components: { LabelVue, Tag, Evolution },
  setup() {
    const state = reactive({
      image: "",
      pokemon: {},
      species: {},
      evolChain: {},
    });
    const pokemonID = useRoute().params.id;
    state.image = API_CONFIG.pokeIMG(pokemonID);

    // Get pokemon detail
    const pokemonDetail = API_CONFIG.pokemon(pokemonID);
    fetch(pokemonDetail)
      .then((res) => res.json())
      .then((data) => {
        state.pokemon = data;
      });

    //Get pokemon species
    const pokemonSpieces = API_CONFIG.species(pokemonID);
    fetch(pokemonSpieces)
      .then((res) => res.json())
      .then((data) => {
        state.species = data;
      });

    // Get evolution chain
    const pokemonEvolChain = API_CONFIG.evolution(pokemonID);
    fetch(pokemonEvolChain)
      .then((res) => res.json())
      .then((data) => {
        state.evolChain = data;
      });

    const engEntry = (entries) => {
      const entry = entries.find((entry) => entry.language.name === "en");
      return entry.flavor_text;
    };
    const spaceCase = (string) => string.split("-").join(" ");

    return {
      ...toRefs(state),
      engEntry,
      spaceCase,
    };
  },
  methods: {
    spaceCase(string) {
      return string.split("-").join(" ");
    },
    engEntry(entries) {
      const entry = entries.find((entry) => entry.language.name === "en");
      return entry.flavor_text;
    },
  },
};
</script>

<template>
  <div class="container" v-if="pokemon.name">
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
            <div v-for="ability in abilities" :key="ability.ability.name">
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
            <Evolution v-if="evolChain.chain" :chain="evolChain.chain" />
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
  margin: 0px 10px;
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
