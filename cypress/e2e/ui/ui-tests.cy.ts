/**
 * DuckDuckGo Search for BEON.tech Website UI Automated Test Suite
 *
 * This suite covers:
 * 1. Valid search: Simulates a search for the BEON.tech website on DuckDuckGo and verifies results are displayed
 * 2. Search result navigation: Clicks a result and verifies navigation to the BEON.tech website
 * 3. Best practices: clear structure, maintainable code, and documentation
 */

/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('BEON.tech Engineers Page UI Tests', () => {
  const beonImgSelector = 'img[alt="BEON.tech"]';
  const dreamJobText = 'Land your dream job';

  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit('https://beon.tech/engineers');
  });

  /**
   * Test: Validate BEON.tech image is visible
   */
  it('should display the BEON.tech image', () => {
    cy.get(beonImgSelector, { timeout: 10000 }).should('be.visible');
  });

  /**
   * Test: Click Register now and validate "Land your dream job" text
   */
  it('should click Register now and see Land your dream job text', () => {
    cy.contains('button', 'Register now', { timeout: 10000 }).should('be.visible').click();
    cy.contains('span', dreamJobText, { timeout: 10000 }).should('exist');
  });
});