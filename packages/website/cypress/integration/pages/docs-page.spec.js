describe('Docs page tests', () => {
  it('has the correct page title', () => {
    cy.visit('/docco/guides/nifty-tricks/staying-at-netherfield');
    cy.title().should('eq', 'Staying At Netherfield - Complete Config Project');
  });

  it('has the correct page title for page with custom title', () => {
    cy.visit('/docco/guides/how-to-be-accomplished');
    cy.title().should('eq', 'Being accomplished - Complete Config Project');
  });
});
