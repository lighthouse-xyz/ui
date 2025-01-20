import paths from "@src/common/paths";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import useToast from "./use-toast.hook";

const lighkeeperRestrictedPages = [paths.lightkeeperStats, paths.lightkeeperLeaderboard];

const godModeRestrictedPages = [
  paths.godMode,
  paths.godModeCreateEvent,
  paths.godModeCreatePlace,
  paths.godModeEditPlace,
  paths.godModeEditGate,
  paths.godModeEditEvent,
  paths.godModeCreateGate,
  paths.godModeLightkeeperLeaderboard,
  paths.godModeLightkeeperStats,
];

const restrictedPages = [
  paths.settings,
  paths.interested,
  paths.likes,
  paths.jumpHistory,
  paths.yourEvents,
  paths.yourPlaces,
  paths.customStatus,
  paths.inviteFriend,
  paths.editProfile,
  paths.createEvent,
  paths.createPlace,
  paths.editEvent,
  paths.editPlace,
  paths.deleteAccount,
  paths.deleteEvent,
  paths.deletePlace,
  paths.report,
  paths.notifications,
  ...lighkeeperRestrictedPages,
  ...godModeRestrictedPages,
];

interface RedirectOptions {
  showError?: boolean;
}

interface RedirectUtilities {
  unauthorizedRedirect: (options?: RedirectOptions) => void;
  forbiddenRedirect: (options?: RedirectOptions) => void;
}

function useErrorRedirect(): RedirectUtilities {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast({ variant: "error" });
  const { t } = useTranslation("common", { keyPrefix: "error" });

  const unauthorizedRedirect = (options?: RedirectOptions): void => {
    const isRestrictedPage = restrictedPages.includes(location.pathname);

    if (isRestrictedPage) {
      navigate(paths.home, { replace: true });
      options?.showError && showToast(t("unauthorized"));
    }
  };

  const forbiddenRedirect = (options?: RedirectOptions): void => {
    navigate(paths.home, { replace: true });
    options?.showError && showToast(t("forbidden"));
  };

  return { unauthorizedRedirect, forbiddenRedirect };
}

export default useErrorRedirect;
