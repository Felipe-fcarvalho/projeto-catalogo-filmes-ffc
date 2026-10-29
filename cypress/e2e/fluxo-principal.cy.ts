describe("Fluxo principal", () => {
  it("busca, abre os detalhes e favorita um filme", () => {
    cy.visit("/");

    cy.get('input[name="q"]').type("matrix{enter}");
    cy.url().should("include", "q=matrix");

    cy.get('a[href^="/filme/"]:visible').first().click();
    cy.url().should("match", /\/filme\/\d+/);

    cy.contains("button", "Adicionar aos favoritos").click();
    cy.contains("button", "Remover dos favoritos").should("exist");

    cy.contains("a", "Favoritos").click();
    cy.url().should("include", "/favoritos");
    cy.contains("h1", "Meus favoritos").should("be.visible");
    cy.get('a[href^="/filme/"]:visible').should("have.length", 1);
  });

  it("mostra a página de não encontrado para um filme inexistente", () => {
    cy.visit("/filme/999999999", { failOnStatusCode: false });
    cy.contains("Filme não encontrado").should("exist");
  });
});