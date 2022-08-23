<script>
import LabelVue from "../components/Label.vue";
import Tag from "../components/Tag.vue";
import Evolution from "../components/Evolution.vue";
export default {
  components: { LabelVue, Tag, Evolution },
  data() {
    return {
      SPECIES: {},
      EVOLUTION: {},
      pokemon: {},
    };
  },
  computed: {
    pokemonName() {
      return this.$route.params.id;
    },
    abilities() {
      return this.pokemon.abilities.filter(
        (ability) => ability.is_hidden === false
      );
    },
    pkmIMG() {
      return this.$store.getters.pkmIMG;
    },
  },
  methods: {
    getPokemonEntry: async function (URL) {
      const response = await fetch(URL);
      return await response.json();
    },
    spaceCase(string) {
      return string.split("-").join(" ");
    },
    engEntry(entries) {
      const entry = entries.find((entry) => entry.language.name === "en");
      return entry.flavor_text;
    },
  },
  async created() {
    const API = this.$store.getters.pokeAPI;
    // GET POKEMON DETAIL
    const POKEMON = await this.getPokemonEntry(
      API.BASE_URL + API.POKEMON + this.pokemonName
    );
    this.pokemon = POKEMON;
    // GET SPECIES
    const SPECIES = await this.getPokemonEntry(this.pokemon.species.url);
    this.SPECIES = SPECIES;
    // GET EVOLUTION CHAIN
    const EVOLUTION = await this.getPokemonEntry(
      this.SPECIES.evolution_chain.url
    );
    this.EVOLUTION = EVOLUTION;
  },
};
</script>

<template>
  <div class="container" v-if="pokemon.name">
    <router-link class="back-btn" to="/">&lt; Back</router-link>
    <div class="wrapper">
      <div class="col-full">
        <div
          class="image"
          :style="`background-image:url('${pkmIMG(pokemon.id)}')`"
        ></div>
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
        <p v-if="SPECIES.flavor_text_entries" class="entry">
          {{ engEntry(SPECIES.flavor_text_entries) }}
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
            <Evolution v-if="EVOLUTION.chain" :chain="EVOLUTION.chain" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-btn {
  position: fixed;
  top: 5%;
  left: 10%;
  border-radius: 30px;
  padding: 5px 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 4px 8px 0px;
}
.col-full {
  width: 500px;
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
}
</style>
