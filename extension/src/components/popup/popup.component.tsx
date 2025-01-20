import React from "react";

import { storageKeys } from "../../common/storage";
import { useSyncChromeStorage } from "../../hooks/use-chrome-storage.hook";
import Footer from "../footer/footer.component";
import OnlineSection from "../online-section/online-section.component";
import OpenLighthouseButton from "../open-lighthouse-button/open-lighthouse-button.component";
import { PopupContainer } from "./popup.style";
import Alert from "@src/components/common/alert/alert.component";

const Popup: React.FC = () => {
  const [token, setToken] = useSyncChromeStorage(storageKeys.token, undefined);
  const [userId, setUserId] = useSyncChromeStorage(storageKeys.userId, undefined);

  const resetToken = React.useCallback(() => {
    setToken(undefined);
    setUserId(undefined);
  }, [setToken]);

  const signedIn = !!token && !!userId;

  return (
    <PopupContainer>
      {signedIn ? (
        <OnlineSection userId={userId} />
      ) : (
        <Alert
          icon={false}
          color="primary"
          content={"Enable the extension by signing in through our website"}
          action={{
            content: <OpenLighthouseButton />,
            position: "bottom",
          }}
        />
      )}
      <Footer signedIn={signedIn} resetToken={resetToken} />
    </PopupContainer>
  );
};

export default Popup;
