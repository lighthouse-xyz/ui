import React from "react";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as CopyIcon } from "@src/assets/icons/copy-icon.svg";
import CopyToClipboard from "@src/components/common/copy-to-clipboard/copy-to-clipboard.component";
import formatWalletAddress from "@src/utils/format-wallet-address.util";

interface Props {
  walletAddress: string;
  typography?: "caption" | "h9";
  formatOptions?: { firstCharacters: number; lastCharacters: number };
  iconSize?: string;
}

const WalletAddress: React.FC<Props> = ({
  walletAddress,
  typography = "caption",
  formatOptions,
  iconSize = "24px",
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant={typography}>{formatWalletAddress(walletAddress, formatOptions)}</Typography>
      <CopyToClipboard
        activator={
          <IconButton>
            <CopyIcon width={iconSize} height={iconSize} />
          </IconButton>
        }
        content={walletAddress}
      />
    </Stack>
  );
};

export default WalletAddress;
