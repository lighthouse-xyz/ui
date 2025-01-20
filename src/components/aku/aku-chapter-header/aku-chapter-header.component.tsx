import React from "react";
import { Trans, useTranslation } from "react-i18next";

import { akuChaptersData } from "../aku-chapters-data.const";
import AkuHeader from "../aku-header/aku-header.component";
import { ButtonsContainer } from "./aku-chapter-header.style";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { AkuChapterName } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";
import SignInButton from "@src/components/aku/sign-in-button/sign-in-button.component";
import BackButton from "@src/components/common/back-button/back-button.component";
import { useAuthContext } from "@src/context/auth/auth-context";

interface Props {
  chapterId: AkuChapterName;
}

const AkuChapterHeader: React.FC<Props> = ({ chapterId }) => {
  const { t } = useTranslation("aku");
  const { connected, logUserOut } = useAuthContext();

  const chapterData = akuChaptersData.find(chapter => chapter.chapterId === chapterId) ?? akuChaptersData[0];

  const topContent = (
    <Stack direction="row" spacing={8} width="100%" justifyContent="space-between" alignContent="center">
      <BackButton
        label="Back"
        destination={paths.akuLanding}
        size="large"
        color="inherit"
        sx={{ fontSize: "18px", lineHeight: "24px" }}
      />
      <ButtonsContainer direction="row" spacing={{ xs: 2, sm: 8 }}>
        <SignInButton displayInfo="string" />
        {connected && (
          <Button variant="outlined" color="secondary" size="large" onClick={logUserOut}>
            {t("cta.signOut")}
          </Button>
        )}
      </ButtonsContainer>
    </Stack>
  );

  return (
    <AkuHeader
      title={<Trans i18nKey="chapter.label" ns="aku" components={{ sup: <sup /> }} values={{ no: chapterData.no }} />}
      subtitle={t("chapter.subtitle")}
      topContent={topContent}
    />
  );
};

export default AkuChapterHeader;
