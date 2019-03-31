describe('Docs page tests', () => {
  beforeEach(() => {
    cy.visit('/docs/guides/how-to-be-accomplished');
  });

  it('has the correct page title', () => {
    cy.title().should('eq', 'Dummy Data Docs - How To Be Accomplished');
  });
});
