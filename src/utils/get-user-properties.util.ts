import { Profile } from "../common/graphql/generated/user.schema.graphql";
import formatWalletAddress from "./format-wallet-address.util";

function getUserIdHashAsNumber(userId: string): number {
  const prefix = "lh_us_";
  return parseInt(userId.substring(prefix.length), 16);
}

function getUsername(profile: Profile | null): string {
  return profile
    ? profile.alias || formatWalletAddress(profile.walletAddress, { firstCharacters: 3, lastCharacters: 2 })
    : "";
}

export { getUserIdHashAsNumber, getUsername };
