export function ListSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      <div className="mb-6 h-9 w-64 rounded bg-zinc-800"></div>
      <div className="mb-6 h-10 rounded-lg bg-zinc-900"></div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="aspect-2/3 rounded-lg bg-zinc-900"/>
        ))}
      </div>
    </div>
  )
}