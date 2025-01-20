import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Collapse,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TableCell,
  Typography,
  useTheme,
} from "@mui/material";
import { ReferredUserStats } from "@src/common/graphql/generated/user.schema.graphql";
import { FullWidthTableCell, UserTableCell } from "@src/components/common/table/table.component";
import { StyledTableRow } from "@src/components/common/table/table.style";
import { ArrowDown2, ArrowUp2, Slash, TickCircle } from "iconsax-react";

type Steps = Record<string, { key: keyof ReferredUserStats; label: string }>;

interface Props {
  referredUserStats: ReferredUserStats;
}

const ReferredUserRow: React.FC<Props> = ({ referredUserStats }) => {
  const maxPercentage = 100;

  const { palette } = useTheme();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const steps: Steps = t("lightkeeperStats.referrals.steps", { returnObjects: true });
  const progressAsPercentage = Math.round(referredUserStats.progress * maxPercentage);
  const progressValue = Math.min(progressAsPercentage, maxPercentage);

  return (
    <>
      <StyledTableRow>
        <UserTableCell profile={referredUserStats.profile} />
        <TableCell>{referredUserStats.pointsEarned}</TableCell>
        <TableCell>{`$${referredUserStats.dollarsEarned}`}</TableCell>
        <TableCell>
          <Stack direction="row" spacing={2} alignItems="center">
            <LinearProgress
              variant="determinate"
              color={progressValue === maxPercentage ? "success" : "primary"}
              value={progressValue}
              sx={{ width: "42px" }}
            />
            <Typography variant="body2" color="text.secondary">
              {`${progressAsPercentage}%`}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{referredUserStats.daysLeft}</Typography>
        </TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <ArrowUp2 /> : <ArrowDown2 />}
          </IconButton>
        </TableCell>
      </StyledTableRow>
      <StyledTableRow className="collapse-row">
        <FullWidthTableCell>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List dense>
              {Object.values(steps).map(step => (
                <ListItem
                  key={`referred-user-steps-${step.key}-${referredUserStats.profile.userId}`}
                  sx={{ paddingX: 2 }}>
                  <ListItemIcon>
                    {referredUserStats[step.key] ? (
                      <TickCircle variant="Bold" color={palette.success.light} />
                    ) : (
                      <Slash color={palette.action.active} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={step.label} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </FullWidthTableCell>
      </StyledTableRow>
    </>
  );
};

export default ReferredUserRow;
