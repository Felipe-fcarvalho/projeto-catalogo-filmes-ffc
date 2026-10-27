export function DetailsSkeleton(){
  return (
    <div className="flex animate-pulse flex-col gap-8 md:flex-row">
      <div className="aspect-2/3 w-full max-w-xs rounded-lg bg-zinc-800" />
      <div className="flex-1 space-y-4">
        <div className="h-8 w-2/3 rounded bg-zinc-800"></div>
        <div className="h-4 w-1/3 rounded bg-zinc-800"></div>
        <div className="h-32 rounded bg-zinc-800"></div>
      </div>
    </div>
  )
}