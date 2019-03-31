describe('Package changelog page tests', () => {
  describe('Package with a changelog', () => {
    beforeEach(() => {
      cy.visit('/packages/package-with-changelog/changelog');
    });

    it('has the correct page title', () => {
      cy.title().should('eq', 'Dummy Data Docs - Changelog');
    });
  });

  describe('Package missing a changelog', () => {
    beforeEach(() => {
      cy.visit('/packages/mock-package1/changelog');
    });

    it('has the correct page title', () => {
      cy.title().should('eq', 'Dummy Data Docs - Changelog');
    });
  });
});
