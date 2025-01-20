import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import { FollowingStatus, Profile as ProfileSchema } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";
import Alert from "@src/components/common/alert/alert.component";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import ProfileHeader from "@src/components/user/profile-header/profile-header.component";
import ProfilePins from "@src/components/user/profile-pins/profile-pins.component";
import ProfileTabs from "@src/components/user/profile-tabs/profile-tabs.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import { usePageMetadataContext } from "@src/context/page-metadata/page-metadata-context";
import useProfile from "@src/hooks/user/use-profile.hook";
import { isUserId } from "@src/utils/entity.util";
import { getUsername } from "@src/utils/get-user-properties.util";

const Profile: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [openSSOAlert, setOpenSSOAlert] = useState(true);

  const { setDynamicPageMetadata } = usePageMetadataContext();
  const { connected, profile: currentUserProfile, loading: loadingCurrentUserProfile } = useAuthContext();

  const { getProfile, loading } = useProfile();

  const [profile, setProfile] = useState<ProfileSchema | null>(null);
  const [profileId, setProfileId] = useState(params.id);

  const isCurrentUser = (): boolean =>
    currentUserProfile != null && (profileId === currentUserProfile.userId || profileId === currentUserProfile.handle);

  useEffect(() => {
    if (!params.id) {
      navigate(paths.error404, { replace: true });
      return;
    }
    setProfileId(params.id);
  }, [params]);

  useEffect(() => {
    if (isCurrentUser()) {
      setProfile(currentUserProfile);
    }
  }, [currentUserProfile]);

  useEffect(() => {
    if (profile?.followingStatus === FollowingStatus.self) {
      if (currentUserProfile?.handle) {
        navigate(paths.profile.buildPath(currentUserProfile.handle));
      } else if (currentUserProfile?.userId) {
        navigate(paths.profile.buildPath(currentUserProfile.userId));
      }
    }
  }, [currentUserProfile?.handle]);

  useEffect(() => {
    if (!isCurrentUser()) {
      const idAsUserId = isUserId(profileId || "");
      void getProfile({
        variables: idAsUserId ? { userId: profileId } : { handle: profileId },
        onCompleted: data => {
          if (idAsUserId && !!data.profile.handle) {
            navigate(paths.profile.buildPath(data.profile.handle));
          }
          setProfile(data.profile);
        },
        onError: () => navigate(paths.error404, { replace: true }),
      });
    } else {
      setProfile(currentUserProfile);
    }
  }, [profileId]);

  useEffect(() => {
    if (profile) {
      setDynamicPageMetadata({
        title: t("metadata.user.title", { username: getUsername(profile) }),
        description: t("metadata.entity.description"),
        image: profile.picture,
      });
    }
  }, [profile]);

  return (
    <>
      {((isCurrentUser() && loadingCurrentUserProfile && !profile) || loading) && <LoadingIndicator size="70px" />}

      {!!profile && !loading && (
        <Stack spacing={8}>
          <ProfileHeader profile={profile} />
          {connected && !profile.walletAddress && profile.followingStatus === FollowingStatus.self && (
            <Collapse in={openSSOAlert}>
              <Alert
                severity="info"
                title={t("warning.noWalletUser.title")}
                content={t("warning.noWalletUser.subtitle")}
                action={{ content: t("warning.noWalletUser.cta"), onClick: () => navigate(paths.settings) }}
                onClose={() => setOpenSSOAlert(false)}
              />
            </Collapse>
          )}

          <Stack spacing={12}>
            <ProfilePins
              userId={profile.userId}
              isCurrentUser={!!currentUserProfile && profile.followingStatus === FollowingStatus.self}
            />
            <ProfileTabs
              userId={profile.userId}
              isCurrentUser={!!currentUserProfile && profile.followingStatus === FollowingStatus.self}
            />
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Profile;
