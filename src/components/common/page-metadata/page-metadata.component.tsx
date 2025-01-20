import React from "react";
import { Helmet } from "react-helmet-async";

import ConditionalFeature from "../conditional-feature/conditional-feature.component";
import { allHostedImages, defaultMetadataImage } from "@src/assets/hosted-assets";
import { usePageMetadataContext } from "@src/context/page-metadata/page-metadata-context";
import { FeatureFlag } from "@src/hooks/utils/use-feature-flag.hook";

const PageMetadata: React.FC = () => {
  const { pageMetadata } = usePageMetadataContext();

  const { title, description } = pageMetadata;
  const image =
    pageMetadata.image && !allHostedImages.includes(pageMetadata.image) ? pageMetadata.image : defaultMetadataImage;
  const lighthouseTwitter = "@Lighthouse_wrld";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <ConditionalFeature name={FeatureFlag.dynamicSocialMediaMetadata}>
        <Helmet>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={lighthouseTwitter} />
          <meta name="twitter:image" content={image} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
        </Helmet>
      </ConditionalFeature>
    </>
  );
};

export default PageMetadata;
