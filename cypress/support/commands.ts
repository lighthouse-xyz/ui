import { localStorageKeys } from "../../src/utils/local-storage.util";
import { Environments } from "./e2e";

/* eslint-disable @typescript-eslint/naming-convention */
export {};
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

type BodyTypes = {
  grant_type: string;
  client_id: string;
  client_secret: string;
  refresh_token: string;
  audience: string;
  format: string;
};

type ReturnedBodyTypes = {
  access_token: string;
  id_token: string;
};

Cypress.Commands.add("mockUserSession", () => {
  const executionEnv = Cypress.env("executionEnv");
  const token = Cypress.env("environments")[executionEnv as keyof Environments].token;
  cy.log(token);
  cy.setLocalStorage(localStorageKeys.token, `"${token}"`);
});

Cypress.Commands.add("devGcpAuthentication", () => {
  cy.log("Sign-in in to Google Auth programmaticaly");
  cy.request({
    method: "POST",
    url: "https://www.googleapis.com/oauth2/v4/token",
    body: {
      grant_type: "refresh_token",
      client_id: Cypress.env("googleClientId"),
      client_secret: Cypress.env("googleClientSecret"),
      refresh_token: Cypress.env("googleRefreshToken"),
    } as BodyTypes,
  }).then(({ body }: { body: ReturnedBodyTypes }) => {
    const { id_token } = body;
    cy.log(id_token);
    cy.intercept(
      {
        method: "GET",
        path: "/static/**",
      },
      req => {
        req.headers["Proxy-Authorization"] = `Bearer ${id_token}`;
      },
    );
    cy.intercept(
      {
        method: "GET",
        path: "/*",
      },
      req => {
        req.headers["Proxy-Authorization"] = `Bearer ${id_token}`;
      },
    );
  });
});

Cypress.Commands.add("updateFeatureFlags", (featureFlags: { [key: string]: boolean }) => {
  cy.intercept({ hostname: /.*clientstream.launchdarkly.com/ }, req => {
    req.reply("data: no feature flag data here\n\n", {
      "content-type": "text/event-stream; charset=utf-8",
    });
  });

  cy.intercept({ hostname: /.*events.launchdarkly.com/ }, { body: {} });

  cy.intercept({ hostname: /.*app.launchdarkly.com/ }, req => {
    const body = {};
    Object.entries(featureFlags).forEach(([featureFlagName, featureFlagValue]) => {
      body[featureFlagName] = { value: featureFlagValue };
    });
    req.reply({ body });
  });
});
