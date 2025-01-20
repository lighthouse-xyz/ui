import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { InView } from "react-intersection-observer";

import { allTimeOptionValue } from "../period-select/period-select.component";
import ReferredUserRow from "./referred-user-row/referred-user-row.component";
import { NetworkStatus } from "@apollo/client";
import {
  Box,
  Collapse,
  Divider,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactComponent as HelpIcon } from "@src/assets/icons/help-circle-icon.svg";
import Alert from "@src/components/common/alert/alert.component";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import NoResultsFound from "@src/components/common/no-results-found/no-results-found.component";
import { FullWidthTableCell } from "@src/components/common/table/table.component";
import { StyledTableHeadRow, TableSeparate } from "@src/components/common/table/table.style";
import useReferredUserStats from "@src/hooks/user/use-referred-user-stats.hook";
import useDate from "@src/hooks/utils/use-date.hook";
import useFetchMore from "@src/hooks/utils/use-fetch-more.hook";
import { getLocalStorage, localStorageKeys, setLocalStorage } from "@src/utils/local-storage.util";
import { ArrowUp3, MoneyAdd } from "iconsax-react";

interface Props {
  userId: string;
  periodSelected?: string;
}

const YourReferrals: React.FC<Props> = ({ userId, periodSelected }) => {
  const topReferralsWithDoubleRewards = 50;
  const { t } = useTranslation("common", { keyPrefix: "lightkeeperStats" });
  const { palette } = useTheme();
  const { getDaysFromNow } = useDate();

  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysUntilEndMonth = -getDaysFromNow(lastDayOfMonth);

  const [isAlertDismissed, setIsAlertDismissed] = useState(() =>
    getLocalStorage<boolean>(localStorageKeys.referralsAlertDismissed, false),
  );

  useEffect(
    () => setLocalStorage<boolean>(localStorageKeys.referralsAlertDismissed, isAlertDismissed),
    [isAlertDismissed],
  );

  const where =
    periodSelected && periodSelected !== allTimeOptionValue ? { payPeriodStartAt: periodSelected } : undefined;
  const { data, loading: loadingReferrals, error, networkStatus, fetchMore } = useReferredUserStats({ userId, where });
  const { fetchMoreItems } = useFetchMore(fetchMore, "referrals");
  const isFetchingMore = networkStatus === NetworkStatus.fetchMore;
  const referredUserList = data?.referrals.list;
  const loading = (loadingReferrals && !referredUserList) || isFetchingMore;
  const totalCount: number = data?.referrals.totalCount ?? 0;
  const noReferrals = (!referredUserList && !error && !loading) || (!!referredUserList && totalCount === 0);

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Typography variant="h7">{t("referrals.label")}</Typography>
        <Typography variant="h9" color="text.secondary">
          {t("daysUntilNextCycle", { count: daysUntilEndMonth })}
        </Typography>
      </Stack>

      <Collapse in={!isAlertDismissed}>
        <Alert
          icon={<MoneyAdd />}
          color="info"
          content={t("referrals.alert50referrals")}
          onClose={() => setIsAlertDismissed(true)}
          sx={{ marginTop: 4, alignItems: "center" }}
        />
      </Collapse>

      <TableContainer component={Paper} elevation={0} sx={{ paddingTop: 4 }}>
        <TableSeparate aria-label="referrals table">
          <TableHead>
            <StyledTableHeadRow>
              <TableCell size="small">{t("column.user")}</TableCell>
              <TableCell size="small">{t("column.points")}</TableCell>
              <TableCell size="small">{t("column.earned")}</TableCell>
              <TableCell size="small">{t("column.progress")}</TableCell>
              <TableCell size="small" sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {t("column.daysLeft.label")}
                <Tooltip title={t("column.daysLeft.tooltip")} arrow placement="right">
                  <HelpIcon color={palette.action.active} width="18px" height="18px" />
                </Tooltip>
              </TableCell>
              <TableCell size="small" />
            </StyledTableHeadRow>
          </TableHead>
          {!!referredUserList && !loading && totalCount > 0 && (
            <TableBody>
              {referredUserList.map((referredUserStats, index) => (
                <Fragment key={`referred-user-stats-${referredUserStats.profile.userId}`}>
                  <ReferredUserRow referredUserStats={referredUserStats} />
                  {referredUserList.length - topReferralsWithDoubleRewards === index + 1 && (
                    <TableRow sx={{ "& td": { border: "0" }, borderBottom: `solid 8px ${palette.background.paper}` }}>
                      <FullWidthTableCell>
                        <Divider>
                          <Stack direction="row" spacing={1} alignItems="center" color="text.disabled">
                            <ArrowUp3 variant="Bold" />
                            <Stack>
                              <Typography variant="subtitle2" color="text.disabled">
                                {t("referrals.doubledRewards")}
                              </Typography>
                              <Typography variant="caption" fontStyle="italic" color="text.disabled">
                                {t("referrals.nbReferrals", { count: topReferralsWithDoubleRewards })}
                              </Typography>
                            </Stack>
                            <ArrowUp3 variant="Bold" />
                          </Stack>
                        </Divider>
                      </FullWidthTableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            </TableBody>
          )}
        </TableSeparate>

        {fetchMore && !isFetchingMore && (
          <InView
            onChange={inView => {
              if (inView && data?.referrals.pageInfo?.hasNextPage) {
                fetchMoreItems({ offset: referredUserList?.length });
              }
            }}
          />
        )}
      </TableContainer>

      {loading && (
        <Box display="flex" alignSelf="center">
          <LoadingIndicator />
        </Box>
      )}

      {noReferrals && (
        <Box display="flex" alignSelf="center">
          <NoResultsFound title={t("referrals.noReferrals.title")} subtitle={t("referrals.noReferrals.subtitle")} />
        </Box>
      )}
    </Stack>
  );
};

export default YourReferrals;
