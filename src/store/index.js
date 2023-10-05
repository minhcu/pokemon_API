import { createStore } from "vuex";
// import API_CONFIG from "@/api";

const store = createStore({
  state: {
    pokemons: [],
    pokemon: {},
    chain: {},
    q: "",
  },
  mutations: {
    SET_POKEMONS(state, pokemons) {
      state.pokemons = pokemons;
    },
    SET_POKEMON(state, pokemon) {
      state.pokemon[pokemon.name] = {
        ...state.pokemon[pokemon.name],
        detail: pokemon,
      };
    },
    SET_SPECIES(state, species) {
      state.pokemon[species.name] = { ...state.pokemon[species.name], species };
    },
    SET_CHAIN(state, chain) {
      state.pokemon[chain.name] = { ...state.pokemon[chain.name], chain };
    },
    SET_QUERY(state, q) {
      state.q = q;
    },
  },
  actions: {
    setPokemons({ commit }, data) {
      commit("SET_POKEMONS", data);
    },
    setPokemon({ commit }, data) {
      commit("SET_POKEMON", data);
    },
    setSpecies({ commit }, data) {
      commit("SET_SPECIES", data);
    },
    setChain({ commit }, data) {
      commit("SET_CHAIN", data);
    },
    searchPokemon({ commit }, q) {
      commit("SET_QUERY", q);
    },
  },
  getters: {
    pokeList: (state) =>
      state.pokemons.filter((pokemon) => pokemon.name.includes(state.q)),
    pokeDetail: (state) => (name) => {
      if (state.pokemon[name]) return state.pokemon[name].detail;
      else return null;
    },
    pokeSpecies: (state) => (name) => {
      if (state.pokemon[name]) return state.pokemon[name].species;
      else return null;
    },
    pokeChain: (state) => (name) => {
      if (state.pokemon[name]) return state.pokemon[name].chain;
      else return null;
    },
  },
});

export default store;
