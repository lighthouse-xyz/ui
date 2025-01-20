import React, { useEffect, useRef, useState } from "react";

import { BlackOverlay, ShadowImg, StyledImg, StyledSkeleton } from "./image.style";
import Box from "@mui/material/Box";
import { defaultEntityImage } from "@src/assets/hosted-assets";
import { getDefaultUserImage } from "@src/utils/image-fallbacks.util";

interface Props {
  image: string;
  name: string;
  width: string;
  height: string;
  context?: "details" | "card";
  disableFallback?: boolean;
  userId?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Image: React.FC<Props> = ({
  image,
  name,
  width,
  height,
  context = "card",
  disableFallback = false,
  userId,
  onClick,
}) => {
  const timeoutMs = 10000;
  const fallbackImage = userId ? getDefaultUserImage(userId) : defaultEntityImage;

  const imgRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState(true);
  const [displayDefaultImage, setDisplayDefaultImage] = useState(image === fallbackImage);

  const imageSuccessfullyLoadedOnDetails = !loading && !displayDefaultImage && context === "details";

  useEffect(() => {
    if (disableFallback) return undefined;

    const timeout = setTimeout(() => {
      if (loading && imgRef.current) {
        setDisplayDefaultImage(true);
        imgRef.current.src = fallbackImage;
      }
    }, timeoutMs);

    return () => clearTimeout(timeout);
  }, [loading]);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    if (disableFallback) return;

    setLoading(false);
    setDisplayDefaultImage(true);
    event.currentTarget.src = fallbackImage;
  };

  const handleImageLoaded = (): void => setLoading(false);

  return (
    <Box position="relative" width={width} height={height}>
      {!!image && (
        <>
          {imageSuccessfullyLoadedOnDetails && (
            <>
              <ShadowImg ref={imgRef} src={image} alt={name} width={width} height={height} />
              <BlackOverlay position="absolute" width={width} height={height} />
            </>
          )}
          <StyledImg
            ref={imgRef}
            src={image}
            alt={name}
            width={width}
            height={height}
            objectfit={imageSuccessfullyLoadedOnDetails ? "contain" : "cover"}
            onClick={onClick}
            onError={handleImageError}
            onLoad={handleImageLoaded}
          />
        </>
      )}

      {loading && (
        <Box position="relative" width={width} height={height}>
          <StyledSkeleton variant="rectangular" animation="wave" width={width} height={height} onClick={onClick} />
        </Box>
      )}
    </Box>
  );
};

export default Image;
