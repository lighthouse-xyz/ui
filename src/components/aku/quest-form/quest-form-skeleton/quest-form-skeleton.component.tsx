import React from "react";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { AkuQuest } from "@src/common/graphql/generated/user.schema.graphql";
import { getPalette } from "@src/common/styles/palette";

interface Props {
  questsGroupedByDay: Record<string, AkuQuest[]>;
}

const QuestFormSkeleton: React.FC<Props> = ({ questsGroupedByDay }) => {
  const backgroundColor = getPalette("dark").palette.action?.disabledBackground;

  return (
    <Stack spacing={8} flexGrow={1}>
      {Object.entries(questsGroupedByDay).map(([day, quests]) => (
        <Stack key={`skeleton-day-${day}`} spacing={2}>
          <Skeleton variant="rounded" height={28} width={70} sx={{ backgroundColor, marginLeft: 5 }} />
          <Stack spacing={4}>
            {quests.map(quest => (
              <Stack key={`skeleton-day-${day}-${quest.questId}`} spacing={2}>
                <Skeleton variant="rounded" height={28} width={300} sx={{ backgroundColor, marginLeft: 5 }} />
                <Stack direction="row" spacing={4} alignItems="center">
                  <Skeleton variant="rounded" height={56} width="90%" sx={{ backgroundColor, borderRadius: "40px" }} />
                  <Skeleton variant="circular" height={56} width={56} sx={{ backgroundColor }} />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default QuestFormSkeleton;
