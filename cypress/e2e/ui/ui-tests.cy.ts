/**
 * GitHub User Search UI Automated Test Suite
 *
 * This suite covers:
 * 1. Navigating to the GitHub User Search app
 * 2. Searching for the user 'rodkawaura' and validating the avatar image
 * 3. Clicking the follow link and validating the username span exists on GitHub
 *
 * Author: Rodrigo Kawaura Montemor
 * Date: 2025-09-03
 *
 * Each test is clearly documented for maintainability and clarity.
 */

/// <reference types="cypress" />

describe('GitHub User Search UI Test', () => {
  // Selectors for reuse
  const url = 'https://gh-users-search.netlify.app/';
  const searchBarSelector = 'input[data-testid="search-bar"]';
  const searchBtnSelector = 'button[type="submit"]';
  const followLinkText = 'follow';
  const githubUsernameSpanSelector = 'span';

  let userData: {
    username: string;
    avatarUrl: string;
    avatarAlt: string;
    githubProfileUrl: string;
    githubUsernameText: string;
  };

  before(() => {
    cy.fixture('github-user').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit(url);
  });

  it('should search for the user and validate the avatar image exists', () => {
    cy.get(searchBarSelector).should('be.visible').clear().type(userData.username);
    cy.contains(searchBtnSelector, 'search', { matchCase: false }).should('be.visible').click();
    cy.get(`img[src="${userData.avatarUrl}"][alt="${userData.avatarAlt}"]`, { timeout: 10000 }).should('exist');
  });

  it('should click the follow link and validate the GitHub username span exists', () => {
    cy.get(searchBarSelector).should('be.visible').clear().type(userData.username);
    cy.contains(searchBtnSelector, 'search', { matchCase: false }).should('be.visible').click();
    cy.contains('a', followLinkText, { timeout: 10000 })
      .should('have.attr', 'href', userData.githubProfileUrl)
      .should('be.visible')
      .invoke('removeAttr', 'target')
      .click();
    cy.origin('https://github.com', { args: { selector: githubUsernameSpanSelector, text: userData.githubUsernameText } }, ({ selector, text }) => {
      cy.contains(selector, text, { timeout: 10000 }).should('exist');
    });
  });
});
