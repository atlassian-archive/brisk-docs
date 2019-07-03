describe('Home page tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to the packages page from the packages panel', () => {
    cy.get('[href="/packages"]').click();

    cy.url().should('include', '/packages');

    cy.get('table').within(() => {
      cy.get('a')
        .contains('Mock Package1')
        .should('have.attr', 'href', '/packages/mock-package-1');

      cy.get('a')
        .contains('Mock Package2')
        .should('have.attr', 'href', '/packages/mock-package-2');

      cy.get('a')
        .contains('Mock Package3')
        .should('have.attr', 'href', '/packages/mock-package-3');
    });
    // cy.screenshot('packages-page');
  });

  it('should navigate to the docs page from the docs panel', () => {
    cy.get('[href="docs"]').click();

    cy.url().should('include', '/docs');
    // cy.screenshot('docs-page);
  });
});
