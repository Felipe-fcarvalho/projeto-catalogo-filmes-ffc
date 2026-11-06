import type { Genre, Ordem } from "../lib/movie"

type Props = {
  query?: string;
  genres: Genre[];
  genero?: number;
  ordem: Ordem;
};

const selectClass = "rounded-lg bg-zinc-900 px-3 py-2";

export function SearchBar({ query, genres, genero, ordem }: Props){
  return (
    <form action="/" role="search" className="mb-2 flex flex-wrap gap-2">
      <label htmlFor="q" className="sr-only">
        Buscar filme
      </label>
      <input type="search" name="q" id="q" defaultValue={query} placeholder="Buscar filme" className="min-w-48 flex-1 rounded-lg bg-zinc-900 px-4 py-2" />

      <label htmlFor="genero" className="sr-only">
        Gênero
      </label>
      <select name="genero" id="genero" defaultValue={genero ?? ""} className={selectClass}>
        <option value="">Todos os gêneros</option>
        {genres.map((g) => (
          <option value={g.id} key={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <label htmlFor="ordem" className="sr-only">
        Ordem por
      </label>
        <select name="ordem" id="ordem" defaultValue={ordem} className={selectClass}>
          <option value="popular">Populares</option>
          <option value="alta">Em alta na semana</option>
          <option value="avaliados">Mais bem avaliados</option>
        </select>

        <button type="submit" className="rounded-lg bg-zinc-700 px-4 py-2 cursor-pointer hover:bg-zinc-800">
          Filtrar
        </button>
    </form> 
  )
}
