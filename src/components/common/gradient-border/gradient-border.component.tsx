import React, { PropsWithChildren } from "react";

import { ContainerWithBorder } from "./gradient-border.style";
import { BoxProps, useTheme } from "@mui/material";
import { borderRadius as borderRadiusValues } from "@src/common/styles/style.const";

interface Props extends BoxProps {
  gradient: "lightkeeper" | string;
  borderRadius?: string;
  borderWidth?: number;
  className?: string;
}

const GradientBorder: React.FC<PropsWithChildren<Props>> = ({
  gradient,
  borderRadius = borderRadiusValues.default,
  borderWidth,
  className,
  children,
  ...props
}) => {
  const theme = useTheme();
  const defaultBorderWidth = 4;

  const gradientValue = gradient === "lightkeeper" ? (theme.palette.border.gradient as string) : gradient;

  return (
    <ContainerWithBorder
      className={className}
      gradient={gradientValue}
      borderradius={borderRadius}
      borderwidth={borderWidth ?? defaultBorderWidth}
      {...props}>
      {children}
    </ContainerWithBorder>
  );
};

export default GradientBorder;
