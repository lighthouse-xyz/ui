import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const addRequiredAsterisk = (text: string): string => `${text}*`;

const getInputWithLabelAndHelper = (
  input: JSX.Element,
  label?: string,
  helper?: string | React.ReactElement,
  required?: boolean,
): JSX.Element => (
  <Stack spacing={4}>
    {(!!helper || !!label) && (
      <Stack spacing={1}>
        {!!label && <Typography variant="h7">{required ? addRequiredAsterisk(label) : label}</Typography>}
        {!!helper && (
          <Typography variant="caption" color="text.secondary">
            {helper}
          </Typography>
        )}
      </Stack>
    )}
    {input}
  </Stack>
);

export { addRequiredAsterisk, getInputWithLabelAndHelper };
