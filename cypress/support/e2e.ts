/* eslint-disable @typescript-eslint/naming-convention */
// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//\
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "cypress-localstorage-commands";
import "./commands";

import { localStorageKeys } from "../../src/utils/local-storage.util";

export type GlobalEnvVariables = {
  baseUrl: string;
  /**
   * Custom and unlimited-use token for dev and prod server environments:
   *
   * In a "isCypressContext" mode, this token is attached to all our GraphQl requests.
   */
  token: string;
  apiUser: string;
  apiDiscovery: string;
};

export type Environments = { local: GlobalEnvVariables; dev: GlobalEnvVariables; prod: GlobalEnvVariables };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Bypasses the standard Privy's login and token generation because you cannot signin with Privy during with Cypress.
       */
      mockUserSession(): Chainable<void>;
      /**
       * Programmatic authentication during tests (only in the dev env).
       *
       * Bypasses the must google-signed-in access to our dev front-end environments.
       *
       * Check https://docs.cypress.io/guides/end-to-end-testing/google-authentication.
       */
      devGcpAuthentication(): Chainable<void>;
      /**
       * Custom command to set launchdarkly feature flag values.
       * @example cy.updateFeatureFlags({ 'flag-name': false})
       */
      updateFeatureFlags(values: { [key: string]: boolean }): Chainable<Element>;
    }
    interface PluginConfigOptions {
      env: {
        executionEnv: string;
        environments: Environments;
      };
    }
    interface Cypress {
      /**
       * GCP credential "Client ID" in lighthouse-frontend-dev.
       */
      env(key: "googleClientId"): string;
      /**
       * GCP credential "Client Secret" in lighthouse-frontend-dev.
       */
      env(key: "googleClientSecret"): string;
      /**
       * Check https://docs.cypress.io/guides/end-to-end-testing/google-authentication#Using-the-Google-OAuth-20-Playground-to-Create-Testing-Credentials
       *
       * The refreshToken is strictly bounded to the test user google account.
       */
      env(key: "googleRefreshToken"): string;
      /**
       * The environment arg within npm run command when you executed `npm run cy:run:<your-selected-env>`.
       */
      env(key: "executionEnv"): "local" | "dev" | "prod";
      env(key: "environments"): Environments;
    }
  }
}

before(() => {
  cy.setLocalStorage(localStorageKeys.onboarding, "false");
  cy.setLocalStorage(localStorageKeys.cookiesDisabled, "false");
  cy.setLocalStorage(localStorageKeys.isCypressContext, "true");
  cy.saveLocalStorage();
});

beforeEach(() => {
  cy.viewport("macbook-16");
  cy.restoreLocalStorage();
  cy.updateFeatureFlags({ newOnboarding: false, oldOnboarding: true });

  if (Cypress.env("executionEnv") === "dev") {
    cy.devGcpAuthentication();
  }
});

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from failing the test
  return false;
});
