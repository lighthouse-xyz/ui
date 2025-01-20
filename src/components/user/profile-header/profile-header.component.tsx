import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import WalletAddress from "../wallet-address/wallet-address.component";
import { BreakableTypography, ConnectionsCount, HandleChip, UserAvatarContainer } from "./profile-header.style";
import { useApolloClient } from "@apollo/client";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ReactComponent as GlobalIcon } from "@src/assets/icons/global-icon.svg";
import { ReactComponent as DiscordLogo } from "@src/assets/logos/discord-bw-logo.svg";
import { ReactComponent as DiscordUserLogo } from "@src/assets/logos/discord-user-bw-logo.svg";
import { ReactComponent as InstagramLogo } from "@src/assets/logos/instagram-bw-logo.svg";
import { ReactComponent as MediumLogo } from "@src/assets/logos/medium-logo.svg";
import { ReactComponent as MirrorLogo } from "@src/assets/logos/mirror-bw-logo.svg";
import { ReactComponent as TwitterLogo } from "@src/assets/logos/twitter-bw-logo.svg";
import { ConnectionType } from "@src/common/enums/connections-type.enum";
import { FollowOrigin } from "@src/common/enums/track-events.enum";
import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";
import { FollowingStatus, Profile, UserCategory } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";
import ChipList from "@src/components/common/chip-list/chip-list.component";
import GradientBorder from "@src/components/common/gradient-border/gradient-border.component";
import ImageAvatar from "@src/components/common/image-avatar/image-avatar.component";
import ImageBanner from "@src/components/common/image-banner/image-banner.component";
import ConnectionsListDialog from "@src/components/connections/connections-list-dialog/connections-list-dialog.component";
import FollowButton from "@src/components/entities/entity-content/entity-action-buttons/follow-button/follow-button.component";
import ReportButton from "@src/components/entities/entity-content/entity-action-buttons/report-button/report-button.component";
import ShareButton from "@src/components/entities/entity-content/entity-action-buttons/share-button/share-button.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import { getConnectionsSidePanelConnectedQueries } from "@src/hooks/user/use-get-connections-side-panel.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import { useEnum } from "@src/hooks/utils/use-enum.hook";
import { getUsername } from "@src/utils/get-user-properties.util";

interface Props {
  profile: Profile;
}

