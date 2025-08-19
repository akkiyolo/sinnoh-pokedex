
import React from 'react';
import { PokemonType } from '../types';
import { POKEMON_TYPE_COLORS } from '../constants';

interface TypeBadgeProps {
  type: PokemonType;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const colorClass = POKEMON_TYPE_COLORS[type] || 'bg-gray-500 text-white';
  
  return (
    <span className={`px-3 py-1 text-sm font-semibold rounded-full capitalize ${colorClass}`}>
      {type}
    </span>
  );
};

export default TypeBadge;
