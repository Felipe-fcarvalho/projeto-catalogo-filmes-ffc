import { cacheLife } from "next/cache";

const BASE_URL = "https://api.themoviedb.org/3"

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

export type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieDetails = { 
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  genres: { id: number; name: string }[];
};

export class TmdbError extends Error { 
  constructor(public status: number) { 
    super(`Erro TMDB: ${status}`);
  }
}

async function tmdb<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("language", "pt-BR");
  Object.entries(params).forEach(([key, value]) => 
    url.searchParams.set(key, value)
);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
    next: { revalidate: 3600 }, 
});

  if (!res.ok) throw new TmdbError(res.status);
  return res.json();
}

export async function getMovieDetails(
  id: string
): Promise<MovieDetails | null> {
  "use cache";
  cacheLife("hours");

  if (!/^\d+$/.test(id)) return null;

  try {
    return await tmdb<MovieDetails>(`/movie/${id}`);
  } catch (error) {
    if (error instanceof TmdbError && error.status === 404) return null;
    throw error;
  }
}

export const getPopularMovies = (page = 1) => 
  tmdb<MoviesResponse>("/movie/popular", { page: String(page) });

export const searchMovies = (query: string, page = 1) => 
  tmdb<MoviesResponse>("/search/movie", { query, page: String(page) });

export const posterUrl = (path: string | null, size = "w500") => 
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "/sem-poster.svg";