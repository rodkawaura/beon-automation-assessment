/**
 * Petstore API - Pet CRUD Automated Test Suite
 *
 * This suite covers:
 * 1. All CRUD actions for the Pet resource (Create, Read, Update, Delete)
 * 2. Positive scenarios: verifies required fields, status codes, and response bodies
 * 3. Negative scenarios: missing/invalid parameters, non-existent resources
 * 4. Best practices: clear structure, shared data, and maintainable code
 * 5. Each test is documented with its intent
 */

/// <reference types="cypress" />

describe('Petstore API', () => {
  // Shared test data
  let createdPetId: number;
  const randomId = Math.floor(Math.random() * 1e9);
  let petstoreData: any;

  before(() => {
    cy.fixture('petstoredata.json').then((data) => {
      petstoreData = data.petstoreData;
    });
  });

  describe('CRUD actions', () => {
    /**
     * Test: Create a new pet with all required fields
     * Verifies: 200 status, response body contains correct data
     */
    it('should create a new pet with required fields', () => {
      const petData = {
        id: randomId,
        name: 'TestPet',
        ...petstoreData
      };
      cy.request('POST', '/pet', petData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body.name).to.eq(petData.name);
        expect(response.body.photoUrls).to.deep.eq(petData.photoUrls);
        expect(response.body.status).to.eq(petData.status);
        createdPetId = response.body.id;
      });
    });

    /**
     * Test: Get the created pet by ID
     * Verifies: 200 status, response body matches created pet
     */
    it('should get the created pet by ID', function () {
      if (!createdPetId) this.skip();
      cy.request('GET', `/pet/${createdPetId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(createdPetId);
        expect(response.body.name).to.eq('TestPet');
      });
    });

    /**
     * Test: Update the pet
     * Verifies: 200 status, response body reflects updated data
     */
    it('should update the pet', function () {
      if (!createdPetId) this.skip();
      const updatedPet = {
        id: createdPetId,
        name: 'UpdatedPet',
        ...petstoreData,
        status: 'pending',
      };
      cy.request('PUT', '/pet', updatedPet).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq('UpdatedPet');
        expect(response.body.status).to.eq('pending');
      });
    });

    /**
     * Test: Delete the pet
     * Verifies: 200 status
     */
    it('should delete the pet', function () {
      if (!createdPetId) this.skip();
      cy.request('DELETE', `/pet/${createdPetId}`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    /**
     * Test: Get the deleted pet (should not exist)
     * Verifies: 404 status
     */
    it('should return 404 for deleted pet', function () {
      if (!createdPetId) this.skip();
      cy.request({
        method: 'GET',
        url: `/pet/${createdPetId}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  describe('Successful API requests', () => {
    /**
     * Test: Create a new pet with all required fields (again, for positive scenario)
     * Verifies: 200 status, response body contains correct data
     */
    it('should create a new pet and verify all required fields', () => {
      const newPetId = Math.floor(Math.random() * 1e9);
      const newPet = { id: newPetId, name: 'AnotherPet', ...petstoreData };
      cy.request('POST', '/pet', newPet).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body.name).to.eq(newPet.name);
        expect(response.body.photoUrls).to.deep.eq(newPet.photoUrls);
        expect(response.body.status).to.eq(newPet.status);
      });
    });
  });

  describe('Invalid API requests', () => {
    /**
     * Test: Create pet with missing required fields
     * Verifies: 400 or 500 status, error message present
     */
    it('should return 400 or 500 for missing required fields', () => {
      const invalidPet = { };
      cy.request({
        method: 'POST',
        url: '/pet',
        body: invalidPet,
        failOnStatusCode: false,
      }).then((response) => {
        expect([400, 500]).to.include(response.status);
        expect(response.body.message || response.body).to.exist;
      });
    });

    /**
     * Test: Update pet with invalid ID
     * Verifies: 400 status, error message present
     */
    it('should return 400 for invalid ID on update', () => {
      const invalidPet = {
        id: 'invalid',
        name: 'InvalidPet',
        ...petstoreData,
        status: 'available',
      };
      cy.request({
        method: 'PUT',
        url: '/pet',
        body: invalidPet,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message || response.body).to.exist;
      });
    });

    /**
     * Test: Get a non-existent pet
     * Verifies: 404 status
     */
    it('should return 404 for getting a non-existent pet', () => {
      cy.request({
        method: 'GET',
        url: '/pet/999999999',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});