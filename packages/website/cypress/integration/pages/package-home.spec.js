describe('Package home page tests', () => {
  beforeEach(() => {
    cy.visit('/packages/mock-package-1');
  });

  it('has the correct page title', () => {
    cy.title().should('eq', 'Mock Package 1 - Dummy Data Docs');
  });
});
