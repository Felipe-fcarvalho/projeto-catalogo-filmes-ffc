import { MovieCard } from "./MovieCard";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";
import { getPopularMovies, searchMovies } from "../lib/tmdb";

type Props = {
  searchParams: Promise<{ page?: string; q?: string }>;
};

export async function MovieList({ searchParams }: Props) {
  const { page, q } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const query = q?.trim();

  const data = query
    ? await searchMovies(query, currentPage)
    : await getPopularMovies(currentPage);

  const totalPages = Math.min(data.total_pages, 500);

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">
        {query ? `Resultados para "${query}"` : "Filmes populares"}
      </h1>

      <SearchBar defaultValue={query} />

      {data.results.length === 0 ? (
        <p>Nenhum filme encontrado.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <Pagination page={currentPage} totalPages={totalPages} query={query} />
    </>
  );
}
