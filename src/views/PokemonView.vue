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
    // pokemon() {
    //   return this.$store.getters.pokemonDetail(this.pokemonName);
    // },
    pkmIMG() {
      return this.$store.getters.pkmIMG;
    },
  },
  methods: {
    getPokemonEntry: async function (URL) {
      const response = await fetch(URL);
      return await response.json();
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
    <div class="wrapper">
      <div class="col-full">
        <div
          class="image"
          :style="`background-image:url('${pkmIMG(pokemon.id)}')`"
        ></div>
        <h2 class="name">
          {{ pokemon.name }}
        </h2>
        <p v-if="SPECIES.flavor_text_entries">
          {{ SPECIES.flavor_text_entries[0].flavor_text }}
        </p>
        <div class="labels">
          <LabelVue
            v-for="typeItem in pokemon.types"
            :key="typeItem.type.name"
            :type="typeItem.type.name"
          />
        </div>
        <div class="detail__wrap">
          <div class="ibm__item">
            <h3 class="label">Height</h3>
            <div>{{ pokemon.height }}</div>
          </div>
          <div class="label">
            <h3 class="label">Weight</h3>
            <div>{{ pokemon.weight }}</div>
          </div>
        </div>
        <div class="">
          <h3 class="label">Abilities</h3>
          <div class="detail__wrap">
            <div
              v-for="ability in pokemon.abilities"
              :key="ability.ability.name"
            >
              <div>
                {{ ability.ability.name }}
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
          <Evolution v-if="EVOLUTION.chain" :chain="EVOLUTION.chain" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  text-align: center;
  text-transform: capitalize;
}
.labels {
  display: flex;
  justify-content: center;
}
.detail__wrap {
  display: flex;
  justify-content: space-evenly;
}
.ibm__item {
  text-align: center;
}
.label {
  font-weight: 600;
  text-align: center;
}
</style>
