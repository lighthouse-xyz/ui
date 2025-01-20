import React from "react";

import { Image } from "./error-page.style";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import bgImage from "@src/assets/images/error-page-bg-image.svg";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";

export interface ErrorPageButtonProps extends LoadingButtonProps {
  label: string;
  onClick: () => void;
}

interface Props {
  errorLogo: number | string;
  title: string;
  subtitle?: string;
  button?: ErrorPageButtonProps;
  extraContent?: JSX.Element;
  loading?: boolean;
}

const ErrorPage: React.FC<Props> = ({ errorLogo, title, subtitle, button, extraContent, loading }) => {
  const isErrorLogoNumber = typeof errorLogo === "number";

  const getButton = (): JSX.Element | undefined => {
    if (!button) {
      return undefined;
    }

    const { label: buttonLabel, onClick: buttonOnClick, ...buttonProps } = button;

    return (
      <LoadingButton variant="contained" size="large" onClick={buttonOnClick} {...buttonProps}>
        {buttonLabel}
      </LoadingButton>
    );
  };

  return (
    <Box width="100vw" height="100vh" position="relative" overflow="hidden">
      <Image src={bgImage} />

      <Stack
        alignItems="center"
        spacing={6}
        justifyContent="center"
        width="100vw"
        height="100vh"
        position="absolute"
        top={0}
        left={0}>
        {loading ? (
          <LoadingIndicator size="200px" />
        ) : (
          <>
            <Stack spacing={4} alignItems="center">
              {isErrorLogoNumber ? (
                <Typography variant="h1" textAlign="center" color="common.white">
                  {errorLogo}
                </Typography>
              ) : (
                <img src={errorLogo} height="112px" width="112px" />
              )}
              <Typography variant="h5" textAlign="center" color="common.white">
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body1" textAlign="center" color="common.white">
                  {subtitle}
                </Typography>
              )}
            </Stack>

            {getButton()}

            {extraContent}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default ErrorPage;
