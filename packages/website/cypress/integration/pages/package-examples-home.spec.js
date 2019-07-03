describe('Package examples home page tests', () => {
  beforeEach(() => {
    cy.visit('/packages/mock-package-1/examples');
  });

  it('has the correct page title', () => {
    cy.title().should('eq', 'Examples - Dummy Data Docs');
  });
});
