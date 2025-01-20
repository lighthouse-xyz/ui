import React, { useId, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { LoadingButton } from "@mui/lab";
import { Divider, IconButton, IconButtonProps as MuiIconButtonProps, Typography } from "@mui/material";
import { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ReactComponent as ArrowDownIcon } from "@src/assets/icons/chevron-arrow-down-icon.svg";
import { ReactComponent as ArrowRightIcon } from "@src/assets/icons/chevron-arrow-right-icon.svg";
import { ReactComponent as ArrowUpIcon } from "@src/assets/icons/chevron-arrow-up-icon.svg";
import { ReactComponent as ArrowLeftIcon } from "@src/assets/icons/literal-arrow-left-icon.svg";
import { FilterCategory } from "@src/common/enums/filter-category.enum";
import { MenuOption } from "@src/common/interfaces/menu-option.interface";

export enum ButtonType {
  text = "text",
  icon = "icon",
}

interface TextButtonProps {
  type: ButtonType.text;
  label?: string;
  content?: JSX.Element;
  isOptionDisplayedAsBtnLabel?: boolean;
  loading?: boolean;
  muiButtonProps?: MuiButtonProps;
}

interface IconButtonProps {
  type: ButtonType.icon;
  icon: React.ReactNode;
  muiButtonProps?: MuiIconButtonProps;
}

type ButtonProps = TextButtonProps | IconButtonProps;

interface Props {
  menuOptions: MenuOption[];
  category?: FilterCategory;
  menuProps?: Partial<MenuProps>;
  buttonProps: ButtonProps;
  defaultOption?: string;
  onOptionClick: (option: string, category: FilterCategory) => void;
  isOptionDisabled?: (option: string) => boolean;
  handleToggleChange?: (toogleState: boolean) => void;
  dataTestId?: string;
}

const DropdownMenu: React.FC<Props> = ({
  menuOptions,
  category,
  menuProps,
  buttonProps,
  defaultOption,
  onOptionClick,
  isOptionDisabled,
  handleToggleChange,
  dataTestId,
}) => {
  const defaultIconColor = "text.secondary";
  const id = useId();
  const menuRef = useRef(null);

  // For now, cannot set option selected as button label when there are some submenus
  const hasSubmenus = menuOptions.findIndex(option => option.submenu !== undefined) !== -1;
  const isOptionDisplayedAsBtnLabel =
    buttonProps.type === ButtonType.text && buttonProps.isOptionDisplayedAsBtnLabel && !hasSubmenus;

  const initialSelectedIndex = defaultOption ? menuOptions.findIndex(option => option.option === defaultOption) : 0;
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isDropdownOpen = Boolean(anchorEl);

  const [openMenuOptionWithSubmenu, setOpenMenuOptionWithSubmenu] = useState<MenuOption | undefined>();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
    handleToggleChange && handleToggleChange(true);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
    setOpenMenuOptionWithSubmenu(undefined);
    handleToggleChange && handleToggleChange(false);
  };

  const handleOptionClick = (option: string, index: number): void => {
    handleClose();
    setSelectedIndex(index);
    onOptionClick(option, category || FilterCategory.none);
  };

  const handleSubmenuOpen = (submenu: MenuOption): void => {
    setOpenMenuOptionWithSubmenu(submenu);
  };

  const commonButtonProps = {
    id: `dropdown-button-${id}`,
    "aria-controls": isDropdownOpen ? `menu-${id}` : undefined,
    "aria-haspopup": true,
    "aria-expanded": isDropdownOpen ? true : undefined,
    onClick: handleButtonClick,
  };

  const commonMenuProps = {
    id: `dropdown-menu-${id}`,
    ref: menuRef,
    anchorEl,
    open: isDropdownOpen,
    onClose: handleClose,
    MenuListProps: {
      ...menuProps?.MenuListProps,
      "aria-labelledby": `button-${id}`,
    },
    ...menuProps,
  };

  const getButton = (): JSX.Element => {
    return buttonProps.type === ButtonType.text ? (
      <LoadingButton
        fullWidth
        endIcon={isDropdownOpen ? <ArrowUpIcon color={defaultIconColor} /> : <ArrowDownIcon color={defaultIconColor} />}
        startIcon={isOptionDisplayedAsBtnLabel && menuOptions[selectedIndex]?.icon}
        loading={buttonProps.loading}
        {...commonButtonProps}
        {...buttonProps.muiButtonProps}>
        {buttonProps.content || (
          <>{isOptionDisplayedAsBtnLabel ? menuOptions[selectedIndex]?.label : buttonProps.label}</>
        )}
      </LoadingButton>
    ) : (
      <IconButton {...commonButtonProps} {...buttonProps.muiButtonProps}>
        {buttonProps.icon}
      </IconButton>
    );
  };

  return (
    <div data-testid={dataTestId}>
      {getButton()}

      <CSSTransition nodeRef={menuRef} in={!openMenuOptionWithSubmenu} timeout={1} unmountOnExit>
        <Menu {...commonMenuProps}>
          {menuOptions.map((menuOption, index) => (
            <MenuItem
              key={`menu-option-${menuOption.option}`}
              disabled={isOptionDisabled ? isOptionDisabled(menuOption.option) : false}
              selected={isOptionDisplayedAsBtnLabel && index === selectedIndex}
              onClick={() =>
                menuOption.submenu ? handleSubmenuOpen(menuOption) : handleOptionClick(menuOption.option, index)
              }>
              {menuOption.icon && <ListItemIcon color={defaultIconColor}>{menuOption.icon}</ListItemIcon>}
              <ListItemText primary={menuOption.label ?? menuOption.option} secondary={menuOption.secondaryText} />
              {menuOption.submenu && (
                <ListItemIcon style={{ justifyContent: "flex-end" }}>
                  <ArrowRightIcon color={defaultIconColor} />
                </ListItemIcon>
              )}
            </MenuItem>
          ))}
        </Menu>
      </CSSTransition>

      {!!openMenuOptionWithSubmenu?.submenu && (
        <CSSTransition nodeRef={menuRef} in={!!openMenuOptionWithSubmenu} timeout={1} unmountOnExit>
          <Menu {...commonMenuProps}>
            <MenuItem onClick={() => setOpenMenuOptionWithSubmenu(undefined)}>
              <ListItemIcon>
                <ArrowLeftIcon color={defaultIconColor} />
              </ListItemIcon>
              <ListItemText>
                <Typography color={openMenuOptionWithSubmenu.label ? "text.disabled" : "text.primary"}>
                  {openMenuOptionWithSubmenu.label ?? openMenuOptionWithSubmenu.option}
                </Typography>
              </ListItemText>
            </MenuItem>
            {!!openMenuOptionWithSubmenu.label && <Divider />}

            {openMenuOptionWithSubmenu.submenu.map((menuOption, index) => (
              <MenuItem
                key={`menu-option-${menuOption.option}`}
                selected={
                  index ===
                  (defaultOption
                    ? openMenuOptionWithSubmenu.submenu?.findIndex(option => option.option === defaultOption)
                    : 0)
                }
                disabled={isOptionDisabled ? isOptionDisabled(menuOption.option) : false}
                onClick={() => handleOptionClick(menuOption.option, index)}>
                <ListItemIcon>
                  <ArrowLeftIcon color="transparent" />
                </ListItemIcon>
                <ListItemText primary={menuOption.label ?? menuOption.option} />
              </MenuItem>
            ))}
          </Menu>
        </CSSTransition>
      )}
    </div>
  );
};

export default DropdownMenu;
