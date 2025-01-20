import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Chip, Stack, Tooltip, Typography } from "@mui/material";
import { getAccessToken } from "@privy-io/react-auth";
import CopyToClipboard from "@src/components/common/copy-to-clipboard/copy-to-clipboard.component";
import { useAuthContext } from "@src/context/auth/auth-context";

const AdminInfo: React.FC = () => {
  const { t } = useTranslation();

  const { profile } = useAuthContext();
  const userId = profile?.userId ?? "";

  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (!token) {
      getAccessToken()
        .then(value => {
          if (value) {
            setToken(value);
          }
        })
        .catch(_ => undefined);
    }
  }, []);

  const buildRow = (label: string, content: string): JSX.Element => (
    <Stack direction="row" spacing={3} alignItems="center">
      <Typography variant="h9" noWrap minWidth="min-content">
        {label}:
      </Typography>
      <CopyToClipboard
        activator={
          <Tooltip title={t("cta.copy")} arrow placement="right">
            <Chip label={content} sx={{ maxWidth: "554px" }} />
          </Tooltip>
        }
        content={content}
      />
    </Stack>
  );

  return (
    <Stack spacing={4}>
      {buildRow(t("godMode.adminInfo.userId"), userId)}
      {buildRow(t("godMode.adminInfo.token"), token)}
    </Stack>
  );
};

export default AdminInfo;
