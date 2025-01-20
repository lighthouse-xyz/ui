import { Location, useLocation, useNavigate } from "react-router-dom";

interface DialogUtilities {
  navigateToDialog: <T>(dialogPath: string, state?: T) => void;
  closeDialog: () => void;
}

function useDialog(): DialogUtilities {
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = (location.state as { backgroundLocation?: Location })?.backgroundLocation;

  const dialogBackgroundLocation = backgroundLocation || location;

  const navigateToDialog = <T>(dialogPath: string, state?: T): void => {
    navigate(dialogPath, {
      state: { backgroundLocation: dialogBackgroundLocation, ...state },
    });
  };

  const closeDialog = (): void => {
    navigate(
      { pathname: dialogBackgroundLocation.pathname, search: dialogBackgroundLocation.search },
      { state: { fromDialog: true } },
    );
  };

  return { navigateToDialog, closeDialog };
}

export default useDialog;
