describe('Package isolated example page tests', () => {
  beforeEach(() => {
    cy.visit('/packages/mock-package1/examples/isolated/example1');
  });

  it('has the correct page title', () => {
    cy.title().should('eq', 'Dummy Data Docs');
  });
});
