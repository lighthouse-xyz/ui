import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import GradientBorder from "../gradient-border/gradient-border.component";
import { Stack, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { ReactComponent as CloseCircleIcon } from "@src/assets/icons/close-circle-bold-icon.svg";
import { UserCategory } from "@src/common/graphql/generated/user.schema.graphql";
import { useEnum } from "@src/hooks/utils/use-enum.hook";

interface Props {
  chips?: string[];
  gap?: { row: number; column: number };
  isSelected?: (chip: string) => boolean;
  isDisabled?: (chip: string) => boolean;
  onClick?: (chip: string) => void;
  onDelete?: (chip: string) => void;
  onClearAll?: () => void;
  noContainer?: boolean;
}

const ChipList: React.FC<PropsWithChildren<Props>> = ({
  chips,
  gap = { row: 2, column: 2 },
  isSelected,
  isDisabled,
  onClick,
  onDelete,
  onClearAll,
  noContainer = false,
  children,
}) => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const { getEnumValueLabel } = useEnum();

  const chipsExist = chips && chips.length > 0;

  const getChip = (chip: string, index: number): JSX.Element => (
    <Chip
      key={`chip-${chip}-${index}`}
      deleteIcon={<CloseCircleIcon />}
      label={chip}
      disabled={!!isDisabled && isDisabled(chip)}
      color={!!isSelected && isSelected(chip) ? "secondary" : undefined}
      onClick={onClick ? () => onClick(chip) : undefined}
      onDelete={onDelete ? () => onDelete(chip) : undefined}
    />
  );

  const getChips = (chipList: string[]): JSX.Element => {
    return (
      <>
        {chipList.map((chip, index) =>
          chip === getEnumValueLabel(UserCategory.lightkeeper, "userCategory") && (!isSelected || isSelected(chip)) ? (
            <GradientBorder
              key={`chip-category-lightkeeper-${chip}`}
              gradient="lightkeeper"
              position="relative"
              marginLeft={1}
              borderWidth={2}
              sx={{ ".MuiChip-root": { backgroundColor: palette.background.paper } }}>
              {getChip(chip, index)}
            </GradientBorder>
          ) : (
            getChip(chip, index)
          ),
        )}
      </>
    );
  };

  return noContainer ? (
    chipsExist ? (
      getChips(chips)
    ) : null
  ) : chipsExist || !!children ? (
    <Stack display="flex" flexWrap="wrap" direction="row" alignItems="center" rowGap={gap.row} columnGap={gap.column}>
      {chipsExist && getChips(chips)}
      {children}
      {!!onClearAll && (
        <Button size="small" onClick={onClearAll}>
          {t("cta.clearAll")}
        </Button>
      )}
    </Stack>
  ) : null;
};

export default ChipList;
