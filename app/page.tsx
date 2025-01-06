import PokemonSearch from "@/components/pokemon-search";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        Pokémon Search
      </h1>
      <PokemonSearch />
    </main>
  );
}
