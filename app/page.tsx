import { MovieCard } from "@/src/components/MovieCard";
import { getPopularMovies } from "@/src/lib/tmdb"; 

export default async function Home() {
  const { results } = await getPopularMovies();

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Filmes populares</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {results.map((movie) =>
          <MovieCard key={movie.id} movie={movie}/>
        )}
      </div>
    </main>
  );
}
