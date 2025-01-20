import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import paths from "@src/common/paths";
import ErrorPage from "@src/components/layout/error-page/error-page.component";

const Error404: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(paths.home);
  };

  return (
    <ErrorPage
      errorLogo={404}
      title={t("error.404.title")}
      subtitle={t("error.404.subtitle")}
      button={{ label: t("cta.goBackHome"), onClick: handleClick }}
    />
  );
};

export default Error404;
