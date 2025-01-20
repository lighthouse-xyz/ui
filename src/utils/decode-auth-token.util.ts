import { JwtPayload } from "jsonwebtoken";

import { AuthToken } from "../common/interfaces/auth-token.interface";

interface JwtToken extends JwtPayload {
  walletAddress: string;
  ownsLighthouseNft?: boolean;
}

function decodeAuthToken(token: AuthToken): JwtToken {
  const base64Url = token.token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const decoded = globalThis.atob(base64);

  return JSON.parse(decoded) as JwtToken;
}

function decodePrivyAuthToken(token: string): JwtToken {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const decoded = globalThis.atob(base64);

  return JSON.parse(decoded) as JwtToken;
}

export { decodeAuthToken, decodePrivyAuthToken };
