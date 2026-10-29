import { posterUrl } from "./movie";

describe("posterUrl", () => { 
  it("monta a URL do TMDB com o tamanho padrão", () => {
    expect(posterUrl("/abc.jpg")).toBe("https://image.tmdb.org/t/p/w500/abc.jpg");
  });

  it("aceita outro tamanho", () => { 
    expect(posterUrl("/abc.jpg", "w185")).toBe(
      "https://image.tmdb.org/t/p/w185/abc.jpg",
    );
  });

  it("devolve a imagem de reserva quando não há pôster", () => {
    expect(posterUrl(null)).toBe("/sem-poster.svg");
  });
});