function FavoritesSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid animate-pulse grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={1}
          className={`overflow-hidden rounded-lg bg-zinc-900 ${i < 2 ? "" : i === 2 ? "hidden sm:block" : "hidden lg:block"}`}
        >
          <div className="aspect-2/3 bg-zinc-800" />
          <div className="h-17" />
        </div>
      ))}
    </div>
  );
}
