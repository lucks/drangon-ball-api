import React, { useEffect, useState } from 'react';
import { Search, Power, Heart, Shield, Sword } from 'lucide-react';
import CharacterCard from './components/CharacterCard';
import LoadingSpinner from './components/LoadingSpinner';

interface Character {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  originPlanet: string;
}

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dragonball-api.com/api/characters?page=${page}&limit=12`
        );
        const data = await response.json();
        setCharacters(data.items);
        setTotalPages(Math.ceil(data.meta.totalItems / 12));
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
      setLoading(false);
    };

    fetchCharacters();
  }, [page]);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-yellow-500">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Personajes de Dragon Ball
          </h1>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar personajes..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCharacters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            {!searchTerm && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white/90 rounded-lg disabled:opacity-50 hover:bg-white/100 transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-white/90 rounded-lg">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-white/90 rounded-lg disabled:opacity-50 hover:bg-white/100 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;