// @TODO: fix ts issues on chai assertions
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

// @TODO: absolute import or a way to be accessed globally in each test file
import { cookies, cta } from "../../../src/locales/en/common.json";
import { localStorageKeys } from "../../../src/utils/local-storage.util";

describe("Cookie banner", () => {
  describe("Interactions", () => {
    beforeEach(() => {
      cy.setLocalStorage(localStorageKeys.cookiesDisabled, null).then(() => {
        cy.visit("/home");
      });
    });

    it("Disables cookies on opt-out", () => {
      cy.contains(cookies.cookiesAndYou);
      cy.contains("Our website uses functional and first-party analytics cookies");
      cy.get('[data-testid="cookies-consent-banner"]').find('[type="checkbox"]').click();
      cy.contains(cta.gotIt).click();
      cy.getLocalStorage(localStorageKeys.cookiesDisabled).then($cookiesDisabled => {
        expect($cookiesDisabled).to.equal("true");
      });
    });

    it("Enables cookie consents", () => {
      cy.contains(cta.gotIt).click();
      cy.getLocalStorage(localStorageKeys.cookiesDisabled).then($cookiesDisabled => {
        expect($cookiesDisabled).to.equal("false");
      });
    });
  });

  describe("On page load", () => {
    it("Hides cookie consents banner if already handled", () => {
      cy.setLocalStorage(localStorageKeys.cookiesDisabled, "false");
      cy.visit("/home");
      cy.contains("© 2023 Lighthouse Meta Technologies");
      cy.get('[data-testid="cookies-consent-banner"]').should("not.exist");
    });
  });
});
