import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { BannerContainer } from "./cookies-consent-banner.style";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as InfoIcon } from "@src/assets/icons/info-circle-icon.svg";
import links from "@src/common/links";
import Switch from "@src/components/common/switch/switch.component";
import { useMixpanelContext } from "@src/context/analytics/mixpanel-context";
import { handleGtmInitGtag } from "@src/utils/gtm.util";
import { getLocalStorage, localStorageKeys, setLocalStorage } from "@src/utils/local-storage.util";

const CookiesConsentBanner: React.FC = () => {
  const { t } = useTranslation();
  const { mixpanel } = useMixpanelContext();

  const [cookiesDisabled, setCookiesDisabled] = useState(() =>
    getLocalStorage<boolean | null>(localStorageKeys.cookiesDisabled, null),
  );
  const [isBannerDismissed, setIsBannerDismissed] = useState(cookiesDisabled !== null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCookiesDisabled(event.target.checked);
  };

  const saveValue = (disableCookies: boolean): void => {
    setLocalStorage<boolean>(localStorageKeys.cookiesDisabled, disableCookies);
    setIsBannerDismissed(true);
    handleGtmInitGtag();
    if (!disableCookies) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      mixpanel?.set_config({ disable_persistence: false });
    }
  };

  return !isBannerDismissed ? (
    <BannerContainer elevation={0} square data-testid="cookies-consent-banner">
      <Stack direction="row" spacing={1} alignItems="flex-start">
        <InfoIcon />
        <Grid container alignItems="center" columnSpacing={7} rowGap={2}>
          <Grid item xs>
            <Stack spacing={1}>
              <Typography noWrap variant="h8">
                {t("cookies.cookiesAndYou")}
              </Typography>
              <Typography variant="body2">
                <Trans
                  i18nKey="cookies.explanation"
                  components={{
                    strong: <strong />,
                    Link: <Link href={links.externalPages.privacy} color="common.white" />,
                  }}
                />
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={3} alignItems="center">
              <Typography noWrap variant="body2">
                {t("cookies.optOut")}
              </Typography>
              <Switch color="secondary" size="large" onChange={handleChange} />
            </Stack>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={() => saveValue(cookiesDisabled ?? false)}>
              {t("cookies.gotIt")}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </BannerContainer>
  ) : null;
};

export default CookiesConsentBanner;
