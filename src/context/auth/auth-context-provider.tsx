import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useVrContext } from "../vr/vr-context";
import { AuthContext } from "./auth-context";
import { usePrivy } from "@privy-io/react-auth";
import { Profile, Role } from "@src/common/graphql/generated/user.schema.graphql";
import links from "@src/common/links";
import useHelloWorld from "@src/hooks/user/use-hello-world.hook";
import useLogoutFromExtension from "@src/hooks/user/use-logout-from-extension.hook";
import useProfileFromToken from "@src/hooks/user/use-profile-from-token.hook";
import useProfileRolesFromToken from "@src/hooks/user/use-profile-roles-from-token.hook";
import useReportOnline from "@src/hooks/user/use-report-online.hook";
import useErrorRedirect from "@src/hooks/utils/use-error-redirect.hook";
import useToast from "@src/hooks/utils/use-toast.hook";
import { getUsername } from "@src/utils/get-user-properties.util";
import { getLocalStorage, localStorageKeys } from "@src/utils/local-storage.util";
import { useLDClient } from "launchdarkly-react-client-sdk";
import { useInterval, useLocalStorage } from "usehooks-ts";

interface Props {
  justLoggedIn: boolean;
  resetJustLoggedIn: () => void;
}

const AuthContextProvider: React.FC<PropsWithChildren<Props>> = ({ justLoggedIn, resetJustLoggedIn, children }) => {
  const msPerSec = 1000;
  const secPerMin = 60;
  const reportOnlineIntervalInMin = 2;
  const isCypressContext = getLocalStorage<string | undefined>(localStorageKeys.isCypressContext, undefined);

  const { t } = useTranslation();
  const { showToast } = useToast();
  const ldClient = useLDClient();
  const { unauthorizedRedirect } = useErrorRedirect();
  const { vrMode } = useVrContext();

  const { loading: loadingHelloWorld } = useHelloWorld();
  const { logout: privyLogout, ready, authenticated } = usePrivy();
  const { getProfileFromToken } = useProfileFromToken();
  const { getProfileRolesFromToken } = useProfileRolesFromToken();
  const { reportOnline } = useReportOnline();
  const { logoutFromExtension } = useLogoutFromExtension();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<Role[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [connected, setConnected] = useState<boolean>(false);
  const [unauthorized, setUnauthorized] = useLocalStorage<boolean>(localStorageKeys.unauthorized, false);

  const clearAuthState = (): void => {
    setProfile(null);
    setConnected(false);
    setRoles(null);
    unauthorizedRedirect({ showError: true });
    setLoading(false);
    setUnauthorized(false);
  };

  const logoutFromPrivy = (): void => {
    void privyLogout()
      .then(() => {
        clearAuthState();
      })
      .catch(() => {
        window.location.reload();
      });
  };

  const logUserOut = (): void => {
    if (authenticated && !unauthorized) {
      void logoutFromExtension().then(() => {
        logoutFromPrivy();
      });
    } else if (authenticated && unauthorized) {
      logoutFromPrivy();
    } else {
      clearAuthState();
    }
  };

  const hasRole = (role: Role): boolean => !!roles && roles.includes(role);

  const getProfileWithPrivyToken = (): void => {
    setLoading(true);
    void getProfileFromToken({
      variables: { isLogin: true },
      onCompleted: dataProfile => {
        setProfile(dataProfile.profileFromToken);

        if (justLoggedIn) {
          resetJustLoggedIn();
        }

        void getProfileRolesFromToken({
          onCompleted: rolesData => {
            setRoles(rolesData.profileRolesFromToken.roles);
            setConnected(true);
            setLoading(false);
          },
          onError: _ => {
            setConnected(true);
            setLoading(false);
          },
        });

        void reportOnline({
          variables: { userId: dataProfile.profileFromToken.userId },
        });

        void ldClient?.identify({
          key: dataProfile.profileFromToken.userId,
          name: getUsername(dataProfile.profileFromToken),
          custom: {
            walletAddress: dataProfile.profileFromToken.walletAddress || "",
            category: dataProfile.profileFromToken.category,
          },
        });
      },
      onError: (error): void => {
        const forbiddenError = error.graphQLErrors?.find(({ extensions }) => extensions.code === "BOT_DETECTED");
        if (forbiddenError) {
          showToast(t("error.signInForbidden"), {
            variant: "error",
            action: { label: t("app.externalPages.support"), onClick: () => window.open(links.externalPages.support) },
          });
        }
        logUserOut();
      },
    });
  };

  // After a successful sign-in/log-in
  useEffect(() => {
    if (!vrMode && ready && authenticated && justLoggedIn) {
      getProfileWithPrivyToken();
    }
  }, [justLoggedIn]);

  // On first page load, loads a previously logged-in & authorized user (if existing)
  useEffect(() => {
    if (!loadingHelloWorld) {
      if ((!vrMode && ready && authenticated) || isCypressContext) {
        getProfileWithPrivyToken();
      } else if ((ready && !authenticated) || vrMode) {
        setLoading(false);
        !vrMode && unauthorizedRedirect({ showError: true });
      }
    }
  }, [vrMode, ready, loadingHelloWorld]);

  useEffect(() => {
    if (unauthorized) {
      logUserOut();
    }
  }, [unauthorized]);

  useInterval(() => {
    if (!vrMode && profile) {
      void reportOnline({
        variables: { userId: profile.userId },
      });
    }
  }, reportOnlineIntervalInMin * secPerMin * msPerSec);

  useEffect(() => {
    vrMode && logUserOut();
  }, [vrMode]);

  const authContextValue = useMemo(
    () => ({ profile, connected, hasRole, loading, logUserOut }),
    [profile, connected, hasRole, loading, logUserOut],
  );

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
