import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { PageItem } from "../left-drawer.component";
import {
  Box,
  Collapse,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

interface Props extends ListItemButtonProps {
  item: PageItem;
  leftDrawerCollapsed: boolean;
  iconColor?: string;
  textColor?: string;
}

const LeftDrawerItem: React.FC<Props> = ({ item, leftDrawerCollapsed, iconColor, textColor, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { t } = useTranslation();

  const isSelected = (paths?: string[]): boolean => !!paths?.includes(location.pathname);

  return (
    <Tooltip
      title={leftDrawerCollapsed ? item.text : item.disabled ? t("warning.needToSignIn.subtitle.generic") : undefined}
      arrow
      placement="right">
      <span>
        <ListItemButton
          selected={isSelected(item.paths)}
          disabled={item.disabled}
          onClick={() => (item.paths?.length ? navigate(item.paths[0]) : undefined)}
          style={{
            height: "40px",
          }}
          {...props}>
          <Box position="relative" height="24px">
            <ListItemIcon
              style={{
                color:
                  iconColor || (isSelected(item.paths) ? theme.palette.primary.main : theme.palette.text.secondary),
                minWidth: leftDrawerCollapsed ? "24px" : undefined,
              }}>
              {item.icon}
            </ListItemIcon>
            {!isSelected(item.paths) && !!item.badgeCondition && item.badgeCondition() && (
              <Box position="absolute" top="0" right={leftDrawerCollapsed ? "-4px" : "12px"}>
                <Box height={8} width={8} sx={{ backgroundColor: theme.palette.error.main, borderRadius: "100%" }} />
              </Box>
            )}
          </Box>

          <Collapse in={!leftDrawerCollapsed} orientation="horizontal">
            <ListItemText>
              <Typography
                variant="h8"
                color={textColor || (isSelected(item.paths) ? "primary" : "text.primary")}
                noWrap>
                {item.text}
              </Typography>
            </ListItemText>
          </Collapse>
        </ListItemButton>
      </span>
    </Tooltip>
  );
};

export default LeftDrawerItem;
