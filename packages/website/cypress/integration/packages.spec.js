describe.skip('Packages home page tests', () => {
  beforeEach(() => {
    cy.visit('/packages');
  });

  // TODO
  it('should navigate to to each package from the nav bar', () => {});

  it('should navigate to to each package from the packages table', () => {
    // Mock package 1
    cy.get('table')
      .get('a')
      .contains('Mock Package1')
      .click();
    cy.url().should('include', '/packages/mock-package1');
    cy.get('[data-testid=mock-package1-header]').within(() => {
      cy.contains('Mock Package 1');
      cy.contains('Examples');
      cy.contains('Documentation');
    });
    cy.get('[data-testid=mock-package1-metadata]').within(() => {
      cy.contains('Latest version');
    });
    cy.go('back');

    // Mock package 2
    cy.get('table')
      .get('a')
      .contains('Mock Package2')
      .click();

    cy.url().should('include', '/packages/mock-package2');
    cy.get('[data-testid=mock-package2-header]').within(() => {
      cy.contains('Mock Package 2');
      cy.contains('Examples');
      cy.contains('Documentation');
    });
    cy.get('[data-testid=mock-package2-metadata]').within(() => {
      cy.contains('Latest version');
    });
    cy.go('back');

    // Mock package 3
    cy.get('table')
      .get('a')
      .contains('Mock Package3')
      .click();

    cy.url().should('include', '/packages/mock-package3');
    cy.get('[data-testid=mock-package3-header]').within(() => {
      cy.contains('Mock Package 3');
      cy.contains('Examples');
      cy.contains('Documentation');
    });
    cy.get('[data-testid=mock-package3-metadata]').within(() => {
      cy.contains('Latest version');
    });
    cy.go('back');
  });
});

describe.skip('Individual package home page tests', () => {
  it('should navigate from the package home page to the examples page', () => {
    cy.visit('/packages/mock-package2');

    cy.get('[data-testid=mock-package2-header]')
      .contains('Examples')
      .click();

    cy.url().should('include', 'packages/mock-package2/examples');
  });

  it('should navigate from the package home page to the documentation page', () => {
    cy.visit('/packages/mock-package2');

    cy.get('[data-testid=mock-package2-header]')
      .contains('Documentation')
      .click();

    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}/packages/mock-package2/docs`,
    );
    cy.go('back');
    cy.url().should('eq', `${Cypress.config().baseUrl}/packages/mock-package2`);
    cy.go('forward');
    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}/packages/mock-package2/docs`,
    );
  });
});

describe.skip('Examples page tests', () => {
  beforeEach(() => {
    cy.viewport(2880, 1800);
  });

  it('should navigate to the package example', () => {
    cy.visit('/packages/mock-package2/examples');

    cy.get('table')
      .get('a')
      .contains('example1')
      .click();

    cy.url().should('include', 'packages/mock-package2/examples/example1');
    cy.contains('Full page view');
    cy.get('[data-testid=example-source-code');
  });

  it('should navigate to the full page view for the package', () => {
    cy.visit('/packages/mock-package2/examples/example1');

    cy.contains('Full page view').click();

    cy.url().should(
      'eq',
      `${
        Cypress.config().baseUrl
      }/packages/mock-package2/examples/isolated/example1`,
    );
    cy.go('back');
    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}/packages/mock-package2/examples/example1`,
    );
  });
});
