
import React, { useState, useEffect } from 'react';
import { Pokemon } from '../types';
import { generatePokedexEntry } from '../services/geminiService';
import TypeBadge from './TypeBadge';
import Loader from './Loader';

interface PokemonDetailModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({ pokemon, onClose }) => {
  const [description, setDescription] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(true);

  useEffect(() => {
    const generateDescription = async () => {
      setIsGenerating(true);
      const entry = await generatePokedexEntry(pokemon);
      setDescription(entry);
      setIsGenerating(false);
    };

    if (pokemon) {
      generateDescription();
    }
  }, [pokemon]);

  // Handle closing modal with Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg relative border border-gray-700 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-gray-700/50 rounded-full p-2 flex-shrink-0">
              <img 
                src={pokemon.imageUrl} 
                alt={pokemon.name} 
                className="w-32 h-32 object-contain"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl font-bold text-gray-400">#{pokemon.id.toString().padStart(3, '0')}</p>
              <h2 className="text-4xl font-extrabold capitalize text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{pokemon.name}</h2>
              <div className="flex justify-center sm:justify-start gap-2 mt-2">
                {pokemon.types.map(type => <TypeBadge key={type} type={type} />)}
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
             <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900/50 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Height</p>
                    <p className="text-lg font-semibold">{pokemon.height / 10} m</p>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Weight</p>
                    <p className="text-lg font-semibold">{pokemon.weight / 10} kg</p>
                </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Pokédex Entry</h3>
              {isGenerating ? (
                <div className="flex items-center justify-center h-24">
                  <Loader />
                </div>
              ) : (
                <p className="text-gray-300 leading-relaxed">{description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailModal;
