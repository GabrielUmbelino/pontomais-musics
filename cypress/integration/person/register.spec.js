context('Person register', () => {
  it.only('Render person form', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('Adicionar').click()
    cy.get('.title').contains('Cadastro de Pessoa')
    cy.get('[placeholder=CPF]').type('08077953999');
    cy.get('select').select('male')
    cy.get('[placeholder="Data de Nascimento"]').type('30091993');
    cy.get('[placeholder="Nome"]').type('Usuario Teste');
    cy.get('[placeholder="Email"]').type('gabrielo@gmail.com');
    cy.contains('Próximo').click()

    cy.contains('Adicionar Endereço').click()
    cy.get('[placeholder=CEP]').type('81170680');
    cy.get('[placeholder="Endereço"]').type('rua numero zero');
    cy.get('[placeholder="Número"]').type('0');
    cy.get('[placeholder=Estado]').type('PR');
    cy.get('[placeholder=Cidade]').type('Curitiba');
    cy.get('.buttons .button.is-primary').click()
    cy.contains('Salvar').click()

    cy.get('.table tbody tr:first-child td:first-child').contains('Usuario Teste');
    cy.get('.table tbody tr:first-child td:last-child .buttons .is-danger').click();
    cy.get('.table tbody tr:first-child td:first-child').should('not.contain', 'Usuario Teste');
  });
})
