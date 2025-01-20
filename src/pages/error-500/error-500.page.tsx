import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import ErrorPage from "@src/components/layout/error-page/error-page.component";

const Error500: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(-1);
  };

  return (
    <ErrorPage
      errorLogo={500}
      title={t("error.500.title")}
      subtitle={t("error.500.subtitle")}
      button={{ label: t("cta.refreshPage"), onClick: handleClick }}
    />
  );
};

export default Error500;
