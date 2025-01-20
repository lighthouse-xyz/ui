import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Container, Link, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AkuChapterName } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";

const StoryIntroduction: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation("aku");

  const isSmallView = useMediaQuery(theme.breakpoints.down("sm"));

  const paragrapheKeys = ["intro.paraph1", "intro.paraph2", "intro.paraph3", "intro.paraph4"];

  return (
    <Container id="section1" maxWidth="mdLg">
      <Stack
        paddingY={{ xs: 25, smMd: 50 }}
        justifyContent={{ xs: "center", md: "space-between" }}
        spacing={10}
        textAlign={{ xs: "center", md: "left" }}
        direction={{ xs: "column", md: "row" }}>
        <Typography
          fontSize={{ xs: "36px", sm: "40px" }}
          lineHeight={{ xs: "46px", sm: "51px" }}
          noWrap={!isSmallView}
          minWidth="fit-content">
          {t("intro.title")}
        </Typography>

        <Stack spacing={6} maxWidth="560px" alignSelf="center">
          {paragrapheKeys.map(key => (
            <Typography key={`aku-intro-paragraph-${key}`} fontSize="20px" lineHeight="28px">
              <Trans
                i18nKey={key}
                ns="aku"
                components={{
                  LinkNftNyc: (
                    <Link
                      color="common.white"
                      onClick={() => navigate(paths.akuChapter.buildPath(AkuChapterName.nftNyc))}
                      href="#"
                    />
                  ),
                  LinkNftParis: (
                    <Link
                      color="common.white"
                      onClick={() => navigate(paths.akuChapter.buildPath(AkuChapterName.nftParis))}
                      href="#"
                    />
                  ),
                  LinkEthDenver: (
                    <Link
                      color="common.white"
                      onClick={() => navigate(paths.akuChapter.buildPath(AkuChapterName.ethDenver))}
                      href="#"
                    />
                  ),
                }}
              />
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default StoryIntroduction;
