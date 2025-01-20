import { MediaArea, NftPictureInput } from "../graphql/generated/discovery.schema.graphql";

export enum MediaType {
  file = "file",
  url = "url",
  nft = "nft",
}

export interface MediaImageUrl {
  type: MediaType.url;
  url: string;
  media: string;
  croppedArea?: MediaArea;
}

export interface MediaImageFile {
  type: MediaType.file;
  url: string;
  media: File;
  croppedArea?: MediaArea;
}

export interface MediaImageNft {
  type: MediaType.nft;
  url: string;
  media: NftPictureInput;
  croppedArea?: MediaArea;
}

export type MediaImage = MediaImageUrl | MediaImageFile | MediaImageNft;
