const API_CONFIG = {
  BASE_URL: "https://pokeapi.co/api/v2",
  pokeListURL: (offset, limit) => {
    return `${API_CONFIG.BASE_URL}/pokemon/?offset=${offset}&limit=${limit}`;
  },
  pokemon: (id) => `${API_CONFIG.BASE_URL}/pokemon/${id}`,
  species: (id) => `${API_CONFIG.BASE_URL}/pokemon-species/${id}`,
  evolution: (id) => `${API_CONFIG.BASE_URL}/evolution-chain/${id}`,
  pokeIMG: (id) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  pokeGIF: (id) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
};

export default API_CONFIG;
