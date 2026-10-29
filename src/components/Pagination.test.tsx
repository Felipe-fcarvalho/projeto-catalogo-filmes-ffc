import { render, screen } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("não aparece quando há uma página só", () => {
    const { container } = render(<Pagination page={1} totalPages={1} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("não mostra 'Anterior' na primeira página", () => {
    render(<Pagination page={1} totalPages={3} />);
    expect(screen.queryByRole("link", { name: /anterior/i })).toBeNull();
    expect(screen.getByRole("link", { name: /próxima/i })).toBeInTheDocument();
  });

  it("não mostra 'Próxima' na última página", () => {
    render(<Pagination page={3} totalPages={3} />);
    expect(screen.queryByRole("link", { name: /próxima/i })).toBeNull();
  });

  it("mantém a busca nos links", () => {
    render(<Pagination page={2} totalPages={5} query="matrix" />);
    expect(screen.getByRole("link", { name: /próxima/i })).toHaveAttribute("href", "/?q=matrix&page=3");
    expect(screen.getByRole("link", { name: /anterior/i })).toHaveAttribute("href", "/?q=matrix&page=1");
  });
});