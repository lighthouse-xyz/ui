import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { defaultBannerImage, defaultEntityImage } from "@src/assets/hosted-assets";
import { borderRadius, entityBannerRatio, profileBannerRatio } from "@src/common/styles/style.const";

interface BannerProps {
  image: string;
  type: "profile" | "entity";
  size: "small" | "medium";
}

const Banner = styled(Paper)(({ image, type, size }: BannerProps) => ({
  aspectRatio: type === "entity" ? entityBannerRatio.value : profileBannerRatio.value,
  backgroundImage:
    type === "profile" ? `url(${image}), url(${defaultBannerImage})` : `url(${image}), url(${defaultEntityImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  borderRadius: size === "medium" ? borderRadius.medium : borderRadius.default,
}));

export { Banner };
