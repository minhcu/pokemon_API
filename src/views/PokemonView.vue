<script>
import LabelVue from "../components/Label.vue";
import Tag from "../components/Tag.vue";
import Evolution from "../components/Evolution.vue";
import callAPI from "../composable";
export default {
  components: { LabelVue, Tag, Evolution },
  props: {
    name: String,
    URL: String,
  },
  data() {
    return {
      species: {},
      evolutionChain: {},
      pokemonDetail: {},
    };
  },
  computed: {
    pokemonName() {
      return this.$route.params.id;
    },
    abilities() {
      return this.pokemonDetail.abilities.filter(
        (ability) => ability.is_hidden === false
      );
    },
    pkmIMG() {
      return this.$store.getters.pkmIMG;
    },
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
  async created() {
    // GET POKEMON DETAIL
    const { data } = await callAPI(this.URL);
    this.pokemonDetail = data.value;
    // GET SPECIES
    const { speciesData } = await callAPI(this.pokemon.species.url);
    this.SPECIES = speciesData.value;
    // GET EVOLUTION CHAIN
    const { evolutionData } = await callAPI(this.SPECIES.evolution_chain.url);
    this.EVOLUTION = evolutionData.value;
  },
};
</script>

<template>
  <div class="container" v-if="pokemonDetail.name">
    <router-link class="back-btn" to="/">&lt; Back</router-link>
    <div class="wrapper">
      <div class="col-full">
        <div
          class="image"
          :style="`background-image:url('${pkmIMG(pokemonDetail.id)}')`"
        ></div>
        <div class="labels">
          <LabelVue
            v-for="typeItem in pokemonDetail.types"
            :key="typeItem.type.name"
            :type="typeItem.type.name"
          />
        </div>
        <h2 class="name">
          {{ pokemonDetail.name }}
        </h2>
        <p v-if="SPECIES.flavor_text_entries" class="entry">
          {{ engEntry(SPECIES.flavor_text_entries) }}
        </p>
        <div class="detail__wrap">
          <div>
            <h3 class="label">Height</h3>
            <div class="detail-tag">{{ pokemonDetail.height }}</div>
          </div>
          <div>
            <h3 class="label">Weight</h3>
            <div class="detail-tag">{{ pokemonDetail.weight }}</div>
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
              v-for="stat in pokemonDetail.stats"
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
