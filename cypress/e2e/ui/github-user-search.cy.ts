/**
 * GitHub User Search UI Automated Test Suite
 *
 * This test covers:
 * 1. Navigating to the GitHub User Search app
 * 2. Searching for the user 'rodkawaura'
 * 3. Validating the user's avatar image exists in the results
 */

/// <reference types="cypress" />

describe('GitHub User Search UI Test', () => {
  const url = 'https://gh-users-search.netlify.app/';
  const username = 'rodkawaura';
  const avatarUrl = 'https://avatars.githubusercontent.com/u/67190927?v=4';

  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit(url);
  });

  it('should search for rodkawaura and validate the avatar image exists', () => {
    cy.get('input[data-testid="search-bar"]').should('be.visible').clear().type(username);
    cy.contains('button[type="submit"]', 'search', { matchCase: false }).should('be.visible').click();
    cy.get(`img[src="${avatarUrl}"][alt="Rodrigo Kawaura Montemor"]`, { timeout: 10000 }).should('exist');
  });

  /**
   * Test: Click follow link and validate GitHub username span exists
   */
  it('should click the follow link and validate the GitHub username span exists', () => {
    cy.get('input[data-testid="search-bar"]').should('be.visible').clear().type(username);
    cy.contains('button[type="submit"]', 'search', { matchCase: false }).should('be.visible').click();
    cy.contains('a', 'follow', { timeout: 10000 })
      .should('have.attr', 'href', 'https://github.com/rodkawaura')
      .should('be.visible')
      .invoke('removeAttr', 'target')
      .click();
    cy.origin('https://github.com', () => {
      cy.contains('span', 'rodkawaura', { timeout: 10000 }).should('exist');
    });
  });
});
