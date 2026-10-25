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

  if (!res.ok) throw new Error(`Erro TMDB: ${res.status}`);
  return res.json();
}

export const getPopularMovies = (page = 1) => 
  tmdb<MoviesResponse>("/movie/popular", { page: String(page) });

export const posterUrl = (path: string | null, size = "w500") => 
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "/sem-poster.svg";