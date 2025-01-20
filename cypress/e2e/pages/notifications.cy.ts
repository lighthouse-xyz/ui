import { cta, noResults, notifications, warning } from "../../../src/locales/en/common.json";
import {
  allNotifications,
  allUnreadNotifications,
  createdEntityNotification,
  deletedGoliveNotification,
  deletedNotification,
  goLiveEventNotification,
  interestedNotification,
  noNotifications,
  readNotification,
  unreadFollowNotification,
} from "../../fixtures/notifications/notifications-data";
import {
  profileFullFalseSettings,
  profileFullTrueSettings,
} from "../../fixtures/notifications/notifications-settings-data";
import { stubbedNotifications, stubbedProfileFromToken } from "../../utils/intercepts-utils";

describe("Notifications page", () => {
  const notificationBatchCount = 7;
  beforeEach(() => {
    cy.mockUserSession();
    cy.visit("/notifications");
    cy.intercept("https://api.stream-io-api.com/**", {
      statusCode: 200,
      body: {},
    });
  });

  describe("Notification background-color", () => {
    beforeEach(() => {
      stubbedProfileFromToken(profileFullTrueSettings);
    });

    it("Shows the right background-color for an unread notification", () => {
      stubbedNotifications(unreadFollowNotification);
      cy.get('[data-testid="notification-item"]').should("have.length", 1);
      cy.get('[data-testid="notification-item"]').should("have.css", "background-color", "rgba(124, 58, 237, 0.04)");
    });

    it("Shows the right background-color for an read notification", () => {
      stubbedNotifications(readNotification);
      cy.get('[data-testid="notification-item"]').should("have.css", "background-color", "rgba(0, 0, 0, 0)");
    });
  });

  describe("Notifications types", () => {
    beforeEach(() => {
      stubbedProfileFromToken(profileFullTrueSettings);
    });

    it("Shows a follow type notification if the verb is follow", () => {
      stubbedNotifications(unreadFollowNotification);
      cy.get('[data-testid="notification-item"]').contains("agzzz");
      cy.get('[data-testid="notification-item"]').contains("followed you");
    });

    it("Shows an interested type notification if the verb is interested", () => {
      stubbedNotifications(interestedNotification);
      cy.get('[data-testid="notification-item"]').contains("agzzz");
      cy.get('[data-testid="notification-item"]').contains("is interested in an event");
      cy.get('[data-testid="notification-item"]').contains("Stronghold ICE Lounge");
    });

    it("Shows a created type notification if the verb is create", () => {
      stubbedNotifications(createdEntityNotification);
      cy.get('[data-testid="notification-item"]').contains("agzzz");
      cy.get('[data-testid="notification-item"]').contains("has created a new event");
      cy.get('[data-testid="notification-item"]').contains("Some nice event");
    });

    it("Shows a gone live type notification if the verb is goLive", () => {
      stubbedNotifications(goLiveEventNotification);
      cy.get('[data-testid="notification-item"]').contains("An event you're interested in has gone live");
      cy.get('[data-testid="notification-item"]').contains("ARTorDAI: Landlinesart Vs. Sami Sipahioglu");
    });
  });

  describe("Notifications deleted types", () => {
    beforeEach(() => {
      stubbedProfileFromToken(profileFullTrueSettings);
    });

    it("Shows deleted entity mentions if the object and actor type are deletedObject", () => {
      stubbedNotifications(deletedNotification);
      cy.get('[data-testid="notification-item"]').contains("[deleted user]");
      cy.get('[data-testid="notification-item"]').contains("is interested in an event");
      cy.get('[data-testid="notification-item"]').contains("[deleted event]");
    });

    it("Shows a deleted entity mention if an event gone live event is deleted", () => {
      stubbedNotifications(deletedGoliveNotification);
      cy.get('[data-testid="notification-item"]').contains("An event you're interested in has gone live");
      cy.get('[data-testid="notification-item"]').contains("[deleted event]");
    });
  });

  describe("Notifications interactions", () => {
    beforeEach(() => {
      stubbedProfileFromToken(profileFullTrueSettings);
    });

    it("Shows a jump button for an event gone live event", () => {
      stubbedNotifications(goLiveEventNotification);
      cy.get('[data-testid="notification-item"]').get("button").contains(cta.jump);
    });

    it("Shows a follow button if the followers is not a friend", () => {
      stubbedNotifications(unreadFollowNotification);
      cy.get('[data-testid="notification-item"]').get("button").contains(cta.follow);
    });

    it("Shows a Mark as read option & change background-color on click, if the notification is not read yet", () => {
      stubbedNotifications(unreadFollowNotification);
      cy.get('[data-testid="notification-item"]').trigger("mouseover");
      cy.get('[data-testid="notification-item-menu"]').click();
      cy.contains(cta.markRead).click();
      cy.get('[data-testid="notification-item"]').should("have.css", "background-color", "rgba(0, 0, 0, 0)");
    });

    it("Doesn't show a menu, if the notification is already read", () => {
      stubbedNotifications(readNotification);
      cy.get('[data-testid="notification-item"]').trigger("mouseover");
      cy.get('[data-testid="notification-item-menu"]').should("not.exist");
    });

    it("Marks all read a list of unread notifications", () => {
      stubbedNotifications(allUnreadNotifications);
      cy.contains(notifications.markAllRead).click();
      cy.get('[data-testid="notification-item"]').each($notif => {
        cy.wrap($notif).as("notificationItem");
        cy.get("@notificationItem").should("have.css", "background-color", "rgba(0, 0, 0, 0)");
      });
    });

    it("Loads more notifications if you scroll down", () => {
      stubbedNotifications(allNotifications);
      cy.get('[data-testid="notification-item"]').last().as("lastItem");
      cy.get("@lastItem").scrollIntoView({ offset: { top: 150, left: 0 } });
      cy.get('[data-testid="notification-item"]').should("have.length", notificationBatchCount * 2);
    });
  });

  describe("Filtered notifications list from settings", () => {
    beforeEach(() => {
      stubbedProfileFromToken(profileFullFalseSettings);
    });

    it("Shows no notifications informations if all settings are off", () => {
      stubbedNotifications(noNotifications);
      cy.contains(warning.noNotificationsSettings.title);
      cy.contains(noResults.generic.title);
    });
  });
});
