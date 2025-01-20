import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

import PeriodSelect, { allTimeOptionValue } from "../period-select/period-select.component";
import YourReferrals from "../your-referrals/your-referrals.component";
import { Button, CircularProgress, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { LightkeeperStatsSummaryFilteringArgs } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";
import { borderRadius } from "@src/common/styles/style.const";
import Alert from "@src/components/common/alert/alert.component";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import useGetLightkeeperStatsSummary from "@src/hooks/user/use-get-lightkeeper-stats-summary.hook";
import useDate from "@src/hooks/utils/use-date.hook";
import { ArrowRight } from "iconsax-react";

interface Props {
  userId: string;
  godMode?: boolean;
}

const HowYoureDoing: React.FC<Props> = ({ userId, godMode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation("common", { keyPrefix: "lightkeeperStats" });
  const { isToday, formatDate } = useDate();

  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [loadingPayPeriods, setLoadingPayPeriods] = useState(true);
  const [payPeriodSelected, setPayPeriodSelected] = useState<string>("");

  const { getStatsSummary, data, loading: loadingStatsSummary, error, refetch } = useGetLightkeeperStatsSummary();
  const statsSummary = data?.lightkeeperStatsSummary || {
    lastUpdatedAt: new Date().toISOString(),
    usersReferred: 0,
    dollarsEarned: 0,
    pointsEarned: 0,
  };

  useEffect(() => {
    setErrorAlertOpen(!!error);
  }, [error]);

  useEffect(() => {
    if (payPeriodSelected) {
      let where: LightkeeperStatsSummaryFilteringArgs | undefined;
      if (payPeriodSelected && payPeriodSelected !== allTimeOptionValue) {
        where = { payPeriodStartAt: payPeriodSelected };
      }
      void getStatsSummary({ variables: { userId, where } });
    }
  }, [payPeriodSelected]);

  const handleViewLeaderboardClick = (): void => {
    godMode
      ? navigate(paths.godModeLightkeeperLeaderboard, { state: { userId, payPeriod: payPeriodSelected } })
      : navigate(paths.lightkeeperLeaderboard, { state: { payPeriod: payPeriodSelected } });
  };

  const getValue = (
    value: number | string,
    title: string,
    size: "small" | "large",
    titleOnTop = false,
    alignItems = "flex-start",
  ): JSX.Element => (
    <Stack alignSelf="flex-start" flexDirection={titleOnTop ? "column-reverse" : "column"} alignItems={alignItems}>
      <Typography variant={size === "small" ? "h4" : "h3"} color="success.main" component="div">
        {loadingStatsSummary ? <CircularProgress color="inherit" size={size === "small" ? "40px" : "56px"} /> : value}
      </Typography>

      <Typography variant={size === "small" ? "h8" : "h7"}>{title}</Typography>
    </Stack>
  );

  const getLastUpdatedAt = (lastUpdatedAt: string): JSX.Element => {
    const date = new Date(lastUpdatedAt);

    if (isToday(date)) {
      return <ReactTimeAgo date={date} locale="en-US" />;
    }

    return <>{formatDate(date, "MMM D YYYY")}</>;
  };

  return (
    <>
      <Stack spacing={4}>
        <Typography variant="h6">{t("howYoureDoing.label")}</Typography>
        {errorAlertOpen && (
          <Alert
            color="error"
            title={t("howYoureDoing.error.title")}
            content={t("howYoureDoing.error.subtitle")}
            action={{ content: t("howYoureDoing.error.cta"), onClick: () => void refetch() }}
            onClose={() => setErrorAlertOpen(false)}
          />
        )}
        <PeriodSelect
          userId={userId}
          periodSelected={payPeriodSelected}
          loadingPeriods={loadingPayPeriods}
          setPeriodSelected={setPayPeriodSelected}
          setLoadingPeriods={setLoadingPayPeriods}
        />
        {loadingPayPeriods ? (
          <LoadingIndicator />
        ) : (
          <Stack
            direction="row"
            justifyContent="space-between"
            bgcolor="success.shades.4p"
            borderRadius={borderRadius.default}
            padding={6}
            paddingTop={4}>
            {!!statsSummary && (
              <>
                <Stack alignItems="flex-start" justifyContent="flex-end">
                  <Typography variant="overline">As of {getLastUpdatedAt(statsSummary.lastUpdatedAt)}</Typography>
                  {getValue(statsSummary.pointsEarned, t("howYoureDoing.yourPoints"), "large", true)}
                </Stack>
                <Stack alignItems="flex-end" spacing={4}>
                  <Button color="success" endIcon={<ArrowRight />} onClick={handleViewLeaderboardClick}>
                    {t("leaderboard.viewLeaderboard")}
                  </Button>
                  <Stack spacing={8} direction="row">
                    {getValue(statsSummary.usersReferred, t("howYoureDoing.usersReferred"), "small")}
                    {getValue(
                      `$${statsSummary.dollarsEarned}`,
                      t("howYoureDoing.totalEarned"),
                      "small",
                      false,
                      "flex-end",
                    )}
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        )}
      </Stack>

      {!loadingPayPeriods && <YourReferrals userId={userId} periodSelected={payPeriodSelected} />}
    </>
  );
};

export default HowYoureDoing;
