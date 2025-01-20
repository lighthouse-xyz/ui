import { createContext, useContext } from "react";

import { PageMetadata } from "@src/common/interfaces/page-metadata.interface";

interface PageMetadataContextInterface {
  pageMetadata: PageMetadata;
  setDynamicPageMetadata: (metadata: PageMetadata) => void;
}

const PageMetadataContext = createContext<PageMetadataContextInterface>({
  pageMetadata: {},
  setDynamicPageMetadata: (_metadata: PageMetadata) => {
    return;
  },
});

const usePageMetadataContext = (): PageMetadataContextInterface =>
  useContext<PageMetadataContextInterface>(PageMetadataContext);

export { PageMetadataContext, usePageMetadataContext };
