import React from "react";
import { useTranslation } from "react-i18next";

import Typography from "@mui/material/Typography";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import LikesResultsList from "@src/components/user/likes-results-list/likes-results-list.component";
import { useAuthContext } from "@src/context/auth/auth-context";

const Likes: React.FC = () => {
  const { t } = useTranslation();

  const { profile, loading: profileLoading } = useAuthContext();

  return (
    <>
      {!!profile && (
        <>
          <Typography variant="h5" marginBottom={entitiesResultLayout.titleContentGap}>
            {t("likes.pageTitle")}
          </Typography>
          <LikesResultsList userId={profile.userId} />
        </>
      )}

      {profileLoading && <LoadingIndicator size="70px" />}
    </>
  );
};

export default Likes;
