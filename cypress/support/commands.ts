// This file is used to define custom Cypress commands. 
// It exports functions that extend the Cypress command interface. 

Cypress.Commands.add('login', (email, password) => {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('logout', () => {
    cy.get('button[data-testid="logout"]').click();
});