export function SearchBar({ defaultValue }: { defaultValue?: string }) {
  return (
    <form action="/" role="search" className="mb-6 flex gap-2">
      <label htmlFor="q" className="sr-only">Buscar filme</label>
      <input
        id="q"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Buscar filme"
        className="flex-1 rounded-lg bg-zinc-900 px-4 py-2"
      />
      <button type="submit" className="rounded-lg bg-zinc-700 px-4 py-2">
        Buscar
      </button>
    </form>
  );
}
