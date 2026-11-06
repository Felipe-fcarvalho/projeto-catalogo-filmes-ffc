"use client";

import { useRouter } from "next/navigation";
import { listHref, type ListParams } from "../lib/url";

type Props = {
  page: number;
  totalPages: number;
  params: Omit<ListParams, "page">;
};

export function PageSelect({ page, totalPages, params }: Props) {
  const router = useRouter();

  return (
    <label className="flex items-center gap-2">
      <span>Ir para a página</span>
      <select
        value={page}
        onChange={(e) =>
          router.push(listHref({ ...params, page: Number(e.target.value) }))
        }
        className="select-5 rounded-lg bg-zinc-900 px-3 py-2"
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      <span>de {totalPages}</span>
    </label>
  );
}
