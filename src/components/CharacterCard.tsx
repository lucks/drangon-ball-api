import React from 'react';
import { Power, Heart, Shield, Sword } from 'lucide-react';

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

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-2 left-3 text-xl font-bold text-white">
          {character.name}
        </h3>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-gray-600">{character.race}</span>
          •
          <span className="text-sm text-gray-600">{character.gender}</span>
        </div>
        
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {character.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1 text-sm">
            <Power className="w-4 h-4 text-orange-500" />
            <span>Ki: {character.ki}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Sword className="w-4 h-4 text-red-500" />
            <span>Max: {character.maxKi}</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-blue-500" />
            <span>{character.affiliation}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <Heart className="w-4 h-4 text-purple-500" />
            <span>{character.originPlanet}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;