import Link from "next/link";

type Props = { page: number; totalPages: number; query?: string };

function href(page: number, query?: string) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  params.set("page", String(page));
  return `/?${params.toString()}`;
}

export function Pagination({ page, totalPages, query }: Props) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Paginação"
      className="mt-8 flex items-center justify-center gap-4"
    >
      {page > 1 && <Link href={href(page - 1, query)}>← Anterior</Link>}
      <span>
        Página {page} de {totalPages}
      </span>
      {page < totalPages && <Link href={href(page + 1, query)}>Próxima →</Link>}
    </nav>
  );
}
