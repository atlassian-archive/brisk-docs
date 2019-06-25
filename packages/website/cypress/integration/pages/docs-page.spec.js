describe('Docs page tests', () => {
  it('has the correct page title', () => {
    cy.visit('/docs/guides/nifty-tricks/staying-at-netherfield');
    cy.title().should('eq', 'Staying At Netherfield - Dummy Data Docs');
  });

  it('has the correct page title for page with custom title', () => {
    cy.visit('/docs/guides/how-to-be-accomplished');
    cy.title().should('eq', 'Being accomplished - Dummy Data Docs');
  });
});
