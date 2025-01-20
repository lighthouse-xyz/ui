import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { akuChaptersData } from "../aku-chapters-data.const";
import Spheres from "../spheres/spheres.component";
import { ChapterImage, ChapterNumber, NextButton } from "./chapter-content.style";
import { Box, Container, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { ReactComponent as ArrowRight } from "@src/assets/icons/literal-arrow-right-icon.svg";
import { AkuChapterName } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";

interface Props {
  chapterId: AkuChapterName;
}

const ChapterContent: React.FC<Props> = ({ chapterId }) => {
  const { t } = useTranslation("aku");
  const navigate = useNavigate();

  const chapterData = akuChaptersData.find(chapter => chapter.chapterId === chapterId) ?? akuChaptersData[0];

  const handleNextChapter = (): void => {
    const nextChapter = akuChaptersData.find(chapter => chapter.no === chapterData.no + 1);
    if (nextChapter) {
      navigate(paths.akuChapter.buildPath(nextChapter.chapterId));
    }
  };

  return (
    <Container maxWidth="mdLg">
      <Stack
        direction={{ xs: "column", mdLg: "row" }}
        justifyContent={{ xs: "flex-start", mdLg: "space-between" }}
        spacing={{ xs: 11, smMd: 20 }}
        paddingBottom={{ xs: 20, smMd: 40 }}>
        <Stack spacing={{ xs: 8, smMd: 12 }}>
          <Typography fontSize={{ xs: "24px", smMd: "40px" }} lineHeight={{ xs: "30px", smMd: "51px" }}>
            {"(Chapter)"}
          </Typography>
          <ChapterNumber
            width={{ xs: "80px", smMd: "120px", mdLg: "212px" }}
            height={{ xs: "80px", smMd: "120px", mdLg: "212px" }}>
            <Typography fontSize={{ xs: "36px", mdLg: "64px" }}>{chapterData.no}</Typography>
          </ChapterNumber>
        </Stack>

        <Stack spacing={12} maxWidth={{ mdLg: "764px" }}>
          <Typography fontSize={{ xs: "24px", smMd: "40px" }} lineHeight={{ xs: "30px", smMd: "51px" }}>
            {"(Synopsis)"}
          </Typography>
          <Typography
            fontSize={{ xs: "32px", smMd: "73px", md: "110px" }}
            lineHeight={{ xs: "32px", smMd: "73px", md: "110px" }}>
            {t(chapterData.title)}
          </Typography>
          <Stack position="relative" spacing={4} width="100%" height="100%">
            {chapterData.paragraphs.map((paragraph, index) => (
              <Typography
                key={`chapter-${chapterId}-paragraph-${index}`}
                component="div"
                fontSize={{ xs: "16px", smMd: "24px" }}
                lineHeight={{ xs: "20px", smMd: "28px" }}>
                <Trans i18nKey={paragraph} ns="aku" />
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Stack>

      <Box alignItems="center" paddingBottom={25}>
        <Box alignItems="center" maxHeight="834px" maxWidth="1280px">
          <ChapterImage src={chapterData.image} />
        </Box>
      </Box>

      {Object.keys(akuChaptersData).length >= chapterData.no + 1 && (
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 15, md: 25 }}
          alignItems="center"
          justifyContent={{ md: "space-between" }}
          paddingBottom={{ xs: 15, sm: 40 }}
          paddingX={{ sm: 14 }}>
          <Spheres maxHeight="155px" maxWidth="466px" padding={0} flexGrow={1} />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexGrow={1}
            spacing={4}
            alignSelf="stretch">
            <Typography
              fontSize={{ xs: "24px", sm: "40px" }}
              lineHeight={{ xs: "31px", sm: "51px" }}
              whiteSpace="pre-line">
              <Trans
                i18nKey="chapter.goToChapter"
                ns="aku"
                components={{ sup: <sup /> }}
                values={{ no: chapterData.no + 1 }}
              />
            </Typography>
            <NextButton
              sx={{ width: { xs: "64px", sm: "76px" }, height: { xs: "64px", sm: "76px" } }}
              onClick={handleNextChapter}>
              <ArrowRight />
            </NextButton>
          </Stack>
        </Stack>
      )}
    </Container>
  );
};

export default ChapterContent;
