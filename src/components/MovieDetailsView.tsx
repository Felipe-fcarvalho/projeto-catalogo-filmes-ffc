import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMovieDetails, posterUrl } from "../lib/tmdb";

function formatRuntime(minutes: number | null) {
  if (!minutes) return null;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
}

export async function MovieDetailsView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) notFound();

  const year = movie.release_date?.slice(0, 4);
  const runtime = formatRuntime(movie.runtime);
  const meta = [year, runtime, movie.genres.map((g) => g.name).join(", ")]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <Link
        href="/"
        className="mb-6 inline-block text-zinc-400 hover:text-white"
      >
        ← Voltar
      </Link>

      <div className="flex flex-col gap-8 md:flex-row">
        <Image
          src={posterUrl(movie.poster_path)}
          alt={`Pôster de ${movie.title}`}
          width={500}
          height={750}
          priority
          className="aspect-2/3 w-full max-w-xs rounded-lg object-cover"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          {movie.tagline && (
            <p className="mt-1 italic text-zinc-400">{movie.tagline}</p>
          )}
          <p className="mt-3 text-zinc-300">{meta}</p>
          <p>⭐ {movie.vote_average.toFixed(1)}</p>

          <h2 className="mt-6 text-xl font-semibold">Sinopse</h2>
          <p className="mt-2 leading-relaxed text-zinc-300">{movie.overview || "Sinopse não disponível."}</p>
        </div>
      </div>
    </>
  );
}
