describe('Docs page tests', () => {
    beforeEach(() => {
        cy.visit('/docs');
    });

    it('should navigate to docs README', () => {
        cy.get('div[role=rowgroup]').within(() => {
            cy.get('[href="/docs/README"]').click();
        });
        cy.url().should('eq', `${Cypress.config().baseUrl}/docs/README`);
    });

    it('should expand Guides and navigate to a doc page', () => {
        cy.get('div[role=rowgroup]').within(() => {
            cy.get('[aria-label="Expand"]').click({ force: true });
            cy.get('[href="/docs/guides/how-to-be-accomplished"]').click();
        });

        cy.url().should('include', 'guides/how-to-be-accomplished');

        cy.go('back');
        cy.url().should('eq', `${Cypress.config().baseUrl}/docs`);
    });

    it('should expand Guides, expand Nifty Tricks and navigate to a doc page', () => {
        cy.get('div[role=rowgroup]').within(() => {
            cy.get('[aria-label="Expand"]').click({ force: true });
            cy.get('[aria-label="Expand"]').click({ force: true });
            cy.get('[href="/docs/guides/nifty-tricks/staying-at-netherfield"]').click();
        });

        cy.url().should('include', 'guides/nifty-tricks/staying-at-netherfield');
        cy.go('back');
        cy.url().should('eq', `${Cypress.config().baseUrl}/docs`);
    });
});
