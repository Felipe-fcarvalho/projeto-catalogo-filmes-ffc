"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold">Algo deu errado</h1>
      <p className="mt-2 text-zinc-400">
        Não foi possível carregar os dados agora.
      </p>
      <button onClick={reset} className="mt-4 rounded-lg bg-zinc-700 px-4 py-2">
        Tentar novamente
      </button>
    </main>
  );
}
