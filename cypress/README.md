# Cypress tests for ui-website

Create end to end tests using [Cypress](https://docs.cypress.io/guides/overview/why-cypress).

## Installation

Cypress is pre-installed with every install of the root project.

## Test environments

Cypress will run against the specific environment you decide to test.

- local: http://localhost:3000 (your local branch of the app must be ready and running)
- dev: https://lighthouse-frontend-dev.uc.r.appspot.com
- prod: https://lighthouse-frontend-prod.uc.r.appspot.com

(can be tweaked in cypress.config.ts file)

## Usage

You can choose to start Cypress by either:

- opening the Cypress App
- or running your tests headlessly inside the terminal.

### - With the Cypress App

Ideal for the creation and debugging. Tests will hot-reload on change. In the main cypress directory, run:

#### `npm run cy:open:<your-selected-env>`

- this will launch the Cypress app in a new window, choose E2E testing, then Chrome
- you'll see the list of the available tests to execute and watch

### - Headlessy

Headless tests are executed all at once without opening the Cypress app, in your terminal. This is how tests are run in our CI. In the main cypress directory, run:

#### `npm run cy:run:<your-selected-env>`

- this will execute all the tests inside your terminal and create media files, and snippets of what happened during them.

## Test files and recommendations

Tests should only live under the /e2e folder, organized by features or pages.

- A page-type test should include tests specific to the page in isolation (all features of the profile page, notifications page...).
- A feature-type test targets elements of the app that are not related to a page context like menu, searchbar, cookie banner...

## Pending issues

### none
