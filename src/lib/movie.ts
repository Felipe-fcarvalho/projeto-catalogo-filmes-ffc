export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

export const posterUrl = (path: string | null, size = "w500") => 
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "/sem-poster.svg";