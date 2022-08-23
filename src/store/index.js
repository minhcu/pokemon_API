import { createStore } from "vuex";

const store = createStore({
  state: {
    API: {
      BASE_URL: "https://pokeapi.co/api/v2/pokemon/",
      SPECIES: "pokemon-species/",
      suffix: "?limit=898",
      img: (id) =>
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      gif: (id) =>
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
    },
    pokemons: [],
  },
  mutations: {
    setPokemon(state, pokemons) {
      state.pokemons = [...state.pokemons, ...pokemons];
    },
  },
  actions: {
    getPokemon({ commit }, pokemons) {
      commit("setPokemon", pokemons);
    },
  },
  getters: {
    pokeAPI(state) {
      return state.API;
    },
    pokeLIST(state) {
      return state.pokemons;
    },
    IsValid(state) {
      return state.pokemons.length;
    },
    pkmIMG: (state) => {
      return state.API.img;
    },
  },
});

export default store;
