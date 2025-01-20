import React, { useEffect, useMemo, useState } from "react";

import { useAuthContext } from "../auth/auth-context";
import { UserStateContext } from "./user-state-context";
import { SetUserStateInput } from "@src/common/graphql/generated/user.schema.graphql";
import { PropsWithChildren } from "@src/common/interfaces/props-with-children.interface";
import useGetUserState from "@src/hooks/user/use-get-user-state.hook";
import useSetUserState from "@src/hooks/user/use-set-user-state.hook";

interface FrontendState {
  claimInviteAvatarDialogDismissed?: boolean;
  onboardingButtonDismissed?: boolean;
  yourAvatarPopperDismissed?: boolean;
}

type FrontendStateKey = keyof FrontendState;

const UserStateContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { connected, profile } = useAuthContext();

  const { getUserState } = useGetUserState();
  const { setUserState } = useSetUserState();

  const [claimInviteAvatarDialogDismissed, setClaimInviteAvatarDialogDismissed] = useState<boolean | undefined>(
    undefined,
  );
  const [onboardingButtonDismissed, setOnboardingButtonDismissed] = useState<boolean | undefined>(undefined);
  const [yourAvatarPopperDismissed, setYourAvatarPopperDismissed] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setClaimInviteAvatarDialogDismissed(undefined);
    setOnboardingButtonDismissed(undefined);
    setYourAvatarPopperDismissed(undefined);

    if (connected && profile) {
      void getUserState({
        variables: { userId: profile.userId },
        onCompleted: data => {
          const frontendState = data.userState.frontendState as unknown as FrontendState | undefined;

          if (frontendState && Object.keys(frontendState).length) {
            setClaimInviteAvatarDialogDismissed(!!frontendState.claimInviteAvatarDialogDismissed);
            setOnboardingButtonDismissed(!!frontendState.onboardingButtonDismissed);
            setYourAvatarPopperDismissed(!!frontendState.yourAvatarPopperDismissed);
          } else {
            setClaimInviteAvatarDialogDismissed(false);
            setOnboardingButtonDismissed(false);
            setYourAvatarPopperDismissed(false);
          }
        },
      });
    }
  }, [connected]);

  const buildStateInput = (): SetUserStateInput | undefined => {
    const frontendState: FrontendState = {
      claimInviteAvatarDialogDismissed,
      onboardingButtonDismissed,
      yourAvatarPopperDismissed,
    };

    Object.keys(frontendState).forEach(key => {
      if (frontendState[key as FrontendStateKey] === undefined) {
        delete frontendState[key as FrontendStateKey];
      }
    });

    return Object.keys(frontendState).length ? ({ frontendState } as SetUserStateInput) : undefined;
  };

  useEffect(() => {
    const input = buildStateInput();
    if (profile && input) {
      void setUserState({ variables: { userId: profile.userId, input } });
    }
  }, [claimInviteAvatarDialogDismissed, onboardingButtonDismissed, yourAvatarPopperDismissed]);

  const userStateContextValue = useMemo(
    () => ({
      claimInviteAvatarDialogDismissed: {
        value: claimInviteAvatarDialogDismissed,
        setValue: setClaimInviteAvatarDialogDismissed,
      },
      onboardingButtonDismissed: { value: onboardingButtonDismissed, setValue: setOnboardingButtonDismissed },
      yourAvatarPopperDismissed: { value: yourAvatarPopperDismissed, setValue: setYourAvatarPopperDismissed },
    }),
    [
      claimInviteAvatarDialogDismissed,
      setClaimInviteAvatarDialogDismissed,
      onboardingButtonDismissed,
      setOnboardingButtonDismissed,
      yourAvatarPopperDismissed,
      setYourAvatarPopperDismissed,
    ],
  );

  return <UserStateContext.Provider value={userStateContextValue}>{children}</UserStateContext.Provider>;
};

export default UserStateContextProvider;
