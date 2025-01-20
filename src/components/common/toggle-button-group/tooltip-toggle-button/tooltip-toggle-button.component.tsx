import React, { forwardRef, PropsWithChildren } from "react";

import ToggleButton, { ToggleButtonProps } from "@mui/material/ToggleButton";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";

interface TooltipToggleButtonProps extends ToggleButtonProps {
  tooltipProps: Omit<TooltipProps, "children">;
}

const TooltipToggleButton: React.ForwardRefExoticComponent<PropsWithChildren<TooltipToggleButtonProps>> = forwardRef(
  function tooltipToggleButton(
    { tooltipProps, children, ...props }: PropsWithChildren<TooltipToggleButtonProps>,
    ref,
  ): JSX.Element {
    return (
      <Tooltip {...tooltipProps}>
        <ToggleButton ref={ref} {...props}>
          {children}
        </ToggleButton>
      </Tooltip>
    );
  },
);

export default TooltipToggleButton;
