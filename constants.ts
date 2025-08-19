
import { PokemonType } from './types';

export const SINNOH_START_ID = 387;
export const SINNOH_END_ID = 493;

export const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

export const POKEMON_TYPE_COLORS: Record<PokemonType, string> = {
  normal: 'bg-gray-400 text-black',
  fire: 'bg-orange-500 text-white',
  water: 'bg-blue-500 text-white',
  electric: 'bg-yellow-400 text-black',
  grass: 'bg-green-500 text-white',
  ice: 'bg-cyan-300 text-black',
  fighting: 'bg-red-700 text-white',
  poison: 'bg-purple-600 text-white',
  ground: 'bg-yellow-600 text-white',
  flying: 'bg-indigo-400 text-white',
  psychic: 'bg-pink-500 text-white',
  bug: 'bg-lime-500 text-white',
  rock: 'bg-yellow-700 text-white',
  ghost: 'bg-indigo-800 text-white',
  dragon: 'bg-indigo-600 text-white',
  dark: 'bg-gray-700 text-white',
  steel: 'bg-gray-500 text-white',
  fairy: 'bg-pink-300 text-black',
};
