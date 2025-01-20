import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import PeriodSelect, { allTimeOptionValue } from "../period-select/period-select.component";
import { Box, Chip, Paper, Stack, TableBody, TableCell, TableContainer, TableHead, Typography } from "@mui/material";
import { LightkeeperLeaderboardFilteringArgs } from "@src/common/graphql/generated/user.schema.graphql";
import { borderRadius } from "@src/common/styles/style.const";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import NoResultsFound from "@src/components/common/no-results-found/no-results-found.component";
import { UserTableCell } from "@src/components/common/table/table.component";
import { StyledTableHeadRow, StyledTableRow, TableSeparate } from "@src/components/common/table/table.style";
import useLightkeeperLeaderboard from "@src/hooks/user/use-lightkeeper-leaderboard.hook";

interface Props {
  userId: string;
}

const LeaderboardTable: React.FC<Props> = ({ userId }) => {
  const topLighkeepers = 10;

  const { t } = useTranslation("common", { keyPrefix: "lightkeeperStats" });

  const [loadingPayPeriods, setLoadingPayPeriods] = useState(false);
  const [payPeriodSelected, setPayPeriodSelected] = useState<string>("");

  const {
    getLeaderboard,
    results: { data, loading: loadingLeaderboard, error },
  } = useLightkeeperLeaderboard();

  const lightkeeperList = data?.leaderboard.list;
  const loading = loadingLeaderboard || loadingPayPeriods;
  const totalCount: number = data?.leaderboard.totalCount ?? 0;
  const noData = !loading && ((!lightkeeperList && !error) || (!!lightkeeperList && totalCount === 0));

  useEffect(() => {
    if (payPeriodSelected) {
      let where: LightkeeperLeaderboardFilteringArgs | undefined;
      if (payPeriodSelected && payPeriodSelected !== allTimeOptionValue) {
        where = { payPeriodStartAt: payPeriodSelected };
      }
      void getLeaderboard({ variables: { first: topLighkeepers, where } });
    }
  }, [payPeriodSelected]);

  return (
    <Stack spacing={4}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">{t("leaderboard.label")}</Typography>
        <Chip
          label={t("leaderboard.top", { count: topLighkeepers }).toUpperCase()}
          color="success"
          sx={{
            width: "66px",
            height: "40px",
            borderRadius: borderRadius.large,
            ".MuiChip-label": { typography: "badgeLabel" },
          }}
        />
      </Stack>

      <PeriodSelect
        userId={userId}
        periodSelected={payPeriodSelected}
        loadingPeriods={loadingPayPeriods}
        setPeriodSelected={setPayPeriodSelected}
        setLoadingPeriods={setLoadingPayPeriods}
      />

      <TableContainer component={Paper} elevation={0}>
        <TableSeparate aria-label="lightkeeper leaderboard table">
          <TableHead>
            <StyledTableHeadRow>
              <TableCell size="small">{t("column.rank")}</TableCell>
              <TableCell size="small">{t("column.user")}</TableCell>
              <TableCell size="small" align="right">
                {t("column.points")}
              </TableCell>
            </StyledTableHeadRow>
          </TableHead>
          {!!lightkeeperList && !loading && totalCount > 0 && (
            <TableBody>
              {lightkeeperList?.map(lightkeeperStats => (
                <StyledTableRow
                  key={`lightkeeper-leaderboard-${lightkeeperStats.lightkeeper.userId}`}
                  color={lightkeeperStats.lightkeeper.userId === userId ? "purple" : undefined}>
                  <TableCell scope="row">{lightkeeperStats.rank}</TableCell>
                  <UserTableCell profile={lightkeeperStats.lightkeeper} />
                  <TableCell align="right">{lightkeeperStats.pointsEarned}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </TableSeparate>
      </TableContainer>

      {loading && (
        <Box display="flex" alignSelf="center">
          <LoadingIndicator size="70px" />
        </Box>
      )}

      {noData && (
        <Box display="flex" alignSelf="center">
          <NoResultsFound title={t("leaderboard.noData")} />
        </Box>
      )}
    </Stack>
  );
};

export default LeaderboardTable;
