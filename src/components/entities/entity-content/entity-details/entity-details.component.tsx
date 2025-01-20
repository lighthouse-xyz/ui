import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import DateTime from "../date-time/date-time.component";
import EntityActionButtons from "../entity-action-buttons/entity-action-buttons.component";
import EntityAddedBy from "../entity-added-by/entity-added-by.component";
import EntityImage from "../entity-image/entity-image.component";
import EntityNumber, { NumberType } from "../entity-number/entity-number.component";
import EntityPrice from "../entity-price/entity-price.component";
import EntityTag from "../entity-tag/entity-tag.component";
import { ScrollingDescription } from "./entity-details.style";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { defaultName, Entity } from "@src/common/interfaces/entity.type";
import ChipList from "@src/components/common/chip-list/chip-list.component";
import WorldLogo from "@src/components/common/world-logo/world-logo.component";
import { usePageMetadataContext } from "@src/context/page-metadata/page-metadata-context";
import { useEnum } from "@src/hooks/utils/use-enum.hook";
import { getWorldLabel } from "@src/utils/worlds.util";

interface Props {
  entity: Entity;
  editable?: boolean;
}

const EntityDetails: React.FC<Props> = ({ entity, editable = false }) => {
  const { t } = useTranslation();
  const { getEnumValueLabel } = useEnum();

  const { setDynamicPageMetadata } = usePageMetadataContext();

  useEffect(() => {
    setDynamicPageMetadata({
      title: t("metadata.entity.title", { name: entity.name }),
      description: t("metadata.entity.description"),
      image: entity.image,
    });
  }, []);

  const hasTagsOrCategories =
    !!entity.parcelCategories?.length || !!entity.eventCategories?.length || !!entity.tags?.length;

  return (
    <Card elevation={0}>
      <EntityImage
        imageProps={{ image: entity.image, name: entity.name }}
        badges={{ liveEvent: entity.live, pastEvent: entity.past }}
        context="details"
      />

      <Stack padding={4} paddingBottom={2}>
        <EntityActionButtons entity={entity} context="dialog" editMode={editable} />
      </Stack>

      <CardContent>
        <Stack spacing={6}>
          <Stack spacing={4}>
            {!!entity.nextStartAt && (
              <Typography variant="caption" component="div">
                <DateTime
                  nextStartAt={entity.nextStartAt}
                  nextFinishAt={entity.nextFinishAt}
                  allDay={entity.isAllDay}
                  live={entity.live}
                  includeYear
                />
              </Typography>
            )}

            <Stack spacing={1}>
              <Typography
                variant="h6"
                color={entity.name === defaultName ? "text.disabled" : undefined}
                sx={{ wordBreak: "break-word" }}>
                {entity.name}
              </Typography>
              <EntityTag entityType={entity.type} />
            </Stack>
            <EntityAddedBy walletAddress={entity.owner} userId={entity.ownerUser} />
          </Stack>

          {(!!entity.description || hasTagsOrCategories) && (
            <Stack spacing={4}>
              {!!entity.description && (
                <ScrollingDescription variant="body2" color="text.secondary" whiteSpace="pre-line">
                  {entity.description}
                </ScrollingDescription>
              )}
              {hasTagsOrCategories && (
                <ChipList
                  chips={(entity.parcelCategories || entity.eventCategories || []).map(category =>
                    getEnumValueLabel(category, entity.parcelCategories ? "placeCategory" : "eventCategory"),
                  )}
                  isSelected={() => true}>
                  <ChipList chips={entity.tags} noContainer />
                </ChipList>
              )}
            </Stack>
          )}

          <Stack spacing={2}>
            <Stack direction="row" spacing={1}>
              <WorldLogo world={entity.world} />
              <Typography variant="subtitle2">{getWorldLabel(entity.world)}</Typography>
            </Stack>
            {!!entity.totalAttendees && <EntityNumber type={NumberType.attending} number={entity.totalAttendees} />}
          </Stack>

          {!!entity.price && !!entity.currency && <EntityPrice price={entity.price} currency={entity.currency} />}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EntityDetails;
