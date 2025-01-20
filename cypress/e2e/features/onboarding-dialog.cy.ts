import { cta, onboarding } from "../../../src/locales/en/common.json";
import { localStorageKeys } from "../../../src/utils/local-storage.util";

describe("Onboarding dialog", () => {
  beforeEach(() => {
    cy.updateFeatureFlags({ newOnboarding: false, oldOnboarding: true });
  });

  it("Shows each step of the onboarding flow", () => {
    cy.setLocalStorage(localStorageKeys.onboarding, "true").then(() => {
      cy.visit("/home");
      cy.contains("Welcome to the Lighthouse portal!");
      cy.contains(cta.next).click();

      cy.contains(onboarding.jump.title);
      cy.contains(cta.next).click();

      cy.contains(onboarding.follow.title);
      cy.contains(cta.next).click();

      cy.contains(onboarding.editGate.title);
      cy.contains(cta.next).click();

      cy.contains(onboarding.extension.title);
      cy.get('[role="presentation"]').contains(cta.openChromeStore);
      cy.get('[role="presentation"]').contains(cta.gotIt).click();
    });
  });

  it("Closes the onboarding popup", () => {
    cy.setLocalStorage(localStorageKeys.onboarding, "true").then(() => {
      cy.visit("/home");
      cy.get('[data-testid="dialogframe-close-button"]').click();
      cy.get('[data-testid="onboarding-dialog"]').should("not.exist");
    });
  });
});
