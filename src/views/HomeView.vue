<script>
import Card from "../components/Card.vue";

export default {
  data() {
    return {
      API: {
        BASE_URL: "https://pokeapi.co/api/v2/",
        POKEMON: "pokemon",
        nextPage: "",
        suffix: "?limit=30",
      },
      pokemons: [],
    };
  },
  components: {
    Card,
  },
  methods: {
    getPokemonList: async function (URL) {
      const response = await fetch(URL);
      const result = await response.json();
      this.nextPage = result.next;
      return result.results;
    },
    getPokemonsDetail: async function (pokemonList) {
      const promiseArray = pokemonList.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return await response.json();
      });
      const pokemonsDetail = await Promise.all(promiseArray);
      return pokemonsDetail;
    },
  },
  async created() {
    const result = await this.getPokemonList(
      this.API.BASE_URL + this.API.POKEMON + this.API.suffix
    );
    const pokemonDetails = await this.getPokemonsDetail(result);
    this.pokemons = pokemonDetails;
  },
};
</script>

<template>
  <div class="container" v-if="pokemons.length !== 0">
    <div class="wrapper">
      <div class="col" v-for="pokemon in pokemons" :key="pokemon.name">
        <Card
          :name="pokemon.name"
          :image="pokemon.sprites.front_default"
          :types="pokemon.types"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 1200px;
  margin: 50px auto;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.col {
  --width: 16.66%;
  max-width: calc(var(--width) - 5px);
  flex-basis: calc(var(--width) - 5px);
}
</style>
