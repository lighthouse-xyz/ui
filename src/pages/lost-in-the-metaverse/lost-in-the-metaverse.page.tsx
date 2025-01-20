import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@mui/material";
import { usePrivy } from "@privy-io/react-auth";
import brokenLinkImage from "@src/assets/images/broken-link.png";
import { FollowOrigin } from "@src/common/enums/track-events.enum";
import { FollowingStatus, Profile } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";
import ErrorPage, { ErrorPageButtonProps } from "@src/components/layout/error-page/error-page.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import useFollow from "@src/hooks/user/use-follow.hook";
import useProfile, { buildGetProfileArgs } from "@src/hooks/user/use-profile.hook";
import useToast from "@src/hooks/utils/use-toast.hook";
import { getUsername } from "@src/utils/get-user-properties.util";

const LostInTheMetaverse: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [searchParams, setSearchParams] = useSearchParams();
  const [targetProfile, setTargetProfile] = useState<Profile | undefined>(undefined);

  const { profile, connected, loading: profileLoading } = useAuthContext();
  const { ready, login } = usePrivy();

  const { getProfile, loading: getProfileLoading } = useProfile();
  const { follow, loading: followLoading } = useFollow(FollowOrigin.lostInTheMetaversePage);

  const loadTargetProfile = (user: string): void => {
    void getProfile({
      variables: buildGetProfileArgs(user),
      onCompleted: data => {
        setTargetProfile(data.profile);
      },
      onError: () => {
        setSearchParams();
      },
    });
  };

  useEffect(() => {
    const user = searchParams.get("user");
    if (user) {
      loadTargetProfile(user);
    } else {
      setTargetProfile(undefined);
    }
  }, [searchParams.get("user")]);

  useEffect(() => {
    if (connected && targetProfile && targetProfile.followingStatus === null) {
      loadTargetProfile(targetProfile.userId);
    }
  }, [connected]);

  const navigateHome = (): void => {
    navigate(paths.home, { replace: true });
  };

  const navigateToTargetGate = (): void => {
    navigate(paths.profile.buildPath(targetProfile?.handle ?? targetProfile?.userId ?? ""), { replace: true });
  };

  const followAndRedirect = (): void => {
    void follow({
      variables: { id: profile?.userId, input: { targetUserId: targetProfile?.userId } },
      onCompleted: () => {
        showToast(t("success.follow"), { variant: "success" });
        navigateToTargetGate();
      },
      onError: () => {
        showToast(t("error.generic"), { variant: "error" });
      },
    });
  };

  const signInIfReady = (): void => {
    if (ready) {
      login();
    }
  };

  const getTitle = (): string => {
    if (!targetProfile) {
      return t("error.lostInTheMetaverse.anonTitle");
    }

    let displayName = getUsername(targetProfile);
    if (targetProfile.handle) {
      displayName = `@${targetProfile.handle}`;
    }

    return t("error.lostInTheMetaverse.title", { displayName });
  };

  const cantBeFollowed: (FollowingStatus | undefined)[] = [
    FollowingStatus.following,
    FollowingStatus.friend,
    FollowingStatus.self,
  ];

  const getSubtitle = (): string | undefined => {
    if (!targetProfile) {
      return t("error.lostInTheMetaverse.anonSubtitle");
    }

    if (cantBeFollowed.includes(targetProfile.followingStatus)) {
      return undefined;
    }

    return t("error.lostInTheMetaverse.subtitle");
  };

  const getButton = (): ErrorPageButtonProps | undefined => {
    if (!targetProfile) {
      return { label: t("cta.openLighthouse"), onClick: navigateHome };
    }

    if (cantBeFollowed.includes(targetProfile.followingStatus)) {
      return undefined;
    }

    if (connected) {
      return { label: t("cta.follow"), onClick: followAndRedirect, loading: followLoading };
    }

    return { label: t("cta.signInToFollow"), onClick: signInIfReady };
  };

  const getExtraContent = (): JSX.Element | undefined => {
    if (!targetProfile) {
      return undefined;
    }

    return (
      <Button variant="outlined" color="secondary" onClick={navigateToTargetGate}>
        {t("cta.viewTheirGate")}
      </Button>
    );
  };

  return (
    <ErrorPage
      errorLogo={brokenLinkImage}
      title={getTitle()}
      subtitle={getSubtitle()}
      button={getButton()}
      extraContent={getExtraContent()}
      loading={getProfileLoading || profileLoading}
    />
  );
};

export default LostInTheMetaverse;
