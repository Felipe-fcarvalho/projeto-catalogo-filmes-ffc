import type { Ordem } from "./movie"

export type ListParams = {
  q?: string;
  genero?: number;
  ordem?: Ordem;
  page?: number;
};

export function listHref({ q, genero, ordem, page }: ListParams) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (genero) params.set("genero", String(genero));
  if (ordem && ordem !== "popular") params.set("ordem", ordem);
  if (page) params.set("page", String(page));
  return `/?${params.toString()}`;
}
