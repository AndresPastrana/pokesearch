"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

interface PokemonCardProps {
  name: string;
  isLoading: boolean;
  isFavorite: boolean;
  toggleFavorite: () => void;
  onSelect: () => void;
}

export function PokemonCard({
  name,
  isLoading,
  isFavorite,
  toggleFavorite,
  onSelect,
}: PokemonCardProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoading || !name) return;

    const fetchPokemon = async () => {
      setError("");
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon details");
        }
        const data = await response.json();
        setPokemon(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch Pokemon details");
      }
    };

    fetchPokemon();
  }, [name, isLoading]);

  if (isLoading) {
    return (
      <div className="border p-4 rounded shadow animate-pulse dark:bg-gray-700 dark:border-yellow-600 bg-white">
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-32 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    );
  }

  if (error)
    return (
      <div className="border p-4 rounded shadow text-red-500 dark:text-red-400 dark:bg-gray-700 dark:border-yellow-600 bg-white">
        {error}
      </div>
    );
  if (!pokemon) return null;

  return (
    <div
      className="border p-4 rounded shadow transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg dark:bg-gray-700 dark:border-yellow-600 bg-white cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold mb-2 capitalize text-blue-600 dark:text-blue-400">
          {pokemon.name}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
          className={`text-2xl ${
            isFavorite ? "text-red-500" : "text-gray-400"
          }`}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
      <Image
        width={200}
        height={200}
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto mb-2 transition-opacity duration-300 ease-in-out hover:opacity-80"
      />
      <p className="text-gray-600 dark:text-gray-300">
        Height: {pokemon.height}
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        Weight: {pokemon.weight}
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        Types: {pokemon.types.map((t) => t.type.name).join(", ")}
      </p>
    </div>
  );
}
