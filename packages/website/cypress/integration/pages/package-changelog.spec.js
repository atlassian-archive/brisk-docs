describe('Package changelog page tests', () => {
  describe('Package with a changelog', () => {
    beforeEach(() => {
      cy.visit('/packages/package-with-changelog/changelog');
    });

    it('has the correct page title', () => {
      cy.title().should('eq', 'Changelog - Complete Config Project');
    });
  });

  describe('Package missing a changelog', () => {
    beforeEach(() => {
      cy.visit('/packages/mock-package-1/changelog');
    });

    it('has the correct page title', () => {
      cy.title().should('eq', 'Changelog - Complete Config Project');
    });
  });
});
