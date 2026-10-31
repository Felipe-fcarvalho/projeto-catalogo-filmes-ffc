"use client";

import Link from "next/link";
import { useFavorites, useHydrated } from "../lib/useFavorites";
import { MovieCard } from "./MovieCard";

function FavoriteSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid animate-pulse grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`overflow-hidden rounded-lg bg-zinc-900 ${i < 2 ? "" : i === 2 ? "hidden sm:block" : "hidden lg:block"}`}
        >
          <div className="aspect-2/3 bg-zinc-800" />
          <div className="h-17" />
        </div>
      ))}
    </div>
  );
}

export function FavoritesList() {
  const { favorites } = useFavorites();
  const hydrated = useHydrated();

  if (!hydrated) return <FavoriteSkeleton />

  if (favorites.length === 0) {
    return (
      <p>
        Você ainda não tem favoritos.{" "}
        <Link href="/" className="underline">
          Explore os filmes
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {favorites.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
