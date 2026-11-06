import { sortearFilme } from "../app/actions";
import type { Genre } from "../lib/movie";

export function SortearForm({ genres }: { genres: Genre[] }){
  return (
    <form action={sortearFilme} className="flex flex-wrap items-center gap-3">
      <label htmlFor="sorteio-genero" className="sr-only">
        Gênero do sorteio
      </label>
      <select
        name="genero"
        id="sorteio-genero"
        defaultValue=""
        className="rounded-lg bg-zinc-900 px-3 py-2"
      >
        <option value="">Qualquer gênero</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="cursor-pointer rounded-lg bg-zinc-700 px-5 py-2 font-semibold hover:bg-zinc-600"
      >
        🎲 Sortear um filme
      </button>
    </form>
  );
}