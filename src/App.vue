<script>
export default {
  data() {
    return {
      API: this.$store.getters.pokeAPI,
    };
  },
  methods: {
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
  <RouterView />
</template>

<style scoped></style>
