'use client'

import React from 'react'
import { PokemonCard } from './pokemon-card'

interface PokemonListProps {
  pokemonNames: string[]
  isLoading: boolean
  favorites: string[]
  toggleFavorite: (name: string) => void
  onSelectPokemon: (name: string) => void
}

export function PokemonList({ pokemonNames, isLoading, favorites, toggleFavorite, onSelectPokemon }: PokemonListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Search Results</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">Found {isLoading ? '...' : pokemonNames.length} Pokemon</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonNames.map((name, index) => (
          <PokemonCard 
            key={isLoading ? index : name} 
            name={name} 
            isLoading={isLoading}
            isFavorite={favorites.includes(name)}
            toggleFavorite={() => toggleFavorite(name)}
            onSelect={() => onSelectPokemon(name)}
          />
        ))}
      </div>
    </div>
  )
}

