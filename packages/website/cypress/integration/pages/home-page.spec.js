describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have a favicon', () => {
    cy.get('link[type="image/x-icon"]')
      .should('have.attr', 'href', '/static/favicon.ico')
      .should('have.attr', 'rel', 'icon');
  });
});
