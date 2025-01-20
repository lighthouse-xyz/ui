import React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { PropsWithChildren } from "@src/common/interfaces/props-with-children.interface";

const FormDateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>;
};

export default FormDateProvider;
