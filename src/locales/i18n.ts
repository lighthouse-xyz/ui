import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enAku from "./en/aku.json";
import enCommon from "./en/common.json";

export const defaultNS = "common";

export const resources = {
  en: {
    common: enCommon,
    aku: enAku,
  },
};

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    ns: ["common", "aku"],
    debug: process.env.REACT_APP_ENV !== "prod",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    defaultNS,
    resources,
  })
  .catch(e => {
    // eslint-disable-next-line no-console
    console.error(e);
  });

export default i18n;
