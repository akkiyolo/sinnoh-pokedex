
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getSinnohPokemon } from './services/pokemonService';
import { Pokemon } from './types';
import PokemonCard from './components/PokemonCard';
import PokemonDetailModal from './components/PokemonDetailModal';
import SearchBar from './components/SearchBar';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        const pokemonList = await getSinnohPokemon();
        setAllPokemon(pokemonList);
        setFilteredPokemon(pokemonList);
      } catch (err) {
        setError('Failed to fetch Pokémon data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = allPokemon.filter(pokemon =>
      pokemon.name.toLowerCase().includes(lowercasedFilter) ||
      pokemon.id.toString().includes(lowercasedFilter)
    );
    setFilteredPokemon(filteredData);
  }, [searchTerm, allPokemon]);
  
  const handleSelectPokemon = useCallback((pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPokemon(null);
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-2">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Pokeball" className="h-12 w-12" />
            <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Sinnoh Pokédex
            </h1>
          </div>
          <p className="text-gray-400">Explore the Pokémon of the Sinnoh region.</p>
        </header>

        <main>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : error ? (
            <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredPokemon.map(pokemon => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} onSelect={handleSelectPokemon} />
              ))}
            </div>
          )}
        </main>
      </div>
      {selectedPokemon && <PokemonDetailModal pokemon={selectedPokemon} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
