describe('Package home page tests', () => {
  beforeEach(() => {
    cy.visit('/packages/mock-package1');
  });

  it('has the correct page title', () => {
    cy.title().should('eq', 'Mock Package1 - Dummy Data Docs');
  });
});
