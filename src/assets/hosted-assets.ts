let baseUrl: string;

switch (process.env.REACT_APP_ENV) {
  case "dev":
  case "local":
    baseUrl = "https://cdn.dev.lighthouse.world/static";
    break;
  default:
    baseUrl = "https://cdn.lighthouse.world/static";
    break;
}

const defaultMetadataImage = `${baseUrl}/Lighthouse%20thumbnail.svg`;
const defaultEntityImage = `${baseUrl}/default-entity-image.svg`;
const defaultUserImages = [
  `${baseUrl}/default-user-image-1.svg`,
  `${baseUrl}/default-user-image-2.svg`,
  `${baseUrl}/default-user-image-3.svg`,
];
const defaultBannerImage = `${baseUrl}/default-banner-image.svg`;
const allHostedImages = [defaultMetadataImage, defaultEntityImage, defaultBannerImage, ...defaultUserImages];
const landingPageVideo = `${baseUrl}/landing-page-background-video.mp4`;

export {
  allHostedImages,
  defaultBannerImage,
  defaultEntityImage,
  defaultMetadataImage,
  defaultUserImages,
  landingPageVideo,
};
