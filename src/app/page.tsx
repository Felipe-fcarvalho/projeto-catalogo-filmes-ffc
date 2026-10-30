import { Suspense } from "react";
import { MovieList } from "../components/MovieList";
import { ListSkeleton } from "../components/ListSkeleton";


type Props = {
  searchParams: Promise<{ page?: string; q?: string }>;
};

export default function Home({ searchParams }: Props) {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <Suspense fallback={<ListSkeleton />}>
        <MovieList searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
