/* eslint-disable complexity */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { akuChaptersData } from "../aku-chapters-data.const";
import CollapsibleContent from "../collapsible-content/collapsible-content.component";
import SignUpForm from "../sign-up-form/sign-up-form.component";
import QuestFormSkeleton from "./quest-form-skeleton/quest-form-skeleton.component";
import QuestInput from "./quest-input/quest-input.component";
import { Box, ClickAwayListener, Container, Divider, Tooltip, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { AkuChapterName, AkuChapterStatus } from "@src/common/graphql/generated/user.schema.graphql";
import { useAuthContext } from "@src/context/auth/auth-context";
import useGetAkuChapter from "@src/hooks/user/use-get-aku-chapter.hook";
import groupBy from "lodash.groupby";

interface Props {
  chapterId: AkuChapterName;
}

const QuestForm: React.FC<Props> = ({ chapterId }) => {
  const { t } = useTranslation("aku");

  const [openCollpase, setOpenCollapse] = useState(true);
  const [openTooltip, setOpenTooltip] = useState(false);

  const { connected, profile, loading: loadingCurrentProfile } = useAuthContext();
  const { data, loading: loadingQuests, error, refetch } = useGetAkuChapter(chapterId);

  useEffect(() => {
    !!refetch && void refetch();
  }, [connected]);

  const chapterData = akuChaptersData.find(chapter => chapter.chapterId === chapterId) ?? akuChaptersData[0];
  const questsGroupedByDay = groupBy(
    data?.akuChapter.quests?.length ? data?.akuChapter.quests : chapterData.fallbackQuests,
    "day",
  );
  const loading = loadingQuests || loadingCurrentProfile;
  const chapterState = data?.akuChapter.status;
  const questActiveOrUpcoming = chapterState === AkuChapterStatus.active || chapterState === AkuChapterStatus.upcoming;
  const isChapterCompleted =
    data?.akuChapter.quests.findIndex(quest => !quest.answer) === -1 && chapterState === AkuChapterStatus.active;
  const notFound = error?.graphQLErrors?.find(({ message }) => message === "Not Found") && !chapterData.expired;

  return (
    <Container id="section1" maxWidth="mdLg">
      <Stack spacing={20} justifyContent="center" paddingY={{ xs: 25, smMd: 50 }}>
        <Box alignSelf="center" maxHeight="270px" minHeight="135px">
          {chapterData?.ticket(isChapterCompleted ? "completed" : chapterState)}
        </Box>

        {(questActiveOrUpcoming || loading || notFound) && (
          <>
            <Stack>
              <Divider color="white" />
              <CollapsibleContent
                open={openCollpase}
                onClick={() => setOpenCollapse(!openCollpase)}
                title={t("warning.mustSignUp")}
                content={
                  <Box paddingTop={12} color="common.white" maxWidth="455px">
                    <SignUpForm forceDarkMode displayInputLabel />
                  </Box>
                }
              />
              <Divider color="white" />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 15, md: 37 }} width="100%">
              <Stack
                alignSelf={{ xs: "center", md: "start" }}
                textAlign={{ xs: "center", md: "start" }}
                spacing={4}
                maxWidth={{ md: "281px" }}>
                <Typography
                  fontSize={{ xs: "24px", sm: "40px" }}
                  lineHeight={{ xs: "30px", sm: "51px" }}
                  sx={{ textDecorationLine: "underline" }}>
                  {chapterData.destination}
                </Typography>
                <Typography
                  fontSize={{ xs: "24px", sm: "40px" }}
                  lineHeight={{ xs: "30px", sm: "40px" }}
                  fontWeight={400}>
                  {t("questForm.title")}
                </Typography>
              </Stack>

              {loading && <QuestFormSkeleton questsGroupedByDay={questsGroupedByDay} />}

              {!loading && (chapterState === AkuChapterStatus.upcoming || !connected || notFound) && (
                <ClickAwayListener onClickAway={() => setOpenTooltip(false)}>
                  <Tooltip
                    title={
                      chapterState === AkuChapterStatus.upcoming || notFound
                        ? t("warning.huntsNotStarted")
                        : t("warning.mustSignIn")
                    }
                    arrow
                    followCursor
                    open={openTooltip}
                    onClose={() => setOpenTooltip(false)}
                    onOpen={() => setOpenTooltip(true)}>
                    <Stack spacing={8} flexGrow={1}>
                      {Object.entries(questsGroupedByDay).map(([day, quests]) => (
                        <QuestInput
                          key={`${chapterId}-quests-${day}`}
                          quests={quests}
                          day={day}
                          disabled
                          setOpenTooltip={setOpenTooltip}
                        />
                      ))}
                    </Stack>
                  </Tooltip>
                </ClickAwayListener>
              )}

              {!loading && !!profile && chapterState === AkuChapterStatus.active && (
                <Stack spacing={8} flexGrow={1}>
                  {Object.entries(questsGroupedByDay).map(([day, quests]) => (
                    <QuestInput key={`${chapterId}-quests-${day}`} quests={quests} day={day} userId={profile.userId} />
                  ))}
                </Stack>
              )}
            </Stack>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default QuestForm;
