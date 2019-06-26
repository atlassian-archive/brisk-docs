describe('Package docs home page tests', () => {
  beforeEach(() => {
    cy.visit('/packages/mock-package1/docs');
  });

  it('has the correct page title', () => {
    cy.title().should('eq', 'Documents - Dummy Data Docs');
  });
});
