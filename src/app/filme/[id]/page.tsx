import type { Metadata } from "next";
import { Suspense } from "react";
import { DetailsSkeleton } from "@/src/components/DetailsSkeleton";
import { MovieDetailsView } from "@/src/components/MovieDetailsView";
import { getMovieDetails, getPopularMovies, posterUrl } from "@/src/lib/tmdb";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const { results } = await getPopularMovies(1);
  return results.map((movie) => ({ id: String(movie.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) return { title: "Filme não encontrado" };

  return {
    title: movie.title,
    description: movie.overview,
    openGraph: { images: [posterUrl(movie.poster_path)] },
  };
}

export default function MoviePage({ params }: Props) {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <Suspense fallback={<DetailsSkeleton />}>
        <MovieDetailsView params={params} />
      </Suspense>
    </main>
  );
}
