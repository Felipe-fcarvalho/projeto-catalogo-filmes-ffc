import Link from "next/link";
import type { Ordem } from "../lib/movie";
import { listHref } from "../lib/url";
import { PageSelect } from "./PageSelect";

type Props = {
  page: number;
  totalPages: number;
  query?: string;
  genero?: number;
  ordem?: Ordem;
};

const linkClass = "rounded-lg px-3 py-2 hover:bg-zinc-800";

export function Pagination({ page, totalPages, query, genero, ordem }: Props) {
  if (totalPages <= 1) return null;
  const base = { q: query, genero, ordem };

  return (
    <nav
      aria-label="Paginação"
      className="mt-8 flex items-center justify-center gap-4"
    >
      {page > 1 && (
        <Link
          href={listHref({ ...base, page: page - 1 })}
          className={linkClass}
        >
          ← Anterior
        </Link>
      )}
      <PageSelect page={page} totalPages={totalPages} params={base} />
      {page < totalPages && (
        <Link
          href={listHref({ ...base, page: page + 1  })}
          className={linkClass}
        >
          Próxima →
        </Link>
      )}
    </nav>
  );
}
