import React from "react";

import { Banner } from "./image-banner.style";
import { defaultBannerImage, defaultEntityImage } from "@src/assets/hosted-assets";

interface Props {
  type: "profile" | "entity";
  image?: string;
  size?: "small" | "medium";
}

const ImageBanner: React.FC<Props> = ({ type, image, size = "medium" }) => {
  const defaultImage = type === "entity" ? defaultEntityImage : defaultBannerImage;

  return <Banner image={image ?? defaultImage} type={type} size={size} elevation={0} />;
};

export default ImageBanner;
