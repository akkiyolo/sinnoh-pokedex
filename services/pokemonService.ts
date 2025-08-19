
import { SINNOH_START_ID, SINNOH_END_ID, POKEAPI_BASE_URL } from '../constants';
import { Pokemon, PokemonType } from '../types';

interface PokeApiResponse {
  id: number;
  name: string;
  types: { type: { name: PokemonType } }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  height: number;
  weight: number;
}

const formatPokemonData = (data: PokeApiResponse): Pokemon => {
  return {
    id: data.id,
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    types: data.types.map(t => t.type.name),
    imageUrl: data.sprites.other['official-artwork'].front_default,
    height: data.height,
    weight: data.weight,
  };
};

export const getSinnohPokemon = async (): Promise<Pokemon[]> => {
  const pokemonPromises: Promise<Pokemon>[] = [];
  for (let i = SINNOH_START_ID; i <= SINNOH_END_ID; i++) {
    const promise = fetch(`${POKEAPI_BASE_URL}${i}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch data for Pokémon ID: ${i}`);
        }
        return res.json();
      })
      .then(data => formatPokemonData(data as PokeApiResponse));
    pokemonPromises.push(promise);
  }

  const pokemonList = await Promise.all(pokemonPromises);
  return pokemonList;
};
