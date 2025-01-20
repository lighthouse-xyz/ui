import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";

import { PageMetadataContext } from "./page-metadata-context";
import { defaultMetadataImage } from "@src/assets/hosted-assets";
import { PageMetadata } from "@src/common/interfaces/page-metadata.interface";
import { PropsWithChildren } from "@src/common/interfaces/props-with-children.interface";
import paths from "@src/common/paths";

const PageMetadataContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const params = useParams();
  const location = useLocation();

  const defaultMetadata: PageMetadata = {
    title: t("metadata.main.title"),
    description: t("metadata.main.description"),
    image: defaultMetadataImage,
  };

  const overrideStaticPageMetadataMap: { [key in keyof typeof paths]?: PageMetadata } = {
    [paths.akuLanding]: { title: t("metadata.aku.title"), description: t("metadata.aku.description") },
    [paths.claimHandle]: { title: t("metadata.main.pageTitle", { page: t("handle.claim.label") }) },
    [paths.events]: { title: t("metadata.main.pageTitle", { page: t("events.label") }) },
    [paths.godMode]: { title: t("metadata.main.pageTitle", { page: t("godMode.label") }) },
    [paths.home]: {},
    [paths.interested]: { title: t("metadata.main.pageTitle", { page: t("interested.label") }) },
    [paths.jumpHistory]: { title: t("metadata.main.pageTitle", { page: t("jumpHistory.label") }) },
    [paths.landing]: {},
    [paths.lightkeeperLeaderboard]: {
      title: t("metadata.main.pageTitle", { page: t("lightkeeperStats.leaderboard.label") }),
    },
    [paths.lightkeeperStats]: { title: t("metadata.main.pageTitle", { page: t("lightkeeperStats.label") }) },
    [paths.likes]: { title: t("metadata.main.pageTitle", { page: t("likes.label") }) },
    [paths.notifications]: { title: t("metadata.main.pageTitle", { page: t("notifications.label") }) },
    [paths.people]: { title: t("metadata.main.pageTitle", { page: t("people.label") }) },
    [paths.places]: { title: t("metadata.main.pageTitle", { page: t("places.label") }) },
    [paths.settings]: { title: t("metadata.main.pageTitle", { page: t("settings.label") }) },
    [paths.yourEvents]: { title: t("metadata.main.pageTitle", { page: t("events.yourEvents.label") }) },
    [paths.yourPlaces]: { title: t("metadata.main.pageTitle", { page: t("places.yourPlaces.label") }) },

    [paths.error404]: {},
    [paths.error500]: {},
    [paths.lostInTheMetaverse]: {},
  };

  const basePath = Object.values(params).reduce(
    (path, param) => path?.replace(`/${param as string}`, ""),
    location.pathname,
  );

  const [metadata, setMetadata] = useState<PageMetadata>(
    overrideStaticPageMetadataMap[basePath as keyof typeof paths] ?? {},
  );

  useEffect(() => {
    const staticPageMetadata = overrideStaticPageMetadataMap[basePath as keyof typeof paths];
    if (staticPageMetadata) {
      setMetadata({ ...defaultMetadata, ...staticPageMetadata });
    }
  }, [location]);

  const pageMetadataContextValue = useMemo(
    () => ({ pageMetadata: metadata, setDynamicPageMetadata: setMetadata }),
    [metadata, setMetadata],
  );

  return <PageMetadataContext.Provider value={pageMetadataContextValue}>{children}</PageMetadataContext.Provider>;
};

export default PageMetadataContextProvider;
