import { createStore } from "vuex";

const state = {
  API: {
    BASE_URL: "https://pokeapi.co/api/v2/",
    POKEMON: "pokemon",
    nextPage: "",
    suffix: "?limit=30",
  },
  pokemons: [],
};
const mutations = {
  setPokemon({ state }, pokemons) {
    state.pokemons = pokemons;
  },
};
const actions = {
  getPokemon({ state }, pokemons) {
    state.pokemons = pokemons;
  },
};
const getters = {
  pokemonDetail() {},
};
export default createStore({
  state,
  mutations,
  actions,
  getters,
});
