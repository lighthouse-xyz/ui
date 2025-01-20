import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { akuChaptersData } from "../aku-chapters-data.const";
import { ContainerWrapper, ScrollMenuContainer } from "./select-adventure.style";
import { Box, Container, Stack, Typography } from "@mui/material";
import { AkuChapterStatus } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";
import LeftArrowButton from "@src/components/entities/entity-card-carousel/left-arrow-button/left-arrow-button.component";
import RightArrowButton from "@src/components/entities/entity-card-carousel/right-arrow-button/right-arrow-button.component";

const SelectAdventure: React.FC = () => {
  const { t } = useTranslation("aku");
  const navigate = useNavigate();

  const getHeader = (): JSX.Element => {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={6}
        flexWrap="nowrap"
        maxWidth="90vw">
        <Typography
          fontSize={{ xs: "36px", sm: "40px" }}
          lineHeight={{ xs: "46px", sm: "51px" }}
          textAlign={{ xs: "center", sm: "start" }}>
          {t("selectAdventure")}
        </Typography>

        <Stack spacing={2} direction="row" alignItems="center" display={{ xs: "none", sm: "flex" }} flexWrap="nowrap">
          <LeftArrowButton />
          <RightArrowButton />
        </Stack>
      </Stack>
    );
  };

  return (
    <ContainerWrapper
      paddingBottom={{ xs: 20, smMd: 40 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      maxWidth="100vw">
      <Container maxWidth="mdLg">
        <ScrollMenuContainer paddingLeft="24px">
          <ScrollMenu Header={getHeader}>
            {akuChaptersData.map(chapter => (
              <Box
                key={`aku-chapter-${chapter.chapterId}`}
                minWidth={{ xs: "298px", smMd: "596px" }}
                minHeight={{ xs: "135px", smMd: "270px" }}
                onClick={() => navigate(paths.akuChapter.buildPath(chapter.chapterId))}
                className="ticket">
                {chapter.ticket(chapter.expired ? AkuChapterStatus.expired : undefined)}
              </Box>
            ))}
          </ScrollMenu>
        </ScrollMenuContainer>
      </Container>
    </ContainerWrapper>
  );
};

export default SelectAdventure;
