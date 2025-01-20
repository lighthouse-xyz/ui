import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { CircularProgress, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import useGetLightkeeperPayPeriods from "@src/hooks/user/use-get-lightkeeper-pay-periods.hook";
import { add } from "date-fns";
import { format } from "fecha";
import { ArrowDown2 } from "iconsax-react";

export const allTimeOptionValue = "allTime";

interface Props {
  userId: string;
  periodSelected: string | undefined;
  loadingPeriods: boolean;
  setPeriodSelected: (period: string) => void;
  setLoadingPeriods: (loading: boolean) => void;
}

const PeriodSelect: React.FC<Props> = ({
  userId,
  loadingPeriods,
  periodSelected,
  setPeriodSelected,
  setLoadingPeriods,
}) => {
  const { t } = useTranslation("common", { keyPrefix: "lightkeeperStats" });
  const location = useLocation();

  const state = location.state as { payPeriod: string } | undefined;
  const allTimeOption = { id: allTimeOptionValue, label: t("howYoureDoing.allTime") };

  const [payPeriodOptions, setPayPeriodOptions] = useState([allTimeOption]);

  const { loading } = useGetLightkeeperPayPeriods({
    variables: { userId },
    onCompleted: data => {
      const payPeriods = data.lightkeeperPayPeriods.payPeriods;
      if (payPeriods?.length) {
        const options = [allTimeOption];
        payPeriods.reverse().forEach(period => {
          const normalizedDate = add(new Date(period), { minutes: new Date(period).getTimezoneOffset() });
          options.push({ id: period, label: format(normalizedDate, "MMMM YYYY") });
        });
        setPayPeriodOptions(options);
        setPeriodSelected(state?.payPeriod ?? options[1].id);
      } else {
        setPayPeriodOptions([allTimeOption]);
        setPeriodSelected(allTimeOptionValue);
      }
    },
    onError: () => {
      setPayPeriodOptions([allTimeOption]);
      setPeriodSelected(allTimeOptionValue);
    },
  });

  useEffect(() => {
    setLoadingPeriods(loading);
  }, [loading]);

  return loading ? (
    <></>
  ) : (
    <Select
      value={periodSelected}
      IconComponent={props =>
        loadingPeriods ? <CircularProgress size="24px" {...props} /> : <ArrowDown2 {...props} />
      }
      disabled={loadingPeriods}
      onChange={(event: SelectChangeEvent<string>) => setPeriodSelected(event.target.value)}>
      {payPeriodOptions.map(option => (
        <MenuItem key={`lightkeeper-pay-period-option-${option.id}`} value={option.id}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default PeriodSelect;
