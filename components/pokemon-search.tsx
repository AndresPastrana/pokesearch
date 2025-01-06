"use client";

import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { PokemonList } from "@/components/pokemon-list";
import { Pagination } from "@/components//pagination";
import { PokemonDetails } from "@/components/pokemon-details";
import { useTheme } from "next-themes";
import { env_data } from "@/lib/env";

export default function PokemonSearch() {
  // TODO: Refactor loading data, pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  const debouncedSearch = useDebouncedCallback((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 300);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!searchTerm) {
        setPokemonList([]);
        return;
      }

      setError("");
      setIsLoading(true);

      try {
        const response = await fetch(
          `${env_data.NEXT_PUBLIC_POKE_API_URL}pokemon?limit=1302`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon list");
        }
        const data = await response.json();
        const filteredPokemon = data.results
          .filter((pokemon: { name: string }) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((pokemon: { name: string }) => pokemon.name);
        setPokemonList(filteredPokemon);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch Pokemon list");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [searchTerm]);

  const toggleFavorite = (name: string) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const displayedPokemon = showFavorites ? favorites : pokemonList;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayedPokemon.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="p-4 transition-colors duration-200 ease-in-out dark:bg-gray-800 dark:text-white min-h-screen bg-yellow-50">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          onChange={(e) => debouncedSearch(e.target.value)}
          placeholder="Enter Pokemon name"
          className="w-full p-2 mr-2 border border-yellow-300 rounded dark:bg-gray-700 dark:border-yellow-600 bg-white"
        />
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 bg-yellow-200 dark:bg-yellow-600 rounded"
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="itemsPerPage" className="mr-2">
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="p-2 border border-yellow-300 rounded dark:bg-gray-700 dark:border-yellow-600 bg-white"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
        >
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </div>

      {isLoading ? (
        <PokemonList
          pokemonNames={Array(itemsPerPage).fill("")}
          isLoading={true}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onSelectPokemon={setSelectedPokemon}
        />
      ) : (
        <PokemonList
          pokemonNames={currentItems}
          isLoading={false}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onSelectPokemon={setSelectedPokemon}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalItems={displayedPokemon.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}

      {selectedPokemon && (
        <PokemonDetails
          name={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          isFavorite={favorites.includes(selectedPokemon)}
          toggleFavorite={() => toggleFavorite(selectedPokemon)}
        />
      )}
    </div>
  );
}
