import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { StyledToggleButtonGroup } from "./toggle-button-group.style";
import TooltipToggleButton from "./tooltip-toggle-button/tooltip-toggle-button.component";
import { Box, Collapse, Stack, ToggleButtonGroupProps, Typography } from "@mui/material";
import useLeftDrawer from "@src/hooks/utils/use-left-drawer.hook";

interface ToggleButton<ValueType> {
  value: ValueType;
  icon?: JSX.Element;
  label?: string;
  path?: string;
}

interface Props<ValueType = string> extends ToggleButtonGroupProps {
  buttons: ToggleButton<ValueType>[];
  valueSelected?: ValueType;
  setValueSelected?: (value: ValueType) => void;
  collapsible?: boolean;
}

const ToggleButtonGroup = <ValueType extends string>({
  buttons,
  valueSelected,
  setValueSelected,
  collapsible = false,
  ...props
}: Props<ValueType>): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { collapsed: leftDrawerCollapsed } = useLeftDrawer();

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: ValueType): void => {
    newValue !== null && !!setValueSelected && setValueSelected(newValue);
  };

  return (
    <StyledToggleButtonGroup exclusive value={valueSelected || location.pathname} onChange={handleChange} {...props}>
      {buttons.map(button => (
        <TooltipToggleButton
          key={`toggle-button-${button.value}`}
          tooltipProps={{ title: leftDrawerCollapsed ? button.label : undefined, arrow: true, placement: "top" }}
          value={button.value as string}
          onClick={() => (button?.path ? navigate(button?.path) : undefined)}>
          <Stack direction="row" alignItems="center">
            {!!button.icon && <Box display="flex">{button.icon}</Box>}
            {!!button.label && (
              <Collapse in={!leftDrawerCollapsed || !collapsible} orientation="horizontal">
                <Typography variant="h8" noWrap paddingLeft={2}>
                  {button.label}
                </Typography>
              </Collapse>
            )}
          </Stack>
        </TooltipToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
};

export default ToggleButtonGroup;
