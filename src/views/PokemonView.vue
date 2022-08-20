<script>
export default {
  data() {
    return {
      API: {
        BASE_URL: "https://pokeapi.co/api/v2/",
        POKEMON: "pokemon",
        nextPage: "",
        suffix: "?limit=30",
      },
      pokemon: {},
    };
  },
  methods: {
    getPokemonList: async function (URL) {
      const response = await fetch(URL);
      const result = await response.json();
      return result;
    },
  },
  computed: {
    pokemonName() {
      return this.$route.params.id;
    },
  },
  async created() {
    const res = await this.getPokemonList(
      this.API.BASE_URL + this.API.POKEMON + "/" + this.pokemonName
    );
    console.log(res);
  },
};
</script>

<template>
  <div></div>
</template>

<style></style>
