describe('Docs page tests', () => {
  beforeEach(() => {
    cy.visit('/docco');
  });

  it('should navigate to docs README', () => {
    cy.get('div[role=rowgroup]').within(() => {
      cy.get('[href="/docco/README"]').click();
    });
    cy.url().should('eq', `${Cypress.config().baseUrl}/docco/README`);
  });

  it('should expand Guides and navigate to a doc page', () => {
    cy.get('div[role=rowgroup]').within(() => {
      cy.get('[aria-label="Expand"]').click({ force: true });
      cy.get('[href="/docco/guides/how-to-be-accomplished"]').click();
    });

    cy.url().should('include', 'guides/how-to-be-accomplished');

    cy.go('back');
    cy.url().should('eq', `${Cypress.config().baseUrl}/docco`);
  });

  it('should expand Guides, expand Nifty Tricks and navigate to a doc page', () => {
    cy.get('div[role=rowgroup]').within(() => {
      cy.get('[aria-label="Expand"]').click({ force: true });
      cy.get('[aria-label="Expand"]').click({ force: true });
      cy.get(
        '[href="/docco/guides/nifty-tricks/staying-at-netherfield"]',
      ).click();
    });

    cy.url().should('include', 'guides/nifty-tricks/staying-at-netherfield');
    cy.go('back');
    cy.url().should('eq', `${Cypress.config().baseUrl}/docco`);
  });
});
