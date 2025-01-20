import React from "react";

import Typography from "@mui/material/Typography";
import { Currency } from "@src/common/graphql/generated/discovery.schema.graphql";

interface Props {
  price: number;
  currency: Currency;
}

const EntityPrice: React.FC<Props> = ({ price, currency }) => {
  return (
    <Typography variant="subtitle2" color="text.secondary">
      {price} {currency.toUpperCase()}
    </Typography>
  );
};

export default EntityPrice;
