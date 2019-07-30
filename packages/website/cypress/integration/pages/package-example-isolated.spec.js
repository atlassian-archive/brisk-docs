describe('Package isolated example page tests', () => {
  beforeEach(() => {
    cy.visit('/packages/mock-package-1/examples/isolated/example1');
  });

  it('has the correct page title', () => {
    cy.title().should('eq', 'Complete Config Project');
  });
});
