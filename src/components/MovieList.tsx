import type { Ordem } from "../lib/movie";
import { getGenres, searchMovies, getMovies } from "../lib/tmdb";
import { MovieCard } from "./MovieCard";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";

type Props = {
  searchParams: Promise<{
    page?: string;
    q?: string;
    genero?: string;
    ordem?: string;
  }>;
};

const ORDENS: Ordem[] = ["popular", "alta", "avaliados"];
const TITULOS: Record<Ordem, string> = {
  popular: "Filmes populares",
  alta: "Filmes em alta na semana",
  avaliados: "Filmes mais bem avaliados",
};

export async function MovieList({ searchParams }: Props) {
  const { page, q, genero: generoParam, ordem: ordemParam } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const query = q?.trim();
  const ordem = ORDENS.find((o) => o === ordemParam) ?? "popular";

  const genres = await getGenres();
  const generoSelecionado = genres.find((g) => g.id === Number(generoParam));
  const genero = generoSelecionado?.id;

  const data = query
    ? await searchMovies(query, currentPage)
    : await getMovies({ ordem, genero, page: currentPage });

  const totalPages = Math.min(data.total_pages, 500);
  const filtros = query ? {} : { genero, ordem };

  const titulo = query ? `Resultados para "${query}"` : TITULOS[ordem] + (generoSelecionado && ordem !== "alta" ? ` · ${generoSelecionado.name}` : "");

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">
        {titulo}
      </h1>

      <SearchBar query={query} genres={genres} genero={genero} ordem={ordem} />
      <p className="mb-6 text-sm text-zinc-400">
        O gênero vale para populares e mais bem avaliado. A busca por título ignora os filtros.
      </p>

      {data.results.length === 0 ? (
        <p>Nenhum filme encontrado.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {data.results.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} priority={index < 5} />
          ))}
        </div>
      )}

      <Pagination page={currentPage} totalPages={totalPages} query={query} {...filtros} />
    </>
  );
}
