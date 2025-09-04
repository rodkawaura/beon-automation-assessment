# BEON Automation Assessment

This repository contains automated UI and API tests for BEON.tech and related applications using Cypress (TypeScript).

## 🚀 Getting Started

### 1. Clone the Repository

```
git clone https://github.com/rodkawaura/beon-automation-assessment.git
cd beon-automation-assessment/my-cypress-project
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) (v16+) and [npm](https://www.npmjs.com/) installed.

```
npm install
```

### 3. Set Up Cypress

Cypress is already configured in this project. No extra setup is needed.

- To open the Cypress Test Runner (GUI):
  ```
  npx cypress open
  ```
- To run all tests in headless mode:
  ```
  npx cypress run
  ```

## 🧪 Running API Tests (Petstore)

The API tests require a local instance of the Swagger Petstore API. You need [Docker](https://www.docker.com/products/docker-desktop/) installed.

1. Pull the Petstore Docker image:
   ```
   docker pull swaggerapi/petstore3:unstable
   ```
2. Run the Petstore API locally:
   ```
   docker run --name swaggerapi-petstore3 -d -p 8080:8080 swaggerapi/petstore3:unstable
   ```
3. Run the API tests:
   - In the Cypress Test Runner, select `cypress/e2e/api/api-tests.cy.ts`
   - Or run headless:
     ```
     npx cypress run --spec cypress/e2e/api/api-tests.cy.ts
     ```

## 🧪 Running UI Tests

- In the Cypress Test Runner, select any test in `cypress/e2e/ui/`
- Or run all UI tests headless:
  ```
  npx cypress run --spec "cypress/e2e/ui/*.cy.ts"
  ```

## 📊 Cypress HTML Reporting (Mochawesome)

This project uses [Mochawesome](https://github.com/adamgruber/mochawesome) to generate HTML test reports.

### How to View the Report Locally

1. After running tests with `npx cypress run`, open the HTML report:
   - Navigate to `cypress/reports/mochawesome.html` and open it in your browser.

2. To generate the report manually (if needed):
   ```
   npx mochawesome-merge cypress/reports/*.json | npx mochawesome-report-generator --reportDir cypress/reports --reportFilename mochawesome.html
   ```

### In CI
- The HTML report will be available as a downloadable artifact in the GitHub Actions workflow run (see the Actions tab after a run).

## 📂 Project Structure

- `cypress/e2e/api/` - API test specs
- `cypress/e2e/ui/`  - UI test specs
- `cypress/fixtures/` - Test data (JSON)
- `cypress/support/`  - Cypress support files
- `.gitignore`        - Files/folders excluded from git

## 📝 Notes
- Ensure Docker is running before executing API tests.
- UI tests use live web applications and may be affected by network or site changes.
- All test data is managed in the `cypress/fixtures/` folder for easy updates.

---

Feel free to open issues or submit pull requests for improvements!