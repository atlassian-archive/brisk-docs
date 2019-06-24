describe('Docs page tests', () => {
  beforeEach(() => {
    cy.visit('/docs/guides/how-to-be-accomplished');
  });

  it('has the correct page title', () => {
    cy.visit('/docs/guides/nifty-tricks/staying-at-netherfield');
    cy.title().should('eq', 'Dummy Data Docs - Staying At Netherfield');
  });

  it('has the correct page title for page with custom title', () => {
    cy.visit('/docs/guides/how-to-be-accomplished');
    cy.title().should('eq', 'Dummy Data Docs - Being accomplished');
  });
});
