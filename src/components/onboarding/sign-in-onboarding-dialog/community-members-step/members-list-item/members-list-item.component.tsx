import React from "react";

import { Box, Stack, Typography } from "@mui/material";
import { FollowOrigin } from "@src/common/enums/track-events.enum";
import { Entity } from "@src/common/interfaces/entity.type";
import ImageAvatar from "@src/components/common/image-avatar/image-avatar.component";
import MultilineCroppedText from "@src/components/common/multiline-cropped-text/multiline-cropped-text.component";
import FollowButton from "@src/components/entities/entity-content/entity-action-buttons/follow-button/follow-button.component";

interface Props {
  member: Entity;
  currentUserId: string;
}

const MembersListItem: React.FC<Props> = ({ member, currentUserId }) => {
  return (
    <Stack direction="row" spacing={3} width="100%" textAlign="start">
      <ImageAvatar type="user" size="small" userId={member.entityId} name={member.name} image={member.image} />
      <Stack width="100%" spacing={2} overflow="hidden">
        <Stack width="100%" spacing={3} direction="row" justifyContent="space-between">
          <Stack spacing={1} width="100%" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
            <Typography variant="h8" noWrap>
              {member.name}
            </Typography>
            {!!member.handle && (
              <Typography variant="h9" color="text.secondary" noWrap>{`@${member.handle}`}</Typography>
            )}
          </Stack>
          <Box display="flex">
            <FollowButton
              targetUserId={member.entityId}
              currentUserId={currentUserId}
              followingStatus={member.followingStatus}
              origin={FollowOrigin.onboarding}
              updateOnClick
            />
          </Box>
        </Stack>
        <MultilineCroppedText maxlines={3} variant="body2">
          {member.description}
        </MultilineCroppedText>
      </Stack>
    </Stack>
  );
};

export default MembersListItem;
