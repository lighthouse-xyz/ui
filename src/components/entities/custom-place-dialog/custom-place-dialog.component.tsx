/* eslint-disable max-lines, max-lines-per-function, complexity */
import React, { useEffect, useState } from "react";
import { FormContainer } from "react-hook-form-mui";
import { Trans, useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import AdminEntityFormFields from "../admin-entity-form-fields/admin-entity-form-fields.component";
import { CustomWidthTooltip, SupportedWorldsText } from "./custom-place-dialog.style";
import { ApolloError } from "@apollo/client";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { defaultEntityImage } from "@src/assets/hosted-assets";
import { ImageContext, ImageFormat } from "@src/common/enums/image.enum";
import {
  CreateCustomPlaceInput,
  EntityType,
  ParcelCategory,
  Place,
  UpdateCustomPlaceMediaFromFileInput,
  World,
} from "@src/common/graphql/generated/discovery.schema.graphql";
import { Entity } from "@src/common/interfaces/entity.type";
import { MediaImage, MediaType } from "@src/common/interfaces/media-image.type";
import paths from "@src/common/paths";
import { borderRadius, defaultMaxTags } from "@src/common/styles/style.const";
import DialogFrame from "@src/components/common/dialog-frame/dialog-frame.component";
import FormConfirmationButtons from "@src/components/common/form-confirmation-buttons/form-confirmation-buttons.component";
import FormDateProvider from "@src/components/common/form-date-provider/form-date-provider.component";
import ImageSelector from "@src/components/common/image-selector/image-selector.component";
import LoadingBackdrop from "@src/components/common/loading-backdrop/loading-backdrop.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import useCreatePlace from "@src/hooks/discovery/use-create-place.hook";
import useDeletePlaceMedia from "@src/hooks/discovery/use-delete-place-image.hook";
import useUpdatePlace from "@src/hooks/discovery/use-update-place.hook";
import useUpdatePlaceImageFromFile from "@src/hooks/discovery/use-update-place-image-from-file.hook";
import useUpdatePlaceImageFromNft from "@src/hooks/discovery/use-update-place-image-from-nft.hook";
import { useCreateForm } from "@src/hooks/utils/use-create-form/use-create-form.hook";
import { addRequiredAsterisk } from "@src/hooks/utils/use-create-form/use-create-form.util";
import useDeleteEntity from "@src/hooks/utils/use-delete-entity.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import { useEnum } from "@src/hooks/utils/use-enum.hook";
import useToast from "@src/hooks/utils/use-toast.hook";
import mapGenericToMergedEntity from "@src/utils/map-generic-to-merged-entity.util";
import { urlStartsWithHttps } from "@src/utils/validate-url.util";
import { getIndexedWorlds, getWorldLabel } from "@src/utils/worlds.util";

interface Props {
  godMode?: boolean;
}

const CustomPlaceDialog: React.FC<Props> = ({ godMode }) => {
  const dialogName = "custom-place-dialog";
  const supportedWorlds = getIndexedWorlds()
    .map(world => getWorldLabel(world as World))
    .join(", ");

  const { navigateToDialog, closeDialog } = useDialog();
  const location = useLocation();
  const { t } = useTranslation();
  const { showToast } = useToast({ variant: "success" });
  const { getCategoryMapFromEnum } = useEnum();

  const { entity: updateData } = location.state as { entity: Entity | undefined };

  const { profile, loading: profileLoading } = useAuthContext();
  const { createPlace, loading: createLoading } = useCreatePlace();
  const { updatePlace, loading: updateLoading } = useUpdatePlace();
  const { deleteEntity: deletePlace, loading: deleteLoading } = useDeleteEntity(EntityType.parcel);

  const {
    updatePlaceImageFromNft,
    loading: loadingUpdateImageFromNft,
    error: errorUpdateImageFromNft,
  } = useUpdatePlaceImageFromNft();
  const {
    updatePlaceImageFromFile,
    loading: loadingUpdateImageFromFile,
    error: errorUpdateImageFromFile,
  } = useUpdatePlaceImageFromFile();
  const { deleteImage, loading: loadingDeleteImage, error: errorDeleteImage } = useDeletePlaceMedia("image");
  const {
    deleteImage: deleteFeaturedMedia,
    loading: loadingDeleteFeaturedMedia,
    error: errorDeleteFeaturedMedia,
  } = useDeletePlaceMedia("featuredMedia");

  const [placeImage, setPlaceImage] = useState<MediaImage | null | undefined>(
    updateData?.image ? { type: MediaType.url, url: updateData.image, media: updateData.image } : undefined,
  );
  const [placeFeaturedMedia, setPlaceFeaturedMedia] = useState<MediaImage | null | undefined>(
    updateData?.featuredMedia
      ? { type: MediaType.url, url: updateData.featuredMedia, media: updateData.featuredMedia }
      : undefined,
  );

  const isLoading =
    createLoading ||
    updateLoading ||
    deleteLoading ||
    loadingUpdateImageFromFile ||
    loadingUpdateImageFromNft ||
    loadingDeleteImage ||
    loadingDeleteFeaturedMedia;

  const {
    formContext,
    resetForm,
    errors,
    inputCreators: { createCategoriesInput, createTagsInput, createTextField },
  } = useCreateForm<CreateCustomPlaceInput>();

  useEffect(() => {
    if (updateData) {
      resetForm({
        categories: updateData.parcelCategories,
        description: updateData.description,
        name: updateData.name,
        ownerUser: updateData.ownerUser,
        tags: updateData.tags,
        url: updateData.url,
      });
    }
  }, [updateData]);

  const invalidUrl = (errorObject: ApolloError): boolean => {
    const invalidUrlError = errorObject.graphQLErrors?.find(({ message }) => message?.includes("input.'url'"));

    if (invalidUrlError) {
      formContext.setError("url", { message: t("error.invalidPlaceUrl") });
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (errorUpdateImageFromFile) {
      const nsfwError = errorUpdateImageFromFile.graphQLErrors?.find(
        ({ extensions }) => extensions.code === "FILE_CONTENT_NSFW",
      );

      if (nsfwError) {
        showToast(t("error.uploadNsfw"), { variant: "error" });
      } else {
        showToast(t("error.upload"), { variant: "error" });
      }
    }
  }, [errorUpdateImageFromFile]);

  useEffect(() => {
    if (errorUpdateImageFromNft) {
      showToast(t("error.selectNft"), { variant: "error" });
    }
  }, [errorUpdateImageFromNft]);

  useEffect(() => {
    if (errorDeleteImage || errorDeleteFeaturedMedia) {
      showToast(t("error.deleteImage"), { variant: "error" });
    }
  }, [errorDeleteImage, errorDeleteFeaturedMedia]);

  const handleSuccess = (place: Place, successMessage: string): void => {
    closeDialog();
    showToast(successMessage, {
      action: {
        label: t("places.viewPlace"),
        onClick: () =>
          navigateToDialog(paths.entityDetails.buildPath(place.entityId), { entity: mapGenericToMergedEntity(place) }),
      },
    });
  };

  const handleSubmit = async (placeData: CreateCustomPlaceInput): Promise<void> => {
    const input: CreateCustomPlaceInput = {
      categories: placeData.categories,
      description: placeData.description,
      marketplace: placeData.marketplace,
      name: placeData.name,
      ownerUser: placeData.ownerUser ?? (profile?.userId || ""),
      tags: placeData.tags,
      url: !urlStartsWithHttps(placeData.url.toLowerCase()) ? `https://${placeData.url}` : placeData.url,
    };

    let filePlaceMediaInput: UpdateCustomPlaceMediaFromFileInput | undefined = undefined;
    if (placeImage?.type === MediaType.file || placeFeaturedMedia?.type === MediaType.file) {
      filePlaceMediaInput = {};
      if (placeImage?.type === MediaType.file) {
        filePlaceMediaInput.image = { file: placeImage.media, cropArea: placeImage.croppedArea };
      }
      if (placeFeaturedMedia?.type === MediaType.file) {
        filePlaceMediaInput.featuredMedia = {
          file: placeFeaturedMedia.media,
          cropArea: placeFeaturedMedia.croppedArea,
        };
      }
    }

    if (updateData) {
      const placeImageAlreadyExists = updateData.image && updateData.image !== defaultEntityImage;
      if (placeImage === null && placeImageAlreadyExists) {
        await deleteImage({
          variables: { entityId: updateData.entityId },
        });
      }

      const placeFeaturedMediaAlreadyExists =
        updateData.featuredMedia && updateData.featuredMedia !== defaultEntityImage;
      if (placeFeaturedMedia === null && placeFeaturedMediaAlreadyExists) {
        await deleteFeaturedMedia({
          variables: { entityId: updateData.entityId },
        });
      }

      if (filePlaceMediaInput) {
        await updatePlaceImageFromFile({
          variables: { entityId: updateData.entityId, input: filePlaceMediaInput },
        });
      }

      if (placeImage?.type === MediaType.nft) {
        await updatePlaceImageFromNft({
          variables: {
            entityId: updateData.entityId,
            input: { ...placeImage.media, cropArea: placeImage.croppedArea },
          },
        });
      }

      void updatePlace({
        variables: { id: updateData.entityId, input },
        onCompleted: data => handleSuccess(data.updatePlace, t("success.editPlace")),
        onError: updateError => !invalidUrl(updateError) && showToast(t("error.updatePlace"), { variant: "error" }),
      });
    } else {
      void createPlace({
        variables: { input },
        onCompleted: data => {
          if (placeImage?.type === MediaType.nft) {
            void updatePlaceImageFromNft({
              variables: {
                entityId: data.createPlace.entityId,
                input: { ...placeImage.media, cropArea: placeImage.croppedArea },
              },
              onCompleted: imageUpdateData =>
                handleSuccess(imageUpdateData.updatePlaceImageFromNft, t("success.createPlace")),
              onError: () => handleSuccess(data.createPlace, t("success.createPlace")),
            });
          } else if (filePlaceMediaInput) {
            void updatePlaceImageFromFile({
              variables: { entityId: data.createPlace.entityId, input: filePlaceMediaInput },
              onCompleted: imageUpdateData =>
                handleSuccess(imageUpdateData.updatePlaceImageFromFile, t("success.createPlace")),
              onError: () => handleSuccess(data.createPlace, t("success.createPlace")),
            });
          } else {
            handleSuccess(data.createPlace, t("success.createPlace"));
          }
        },
        onError: createError => !invalidUrl(createError) && showToast(t("error.createPlace"), { variant: "error" }),
      });
    }
  };

  return (
    <DialogFrame persistent aria-labelledby={`${dialogName}-title`}>
      <LoadingBackdrop open={isLoading || profileLoading} borderRadius={borderRadius.default} />

      <Stack spacing={4} padding={6} paddingBottom={0}>
        <Typography variant="h6" id={`${dialogName}-title`}>
          {t(updateData ? "form.title.editPlace" : "form.title.createPlace")}
        </Typography>
        <FormDateProvider>
          <FormContainer formContext={formContext} onSuccess={handleSubmit}>
            <Stack spacing={10} whiteSpace="pre-line">
              <Stack spacing={4}>
                <Stack direction="row" spacing={2} alignItems="baseline">
                  <Typography variant="h7">{addRequiredAsterisk(t("form.label.where"))}</Typography>
                  <CustomWidthTooltip title={supportedWorlds} arrow color="primary" placement="bottom-start">
                    <SupportedWorldsText variant="body2">{t("form.labelInfo.supportedWorlds")}</SupportedWorldsText>
                  </CustomWidthTooltip>
                </Stack>
                {createTextField({
                  varName: "url",
                  required: true,
                  placeholder: t("form.placeholder.placeUrl"),
                })}
              </Stack>

              <Stack spacing={4}>
                <Typography variant="h7">{addRequiredAsterisk(t("form.label.what"))}</Typography>
                {createTextField({
                  varName: "name",
                  required: true,
                  placeholder: t("form.placeholder.placeName"),
                  initialCount: updateData?.name.length ?? 0,
                  maxLength: 100,
                })}
                {createTextField({
                  varName: "description",
                  required: true,
                  placeholder: t("form.placeholder.description"),
                  initialCount: updateData?.description?.length ?? 0,
                  maxLength: 1000,
                  rows: 3,
                })}
              </Stack>

              <ImageSelector
                mediaImage={placeImage}
                setMediaImage={setPlaceImage}
                imageProps={{ format: ImageFormat.banner, context: ImageContext.entity }}
                label={t("form.label.image")}
              />

              <Stack spacing={6}>
                {createCategoriesInput({
                  varName: "categories",
                  helper: (
                    <Trans
                      i18nKey="form.helper.experienceCategories"
                      values={{ maxTags: defaultMaxTags }}
                      components={{
                        highlight: (
                          <Typography
                            variant="caption"
                            color={Object.keys(errors).includes("categories") ? "error" : "text.secondary"}
                          />
                        ),
                      }}
                    />
                  ),
                  label: t("form.label.tags"),
                  categoriesList: getCategoryMapFromEnum(
                    ParcelCategory,
                    "placeCategory",
                    updateData?.parcelCategories?.includes(ParcelCategory.mvfw) ? undefined : [ParcelCategory.mvfw],
                  ),
                  initialCategoriesSelected: updateData?.parcelCategories ?? [],
                  required: true,
                  maxSelected: defaultMaxTags,
                })}
                {createTagsInput({
                  varName: "tags",
                  helper: (
                    <Trans
                      i18nKey="form.helper.experienceTags"
                      values={{ maxTags: defaultMaxTags }}
                      components={{
                        strong: <strong />,
                      }}
                    />
                  ),
                  placeholder: t("form.placeholder.tags"),
                  maxTags: defaultMaxTags,
                  initialTags: updateData?.tags,
                })}
              </Stack>

              {godMode && (
                <AdminEntityFormFields
                  createTextField={createTextField}
                  mediaImage={placeFeaturedMedia}
                  setMediaImage={setPlaceFeaturedMedia}
                  includeMarketplace
                />
              )}

              <FormConfirmationButtons
                cancelButtonProps={{ onClick: closeDialog }}
                confirmButtonProps={{
                  loading: isLoading,
                  disabled: Object.keys(errors).length !== 0,
                }}
                deleteButtonProps={
                  godMode && !!updateData
                    ? {
                        label: t("form.buttons.delete.buttonLabel", { type: "place" }),
                        onDelete: () => deletePlace(updateData.entityId),
                      }
                    : undefined
                }
              />
            </Stack>
          </FormContainer>
        </FormDateProvider>
      </Stack>
    </DialogFrame>
  );
};

export default CustomPlaceDialog;
