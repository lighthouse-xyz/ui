import { notifications } from "../../../src/locales/en/common.json";
import {
  notificationsSettings,
  notificationsSettingsAlt,
  profileFullFalseSettings,
  profileFullTrueSettings,
  profileMixedSettings,
} from "../../fixtures/notifications/notifications-settings-data";
import { stubbedProfileFromToken, stubbedUpdateNotificationSettings } from "../../utils/intercepts-utils";

describe("Notifications settings page", () => {
  beforeEach(() => {
    cy.mockUserSession();
    cy.visit("/settings?tab=notifications");
  });

  describe("Checked and unchecked status for settings on page load", () => {
    it("Shows all checked if they are all set to true in the profile results", () => {
      stubbedProfileFromToken(profileFullTrueSettings);
      cy.get('[data-testid="notification-settings-item"]').each($setting => {
        cy.wrap($setting).find('[type="checkbox"]').should("be.checked");
      });
    });

    it("Shows a setting as checked if it is set to true in the profile results", () => {
      stubbedProfileFromToken(profileMixedSettings);
      cy.contains(notifications.settings.activity_followingActivity.label)
        .closest('[data-testid="notification-settings-item"]')
        .find('[type="checkbox"]')
        .should("be.checked");

      cy.contains(notifications.settings.activity_eventGoLive.label)
        .closest('[data-testid="notification-settings-item"]')
        .find('[type="checkbox"]')
        .should("be.checked");

      cy.contains(notifications.settings.activity_ownedEntity.label)
        .closest('[data-testid="notification-settings-item"]')
        .find('[type="checkbox"]')
        .should("be.checked");

      cy.contains(notifications.settings.activity_friendActivity.label)
        .closest('[data-testid="notification-settings-item"]')
        .find('[type="checkbox"]')
        .should("be.not.checked");

      cy.contains(notifications.settings.activity_follow.label)
        .closest('[data-testid="notification-settings-item"]')
        .find('[type="checkbox"]')
        .should("be.not.checked");
    });
  });

  describe("Interactions with toggle switches", () => {
    it("Toggles off a setting's status on click and filters the notifications page's list", () => {
      stubbedProfileFromToken(profileFullTrueSettings);
      stubbedUpdateNotificationSettings(notificationsSettings);

      cy.contains(notifications.settings.activity_friendActivity.label)
        .closest('[data-testid="notification-settings-item"]')
        .find('[type="checkbox"]')
        .as("switch");

      cy.get("@switch").uncheck();
      cy.wait("@gqlUpdateNotificationSettingsMutation")
        .its("request.body.variables.input.friendActivity")
        .should("eq", false);
    });

    it("Toggles on a setting's status on click and filters the notifications page's list", () => {
      stubbedProfileFromToken(profileFullFalseSettings);
      stubbedUpdateNotificationSettings(notificationsSettingsAlt);

      cy.contains(notifications.settings.activity_eventGoLive.label)
        .closest('[data-testid="notification-settings-item"]')
        .find('[type="checkbox"]')
        .as("switch");

      cy.get("@switch").check();
      cy.wait("@gqlUpdateNotificationSettingsMutation")
        .its("request.body.variables.input.eventGoLive")
        .should("eq", true);
    });
  });
});
