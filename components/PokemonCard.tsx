
import React from 'react';
import { Pokemon } from '../types';

interface PokemonCardProps {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onSelect }) => {
  return (
    <div
      className="bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-gray-700 shadow-lg hover:shadow-cyan-500/20"
      onClick={() => onSelect(pokemon)}
    >
      <img
        src={pokemon.imageUrl}
        alt={pokemon.name}
        className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
        loading="lazy"
      />
      <div className="text-center mt-2">
        <p className="text-sm text-gray-400">#{pokemon.id.toString().padStart(3, '0')}</p>
        <h3 className="font-bold text-md sm:text-lg capitalize">{pokemon.name}</h3>
      </div>
    </div>
  );
};

export default React.memo(PokemonCard);
