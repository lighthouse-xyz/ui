import React from "react";

import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import useDate from "@src/hooks/utils/use-date.hook";

interface Props {
  nextStartAt: Date;
  nextFinishAt?: Date;
  live?: boolean;
  allDay?: boolean;
  includeYear?: boolean;
}

const DateTime: React.FC<Props> = ({ nextStartAt, nextFinishAt, live, allDay = false, includeYear = false }) => {
  const theme = useTheme();

  const { isToday, formatDates } = useDate();

  const today = isToday(nextStartAt);
  const datesFormatted = formatDates({ nextStartAt, nextFinishAt }, { includeTime: true, allDay, includeYear });

  return (
    <>
      {today || live ? (
        // eslint-disable-next-line no-magic-numbers
        <Typography variant="caption" color={theme.palette.pink?.[500]} textTransform="uppercase">
          {datesFormatted}
        </Typography>
      ) : (
        <Typography variant="caption">{datesFormatted}</Typography>
      )}
    </>
  );
};

export default DateTime;
