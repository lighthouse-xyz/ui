export interface MenuOption {
  option: string;
  label?: string;
  secondaryText?: JSX.Element;
  icon?: JSX.Element;
  submenu?: { option: string; label?: string }[];
}
