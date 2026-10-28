import Image from "next/image";
import Link from "next/link";
import { Movie, posterUrl } from "../lib/movie";

export function MovieCard({ movie }: { movie: Movie }) {
  const year = movie.release_date?.slice(0, 4);

  return (
    <Link
      href={`/filme/${movie.id}`}
      className="group block overflow-hidden rounded-lg bg-zinc-900"
    >
      <Image
        src={posterUrl(movie.poster_path)}
        alt={`Poster de ${movie.title}`}
        width={500}
        height={750}
        className="aspect-2/3 w-full object-cover transition group-hover:scale-105"
      />
      <div className="p-3">
        <h2 className="line-clamp-1 font-semibold">{movie.title}</h2>
        <p className="text-sm text-zinc-400">
          {year} - ⭐ {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </Link>
  );
}
