Cypress.Commands.add('getTestElement', selector => cy.get(`[data-testid=${selector}]`));
