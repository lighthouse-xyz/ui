import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { InView } from "react-intersection-observer";

import { ListNftsContainer, NftContainer } from "./nft-list-dialog.style";
import { NetworkStatus } from "@apollo/client";
import { Box, CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import { Nft } from "@src/common/interfaces/nft.interface";
import { borderRadius, entitiesResultLayout } from "@src/common/styles/style.const";
import Alert from "@src/components/common/alert/alert.component";
import DialogFrame from "@src/components/common/dialog-frame/dialog-frame.component";
import FormConfirmationButtons from "@src/components/common/form-confirmation-buttons/form-confirmation-buttons.component";
import Image from "@src/components/common/image/image.component";
import LoadingBackdrop from "@src/components/common/loading-backdrop/loading-backdrop.component";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import NoResultsFound from "@src/components/common/no-results-found/no-results-found.component";
import useGetNfts from "@src/hooks/discovery/use-get-nfts.hook";
import useFetchMore from "@src/hooks/utils/use-fetch-more.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

interface Props {
  walletAddress: string;
  closeNftListDialog: () => void;
  setSelectedNftInput: (nft: Nft) => void;
}

const NftListDialog: React.FC<Props> = ({ walletAddress, closeNftListDialog, setSelectedNftInput }) => {
  const dialogName = "select-nft-dialog";

  const theme = useTheme();
  const { showToast } = useToast({ variant: "error" });
  const { t } = useTranslation();

  const { data, loading, error, networkStatus, fetchMore } = useGetNfts({
    owner: walletAddress,
    limit: entitiesResultLayout.itemsPerPage,
    cursor: "",
  });
  const { fetchMoreItems } = useFetchMore<Nft>(fetchMore);

  const nftsList = data?.entities.list;
  const noNfts = (!nftsList && !error && !loading) || nftsList?.length === 0;
  const isFetchingMore = networkStatus === NetworkStatus.fetchMore;

  const [selectedNft, setSelectedNft] = useState<Nft | null>(null);

  useEffect(() => {
    if (error) {
      showToast(t("error.fetchNfts"));
    }
  }, [error]);

  const handleSelectNft = (): void => {
    if (selectedNft) {
      setSelectedNftInput(selectedNft);
    }
    closeNftListDialog();
  };

  const handleImageClick = (nft: Nft): void => {
    nft.image && setSelectedNft(nft);
  };

  return (
    <DialogFrame width="sm" persistent onClose={() => closeNftListDialog()} aria-labelledby={`${dialogName}-title`}>
      <Stack paddingX={6}>
        <Stack
          zIndex={theme.zIndex.modal}
          position="sticky"
          top={0}
          paddingY={6}
          bgcolor={theme.palette.background.paper}>
          <Typography variant="h6" marginBottom={6} id={`${dialogName}-title`}>
            {t("form.title.selectNft")}
          </Typography>

          <Alert color="info" content={t("warning.openSeaLimitation")} />
        </Stack>

        <Box position="relative" minHeight="114px">
          <LoadingBackdrop
            open={loading && !isFetchingMore}
            borderRadius={borderRadius.default}
            loadingIndicator={<CircularProgress />}
          />

          <ListNftsContainer>
            {nftsList?.map((nft, index) => (
              <NftContainer
                key={`${index}-${nft.entityId}-nft-container`}
                className={`${nft.entityId === selectedNft?.entityId ? "active" : ""}`}>
                <Image
                  key={`${index}-${nft.entityId}-nft`}
                  name={nft.name}
                  image={nft.image}
                  height="100px"
                  width="100px"
                  disableFallback
                  onClick={() => handleImageClick(nft)}
                />
              </NftContainer>
            ))}

            {fetchMore && !isFetchingMore && (
              <InView
                onChange={inView => {
                  if (inView && data?.entities.next) {
                    fetchMoreItems({ cursor: data.entities.next });
                  }
                }}
              />
            )}
          </ListNftsContainer>

          {noNfts && (
            <NoResultsFound title={t("noResults.nfts.title")} subtitle={t("noResults.nfts.subtitle")} marginTop="0px" />
          )}

          {isFetchingMore && <LoadingIndicator size="70px" />}
        </Box>

        <FormConfirmationButtons
          cancelButtonProps={{ label: t("cta.back"), onClick: closeNftListDialog }}
          confirmButtonProps={{ label: t("cta.select"), disabled: !selectedNft, onClick: handleSelectNft }}
        />
      </Stack>
    </DialogFrame>
  );
};

export default NftListDialog;
