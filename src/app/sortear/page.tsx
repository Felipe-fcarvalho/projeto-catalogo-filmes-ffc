import type { Metadata } from "next";
import { SortearForm } from "../../components/SortearForm";
import { getGenres } from "../../lib/tmdb";

export const metadata: Metadata = { title: "Sortear um filme" };

export default async function SortearPage() {
  const genres = await getGenres();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-2 text-3xl font-bold">Sortear um filme</h1>
      <p className="mb-6 text-zinc-300">
        Não sabe o que assistir? Escolha um gênero (ou deixe em qualquer um) e a
        gente sorteia um filme entre os mais votados.
      </p>
      <SortearForm genres={genres} />
    </main>
  );
}
