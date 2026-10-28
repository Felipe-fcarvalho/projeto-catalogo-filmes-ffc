"use client";

import { useFavorites } from "../lib/useFavorites";
import type { Movie } from "../lib/movie";

export function FavoriteButton({ movie }: { movie: Movie }) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(movie.id);

  return (
    <button
      type="button"
      onClick={() => toggle(movie)}
      aria-pressed={active}
      className="mt-4 rounded-lg bg-zinc-700 px-4 py-2 hover:bg-zinc-600 cursor-pointer"
    >
      {active ? "★ Remover dos favoritos" : "☆ Adicionar aos favoritos"}
    </button>
  );
}