const ProfileHeader: React.FC<Props> = ({ profile }) => {
  const sizeLogo = "24px";

  const theme = useTheme();
  const location = useLocation();
  const { t } = useTranslation();
  const client = useApolloClient();
  const { navigateToDialog } = useDialog();
  const { getEnumValueLabel } = useEnum();

  const [openConnectionsDialogType, setOpenConnectionsDialogType] = useState<ConnectionType | undefined>(undefined);

  const { profile: profileContext, connected, loading: profileContextLoading } = useAuthContext();

  const isCurrentUser = profile.followingStatus === FollowingStatus.self;
  const isLightkeeper = profile.category === UserCategory.lightkeeper;
  const socialMedias = [
    { logo: <GlobalIcon width={sizeLogo} height={sizeLogo} />, link: profile.website },
    { logo: <TwitterLogo width={sizeLogo} height={sizeLogo} />, link: profile.twitter },
    { logo: <DiscordLogo width={sizeLogo} height={sizeLogo} />, link: profile.discord },
    {
      logo: <DiscordUserLogo width={sizeLogo} height={sizeLogo} color={theme.palette.action.active} />,
      tooltip: profile.discordUsername,
    },
    { logo: <InstagramLogo width={sizeLogo} height={sizeLogo} />, link: profile.instagram },
    { logo: <MirrorLogo width={sizeLogo} height={sizeLogo} />, link: profile.mirror },
    { logo: <MediumLogo width={sizeLogo} height={sizeLogo} />, link: profile.medium },
  ];
  const connectionsCounts = [
    {
      type: ConnectionType.friends,
      count: profile.friendCount,
      label: t("profile.friends.label", { count: profile.friendCount }),
    },
    {
      type: ConnectionType.followers,
      count: profile.followerCount,
      label: t("profile.followers.label", { count: profile.followerCount }),
    },
    { type: ConnectionType.following, count: profile.followingCount, label: t("profile.following.label") },
  ];

  const getButton = (): JSX.Element => {
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <ShareButton entityId={profile.handle ?? profile.userId} entityType={EntityType.member} />
        {!profileContextLoading &&
          (connected && isCurrentUser ? (
            <Button variant="outlined" onClick={() => navigateToDialog(paths.editProfile)}>
              {t("profile.editProfile")}
            </Button>
          ) : (
            <FollowButton
              currentUserId={profileContext?.userId}
              targetUserId={profile.userId}
              followingStatus={profileContext ? profile.followingStatus : undefined}
              origin={FollowOrigin.profile}
              updateOnClick
            />
          ))}
      </Stack>
    );
  };

  const handleCloseDialog = (): void => {
    setOpenConnectionsDialogType(undefined);
    if (connected) {
      void client.refetchQueries({
        include: [getConnectionsSidePanelConnectedQueries],
      });
    }
  };

  useEffect(() => {
    handleCloseDialog();
  }, [location.pathname]);

  const commonAvatarContainerProps: { [key: string]: string } = { position: "absolute", bottom: "-40px", left: "24px" };
  const userAvatar = (
    <ImageAvatar
      image={profile.picture as string}
      name={getUsername(profile)}
      userId={profile.userId}
      size="large"
      type="user"
    />
  );

  return (
    <>
      <Stack>
        <Box position="relative" marginBottom={13}>
          <ImageBanner image={profile.banner} type="profile" />
          {isLightkeeper ? (
            <GradientBorder gradient="lightkeeper" {...commonAvatarContainerProps}>
              {userAvatar}
            </GradientBorder>
          ) : (
            <UserAvatarContainer bgcolor="background.paper" {...commonAvatarContainerProps}>
              {userAvatar}
            </UserAvatarContainer>
          )}
        </Box>
        <Stack spacing={2} marginTop={2} alignItems="stretch" flexGrow={1}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
            <BreakableTypography variant="h4">{getUsername(profile)}</BreakableTypography>
            <div>{getButton()}</div>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              {!!profile.handle && (
                <HandleChip
                  label={<Typography variant="h8" color="text.secondary">{`@${profile.handle}`}</Typography>}
                />
              )}
              {!!profile.walletAddress && <WalletAddress walletAddress={profile.walletAddress} />}
            </Stack>
            <Stack direction="row" spacing={2}>
              {socialMedias.map((socialMedia, index) => {
                if (socialMedia.link)
                  return (
                    <Link
                      key={`${index}-${socialMedia.link}-profile-social-media`}
                      href={socialMedia.link}
                      target="_blank"
                      rel="noopener"
                      color="action.active"
                      display="flex"
                      justifyContent="center">
                      {socialMedia.logo}
                    </Link>
                  );
                if (socialMedia.tooltip)
                  return (
                    <Tooltip
                      key={`${index}-${socialMedia.tooltip}-profile-social-media`}
                      title={socialMedia.tooltip}
                      arrow>
                      {socialMedia.logo}
                    </Tooltip>
                  );
                return null;
              })}
            </Stack>
          </Stack>
        </Stack>

        <Stack spacing={3} marginTop={3}>
          <Stack direction="row" spacing={4} justifyContent="flex-end" flexGrow={1}>
            <Stack direction="row" spacing={4} flexGrow={1} alignItems="center">
              {connectionsCounts.map((connectionsCount, index) => (
                <ConnectionsCount
                  key={`${index}-${profile.userId}-${connectionsCount.type}-profile-connections-count`}
                  direction="row"
                  spacing={1}
                  alignItems="baseline"
                  onClick={
                    connectionsCount.count > 0 ? () => setOpenConnectionsDialogType(connectionsCount.type) : undefined
                  }>
                  <Typography variant="subtitle2">{connectionsCount.count}</Typography>
                  <Typography variant="body2">{connectionsCount.label.toLowerCase()}</Typography>
                </ConnectionsCount>
              ))}
            </Stack>

            {!profileContextLoading && connected && !isCurrentUser && (
              <ReportButton entityId={profile.userId} color="inherit" />
            )}
          </Stack>

          {!!profile.description && (
            <Typography variant="body1" whiteSpace="pre-line">
              {profile.description}
            </Typography>
          )}

          <ChipList chips={[getEnumValueLabel(profile.category, "userCategory")]} isSelected={() => true}>
            <ChipList chips={profile.tags} noContainer />
          </ChipList>
        </Stack>
      </Stack>
      {!!openConnectionsDialogType && (
        <ConnectionsListDialog
          connectionsType={openConnectionsDialogType}
          userId={profile.userId}
          closeDialog={handleCloseDialog}
        />
      )}
    </>
  );
};

export default ProfileHeader;
