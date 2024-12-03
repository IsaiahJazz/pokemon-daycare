import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const getRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 898) + 1; // There are 898 Pokemon in the API
  const response = await axios.get(`${API_URL}/${randomId}`);
  return {...response.data, level: 1};
};

export const getPokemonByIdOrName = async (idOrName) => {
  const response = await axios.get(`${API_URL}/${idOrName}`);
  return {...response.data, level: 1 };
};