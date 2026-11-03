import { listHref } from "./url";

describe("listHref", () => {
  it("monta a URL com busca e página", () => {
    expect(listHref({ q: "matrix", page: 2 })).toBe("/?q=matrix&page=2");
  });

  it("inclui gênero e ordem", () => {
    expect(listHref({ genero: 28, ordem: "avaliados", page: 3 })).toBe("/?genero=28&ordem=avaliados&page=3")
  });

  it("omite a ordem padrão", () => {
    expect(listHref({ ordem: "popular", page: 1 })).toBe("/?page=1");
  });
})