context('Person list', () => {
  it('Render person list', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.title').contains('Cadastro de Pessoas')
    cy.get('.table tbody tr td').should('exist');
    cy.get('.pagination-list li .button.is-current').should('exist');
  });
})
