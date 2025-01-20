import Chip from "@mui/material/Chip";
import { styled, Theme } from "@mui/material/styles";
import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";

interface EntityTagProps {
  entitytype: EntityType;
}

const getEntityTagColor = (theme: Theme, type: EntityType): string | undefined => {
  switch (type) {
    case EntityType.event:
      return theme.palette.info.main;
    case EntityType.estate:
    case EntityType.parcel:
      return theme.palette.warning.main;
    case EntityType.member:
      return theme.palette.primary.main;
    default:
      return undefined;
  }
};

const getEntityTagTextColor = (theme: Theme, type: EntityType): string | undefined => {
  switch (type) {
    case EntityType.event:
      return theme.palette.info.contrastText;
    case EntityType.estate:
    case EntityType.parcel:
      return theme.palette.warning.contrastText;
    case EntityType.member:
      return theme.palette.primary.contrastText;
    default:
      return undefined;
  }
};

const EntityTagStyled = styled(Chip)(({ theme }) => ({ entitytype }: EntityTagProps) => ({
  backgroundColor: getEntityTagColor(theme, entitytype),
  color: getEntityTagTextColor(theme, entitytype),
}));

export { EntityTagStyled };
