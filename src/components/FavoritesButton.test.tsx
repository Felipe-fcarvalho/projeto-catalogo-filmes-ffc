import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Movie } from "../lib/movie";
import { FavoriteButton } from "./FavoriteButton";

const movie: Movie = {
  id: 550,
  title: "Clube da Luta",
  overview: "Um homem insone cria um clube secreto.",
  poster_path: "/abc.jpg",
  release_date: "1999-10-15",
  vote_average: 8.4,
};

const saved = () => JSON.parse(localStorage.getItem("favoritos") ?? "[]");

beforeEach(() => localStorage.clear());

describe("FavoriteVButton", () => {
  it("adiciona e remove o filme dos favoritos", async () => {
    const user = userEvent.setup();
    render(<FavoriteButton movie={movie}/>);

    const add = screen.getByRole("button", { name: /adicionar aos favoritos/i });
    expect(add).toHaveAttribute("aria-pressed", "false");

    await user.click(add);
    const remove = screen.getByRole("button", { name: /remover dos favoritos/i });
    expect(remove).toHaveAttribute("aria-pressed", "true");
    expect(saved()).toHaveLength(1);

    await user.click(remove);
    expect(screen.getByRole("button", { name: /adicionar aos favoritos/i })).toBeInTheDocument();
    expect(saved()).toHaveLength(0);
  });

  it("começa marcado quando o filme já é favorito", () => {
    localStorage.setItem("favoritos", JSON.stringify([movie]));
    render(<FavoriteButton movie={movie}/>);
    expect(screen.getByRole("button", { name: /remover dos favoritos/i })).toBeInTheDocument();
  });
});