const API = {
  BASE_URL: "https://pokeapi.co/api/v2/",
  POKEMON: "pokemon",
  nextPage: "",
  suffix: "?limit=30",
};

const getPokemonList = async function (URL) {
  const response = await fetch(URL);
  return response.json();
  // API.nextPage = pokemonList.next;
  // return pokemonList.results;
};

const getPokemonsDetail = async function (pokemonList) {
  const pokemonsDetail = await Promise.all(
    pokemonList.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return await response.json();
    })
  );
  return pokemonsDetail;
};

getPokemonList(API.BASE_URL + API.POKEMON + API.suffix).then(async (data) => {
  API.nextPage = data.next;
  await getPokemonsDetail(data.results).then((data) => (pokemonsList = data));
});
