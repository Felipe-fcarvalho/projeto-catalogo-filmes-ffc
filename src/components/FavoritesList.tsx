"use client"

import Link from "next/link"
import { useFavorites } from "../lib/useFavorites"
import { MovieCard } from "./MovieCard"

export function FavoritesList() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (<p>Você ainda não tem favoritos.{" "} 
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
        <MovieCard key={movie.id} movie={movie}/>
      ))}
    </div>
  )
}
