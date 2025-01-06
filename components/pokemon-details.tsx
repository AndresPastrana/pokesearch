"use client";

import { env_data } from "@/lib/env";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: { front_default: string; back_default: string };
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

interface PokemonDetailsProps {
  name: string;
  onClose: () => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

export function PokemonDetails({
  name,
  onClose,
  isFavorite,
  toggleFavorite,
}: PokemonDetailsProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      setError("");
      try {
        const response = await fetch(
          `${env_data.NEXT_PUBLIC_POKE_API_URL}pokemon/${name}`
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
  }, [name]);

  if (error)
    return <div className="text-red-500 dark:text-red-400">{error}</div>;
  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-bold capitalize text-blue-600 dark:text-blue-400">
            {pokemon.name}
          </h2>
          <div>
            <button
              onClick={toggleFavorite}
              className={`text-2xl mr-2 ${
                isFavorite ? "text-red-500" : "text-gray-400"
              }`}
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
            <button
              onClick={onClose}
              className="text-2xl text-gray-600 dark:text-gray-400"
            >
              ✖️
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Image
              width={250}
              height={250}
              src={pokemon.sprites.front_default}
              alt={`${pokemon.name} front`}
              className="w-full"
            />
            <Image
              width={230}
              height={230}
              src={pokemon.sprites.back_default}
              alt={`${pokemon.name} back`}
              className="w-full"
            />
          </div>
          <div>
            <p className="mb-2">
              <strong>Height:</strong> {pokemon.height}
            </p>
            <p className="mb-2">
              <strong>Weight:</strong> {pokemon.weight}
            </p>
            <p className="mb-2">
              <strong>Types:</strong>{" "}
              {pokemon.types.map((t) => t.type.name).join(", ")}
            </p>
            <p className="mb-2">
              <strong>Abilities:</strong>{" "}
              {pokemon.abilities.map((a) => a.ability.name).join(", ")}
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Stats</h3>
            <ul>
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name} className="mb-1">
                  <span className="capitalize">{stat.stat.name}:</span>{" "}
                  {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
