describe('Package docs page tests', () => {
  beforeEach(() => {
    cy.visit('/packages/mock-package1/docs/extended-info');
  });

  it('has the correct page title', () => {
    cy.title().should('eq', 'Dummy Data Docs - Extended Info');
  });
});
