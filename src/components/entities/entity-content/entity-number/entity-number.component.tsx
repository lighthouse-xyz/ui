import React from "react";
import { useTranslation } from "react-i18next";

import { AvatarIcon } from "./entity-number.style";
import AvatarGroup from "@mui/material/AvatarGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ConditionalFeature from "@src/components/common/conditional-feature/conditional-feature.component";
import { FeatureFlag } from "@src/hooks/utils/use-feature-flag.hook";

export enum NumberType {
  attending,
  connections,
  interested,
  visitors,
}

interface Props {
  type: NumberType;
  number: number;
}

const EntityNumber: React.FC<Props> = ({ type, number }) => {
  // eslint-disable-next-line no-magic-numbers
  const AVATARS = [1, 2, 3, 4];

  const { t } = useTranslation();

  const mapNumberTypeToLabel: { [key in NumberType]: string } = {
    [NumberType.attending]: t("events.attending"),
    [NumberType.connections]: t("people.connections", { count: number }),
    [NumberType.interested]: t("interested.label"),
    [NumberType.visitors]: t("places.visitors"),
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <ConditionalFeature name={FeatureFlag.showAttendeesAvatars}>
        <AvatarGroup max={AVATARS.length}>
          {AVATARS.map(v => (
            <AvatarIcon alt="" src="" key={v} />
          ))}
        </AvatarGroup>
      </ConditionalFeature>
      <Typography variant="subtitle2" color="text.secondary">
        {number} {mapNumberTypeToLabel[type].toLowerCase()}
      </Typography>
    </Stack>
  );
};

export default EntityNumber;
