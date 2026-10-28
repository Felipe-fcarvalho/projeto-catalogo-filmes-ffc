import type { Metadata } from "next";
import { FavoritesList } from "@/src/components/FavoritesList";

export const metadata: Metadata = { title: "Meus favoritos" };

export default function FavoritosPage() { 
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Meus favoritos</h1>
      <FavoritesList />
    </main>
  )
}