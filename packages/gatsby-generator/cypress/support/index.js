Cypress.Commands.add('getTestElement', selector =>
  cy.get(`[data-testid=${selector}]`),
);

/**
 * Override the visit command to also wait until the client-side code has loaded.
 * This prevents flakiness involving cypress retrieving elements in the SSR'd DOM
 * that then become stale due to the client (React) flushing the DOM with fresh contents.
 * See https://github.com/cypress-io/cypress/issues/695#issuecomment-333154635
 */
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  return originalFn(url, options).get('body[data-client-loaded]');
});
