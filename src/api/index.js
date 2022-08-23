const API_CONFIG = {
  BASE_URL: "https://pokeapi.co/api/v2",
  pokeListURL: (offset, limit) => {
    return `/pokemon/?offset=${offset}&limit=${limit}`;
  },
  pokeIMG: (id) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  pokeGIF: (id) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
};

export default API_CONFIG;
