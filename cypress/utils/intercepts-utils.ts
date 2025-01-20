import { QueryNotificationsResults } from "../../src/common/interfaces/query-results.interface";
import { Environments } from "../support/e2e";
import { aliasMutation, hasOperationName } from "./graphql-test-utils";
import { NotificationsResults, ProfileResults, UpdateNotificationSettingsResults } from "./query-results.interface";

const executionEnv = Cypress.env("executionEnv");
const apiUser = Cypress.env("environments")[executionEnv as keyof Environments].apiUser;

export const stubbedProfileFromToken = (stubbedData: ProfileResults): void => {
  cy.intercept("POST", apiUser, req => {
    if (hasOperationName(req, "ProfileFromToken")) {
      req.reply(res => {
        const results = res.body as ProfileResults;
        results.data = stubbedData.data;
      });
    }
  });
};

export const stubbedNotifications = (stubbedData: NotificationsResults): void => {
  cy.intercept("POST", apiUser, req => {
    if (hasOperationName(req, "Notifications")) {
      req.reply(res => {
        const results = res.body as QueryNotificationsResults;
        results.data = stubbedData.data;
      });
    }
  });
};

export const stubbedUpdateNotificationSettings = (stubbedData: UpdateNotificationSettingsResults): void => {
  cy.intercept("POST", apiUser, req => {
    if (hasOperationName(req, "UpdateNotificationSettings")) {
      aliasMutation(req, "UpdateNotificationSettings");
      req.reply(res => {
        const results = res.body as UpdateNotificationSettingsResults;
        results.data = stubbedData.data;
      });
    }
  });
};
