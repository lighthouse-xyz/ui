import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import DateTime from "../date-time/date-time.component";
import EntityActionButtons from "../entity-action-buttons/entity-action-buttons.component";
import EntityActionTags from "../entity-action-tags/entity-action-tags.component";
import EntityImage from "../entity-image/entity-image.component";
import EntityNumber, { NumberType } from "../entity-number/entity-number.component";
import EntityPrice from "../entity-price/entity-price.component";
import EntityTag from "../entity-tag/entity-tag.component";
import {
  ActionsBarOverlay,
  CardActionsContainer,
  CardDivider,
  DateSection,
  EntityCardContainer,
} from "./entity-card.style";
import Stack from "@mui/material/Stack";
import { CardSize } from "@src/common/enums/card-size.enum";
import { TouchOrigin } from "@src/common/enums/track-events.enum";
import { EntityType, UserCategory } from "@src/common/graphql/generated/discovery.schema.graphql";
import { defaultName, Entity } from "@src/common/interfaces/entity.type";
import paths from "@src/common/paths";
import MultilineCroppedText from "@src/components/common/multiline-cropped-text/multiline-cropped-text.component";
import WorldLogo from "@src/components/common/world-logo/world-logo.component";
import { useVrContext } from "@src/context/vr/vr-context";
import useTouchEntity from "@src/hooks/discovery/use-touch-entity.hook";
import useTouchProfile from "@src/hooks/user/use-touch-profile.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import formatWalletAddress from "@src/utils/format-wallet-address.util";

interface Props {
  clickOrigin: TouchOrigin;
  entity: Entity;
  cardSize?: CardSize;
  tagDisplayed?: boolean;
  editMode?: boolean;
}

// eslint-disable-next-line complexity
const EntityCard: React.FC<Props> = ({
  clickOrigin,
  entity,
  cardSize = CardSize.small,
  tagDisplayed = false,
  editMode = false,
}) => {
  const navigate = useNavigate();
  const { navigateToDialog } = useDialog();

  const { vrMode } = useVrContext();

  const { touchEntity } = useTouchEntity(clickOrigin);
  const { touchProfile } = useTouchProfile(clickOrigin);

  const [hover, setHover] = useState(false);

  const nameTypography = cardSize === CardSize.small ? "subtitle2" : "h7";
  const isLargeCard = cardSize === CardSize.large || cardSize === CardSize.largeSquare;
  const isLightkeeper = !!entity.category && entity.category === UserCategory.lightkeeper;

  const handleImageClick = (): void => {
    if (entity.type === EntityType.member) {
      void touchProfile({ variables: { id: entity.entityId } });
      navigate(paths.profile.buildPath(entity.handle ?? entity.entityId));
    } else {
      void touchEntity({ variables: { id: entity.entityId } });
      navigateToDialog(paths.entityDetails.buildPath(entity.entityId), { entity });
    }
  };

  const getCardHeader = (): JSX.Element => {
    const defaultCardNameSection = (
      <MultilineCroppedText
        maxlines={3}
        variant={nameTypography}
        color={entity.name === defaultName ? "text.disabled" : undefined}>
        {entity.name}
      </MultilineCroppedText>
    );

    switch (entity.type) {
      case EntityType.event:
        return (
          <>
            <DateSection direction="row" alignItems="center" spacing={1}>
              <WorldLogo world={entity.world} tooltip size="24px" />
              {!!entity.nextStartAt && (
                <DateTime
                  nextStartAt={entity.nextStartAt}
                  nextFinishAt={entity.nextFinishAt}
                  live={entity.live}
                  allDay={entity.isAllDay}
                />
              )}
            </DateSection>
            {defaultCardNameSection}
          </>
        );
      case EntityType.member:
        return (
          <MultilineCroppedText maxlines={3} variant={nameTypography}>
            {formatWalletAddress(entity.name) || formatWalletAddress(entity.address)}
          </MultilineCroppedText>
        );
      default:
        return (
          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <WorldLogo world={entity.world} tooltip size="24px" />
            {defaultCardNameSection}
          </Stack>
        );
    }
  };

  return (
    <EntityCardContainer
      cardsize={cardSize}
      context={clickOrigin === TouchOrigin.resultsList ? "list" : "carousel"}
      vrmode={vrMode ? 1 : 0}
      elevation={0}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <EntityImage
        imageProps={{
          image: isLargeCard ? entity.featuredMedia ?? entity.image : entity.image,
          name: entity.name,
          cardSize,
        }}
        userId={entity.type === EntityType.member ? entity.entityId : undefined}
        badges={{ liveEvent: entity.live, pastEvent: entity.past, userCategory: entity.category }}
        isLightkeeper={isLightkeeper}
        onImageClick={handleImageClick}>
        <EntityActionTags entity={entity} editMode={editMode} />

        {hover && (
          <>
            <ActionsBarOverlay onClick={handleImageClick} />
            <CardActionsContainer>
              {isLargeCard && !!entity.description && (
                <Stack spacing={6} marginBottom={2} alignItems="center" textAlign="center">
                  <MultilineCroppedText variant="body2" maxlines={2} color="common.white">
                    {entity.description}
                  </MultilineCroppedText>
                  <CardDivider />
                </Stack>
              )}
              <EntityActionButtons entity={entity} context="card" editMode={editMode} />
            </CardActionsContainer>
          </>
        )}
      </EntityImage>

      <Stack alignItems="flex-start" spacing={2} marginBottom={2}>
        {getCardHeader()}
        {!!entity.price && !!entity.currency && <EntityPrice price={entity.price} currency={entity.currency} />}
        {!!entity.totalAttendees && <EntityNumber type={NumberType.attending} number={entity.totalAttendees} />}

        {entity.type === EntityType.member && cardSize === CardSize.small && (
          <EntityNumber
            type={NumberType.connections}
            number={(entity.followerCount || 0) + (entity.friendCount || 0)}
          />
        )}
      </Stack>

      {tagDisplayed && <EntityTag entityType={entity.type} />}
    </EntityCardContainer>
  );
};

export default EntityCard;
