export type AssetContract = {
  address: string;
};

export interface Nft {
  assetContract: AssetContract;
  entityId: string;
  image: string;
  name: string;
  tokenId: string;
}
