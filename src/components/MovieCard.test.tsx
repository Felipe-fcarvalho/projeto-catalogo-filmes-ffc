import { render, screen } from "@testing-library/react";
import type { Movie } from "../lib/movie";
import { MovieCard } from "./MovieCard";

const movie: Movie = {
  id: 550,
  title: "Clube da Luta",
  overview: "Um homem insone cria um clube secreto.",
  poster_path: "/abc.jpg",
  release_date: "1999-10-15",
  vote_average: 8.4,
};

describe("MovieCard", ()=> {
  it("mostra título, ano e nota", () => {
    render(<MovieCard movie={movie} />);
    expect(screen.getByText("Clube da Luta")).toBeInTheDocument();
    expect(screen.getByText(/1999/)).toBeInTheDocument();
    expect(screen.getByText(/8\.4/)).toBeInTheDocument();
  });

  it("leva à página de detalhes do filme", () => {
    render(<MovieCard movie={movie} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/filme/550");
  });

  it("descreve o pôster com texto alternativo", () => {
    render(<MovieCard movie={movie} />);
    expect(screen.getByRole("img", { name: /clube da luta/i })).toBeInTheDocument();
  });
});