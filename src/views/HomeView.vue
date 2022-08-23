<script>
import Card from "../components/Card.vue";

export default {
  computed: {
    pokemons() {
      return this.$store.getters.pokeLIST;
    },
    pkmIMG() {
      return this.$store.getters.pkmIMG;
    },
    nextPageAPI() {
      return this.$store.getters.nextPage;
    },
  },
  components: {
    Card,
  },
  data() {
    return {
      API: this.$store.getters.pokeAPI,
    };
  },
  methods: {
    handleLimit: async function () {
      const result = await this.getPokemonList(this.nextPageAPI);
      await this.getPokemonsDetail(result);
    },
    getPokemonList: async function (URL) {
      const response = await fetch(URL);
      const result = await response.json();
      this.$store.dispatch("nextPageAPI", result.next);
      return result.results;
    },
    getPokemonsDetail: async function (pokemonList) {
      const promiseArray = pokemonList.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return await response.json();
      });
      const pokemonsDetail = await Promise.all(promiseArray);
      this.$store.dispatch("getPokemon", pokemonsDetail);
      return;
    },
  },
  async created() {
    const result = await this.getPokemonList(
      this.API.BASE_URL + this.API.POKEMON + this.API.suffix
    );
    await this.getPokemonsDetail(result);
  },
};
</script>

<template>
  <div class="container" v-if="pokemons.length !== 0">
    <div class="wrapper">
      <div class="col" v-for="pokemon in pokemons" :key="pokemon.name">
        <Card
          :id="pokemon.id"
          :name="pokemon.name"
          :image="pkmIMG(pokemon.id)"
          :types="pokemon.types"
        />
      </div>
    </div>
    <div class="wrapper">
      <div class="col-full">
        <button class="btn" @click="handleLimit">Load More</button>
      </div>
    </div>
  </div>
</template>

<style>
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
  --offset: 10px;
  max-width: calc(var(--width) - var(--offset));
  flex-basis: calc(var(--width) - var(--offset));
  border-radius: 15px;
  margin-bottom: var(--offset);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  -webkit-transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.col:hover {
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  -webkit-transition: box-shadow 0.4s ease-out;
  transition: box-shadow 0.4s ease-out;
}

.btn {
  height: 40px;
  padding: 6px 15px;
  margin: 80px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  color: #ffffff;
  background-color: #ff4d4f;
}
.btn:hover {
  background-color: #ff7875;
}
.btn:active {
  background-color: #d9363e;
}
</style>
