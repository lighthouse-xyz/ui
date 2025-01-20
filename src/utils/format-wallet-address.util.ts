import validator from "validator";

function formatWalletAddress(
  walletAddress?: string,
  options: { firstCharacters: number; lastCharacters: number } = { firstCharacters: 3, lastCharacters: 4 },
): string {
  if (walletAddress && validator.isEthereumAddress(walletAddress)) {
    const prefix = "0x";
    return (
      prefix +
      walletAddress.slice(prefix.length, options.firstCharacters + prefix.length) +
      "..." +
      walletAddress.slice(-options.lastCharacters)
    );
  }

  return walletAddress ?? "";
}

export default formatWalletAddress;
