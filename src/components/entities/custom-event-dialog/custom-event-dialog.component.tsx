/* eslint-disable max-lines */
import React, { useEffect, useState } from "react";
import { FormContainer } from "react-hook-form-mui";
import { Trans, useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import AdminEntityFormFields from "../admin-entity-form-fields/admin-entity-form-fields.component";
import PlacePicker from "./place-picker/place-picker.component";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { defaultEntityImage } from "@src/assets/hosted-assets";
import { ImageContext, ImageFormat } from "@src/common/enums/image.enum";
import {
  CreateCustomEventInput,
  EntityType,
  Event,
  EventCategory,
  Place,
  UpdateCustomEventMediaFromFileInput,
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
import useCreateEvent from "@src/hooks/discovery/use-create-event.hook";
import useDeleteEventMedia from "@src/hooks/discovery/use-delete-event-image.hook";
import { useLazyGetEntity } from "@src/hooks/discovery/use-get-entity.hook";
import useUpdateEvent from "@src/hooks/discovery/use-update-event.hook";
import useUpdateEventImageFromFile from "@src/hooks/discovery/use-update-event-image-from-file.hook";
import useUpdateEventImageFromNft from "@src/hooks/discovery/use-update-event-image-from-nft.hook";
import { useCreateForm } from "@src/hooks/utils/use-create-form/use-create-form.hook";
import { addRequiredAsterisk } from "@src/hooks/utils/use-create-form/use-create-form.util";
import useDeleteEntity from "@src/hooks/utils/use-delete-entity.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import { useEnum } from "@src/hooks/utils/use-enum.hook";
import useToast from "@src/hooks/utils/use-toast.hook";
import mapGenericToMergedEntity from "@src/utils/map-generic-to-merged-entity.util";

export interface EventFormData extends Omit<CreateCustomEventInput, "placeId" | "nextStartAt" | "nextFinishAt"> {
  place: Place;
  nextStartAt: Date;
  nextFinishAt: Date;
}

interface Props {
  godMode?: boolean;
}

// eslint-disable-next-line max-lines-per-function, complexity
const CustomEventDialog: React.FC<Props> = ({ godMode = false }) => {
  const dialogName = "custom-event-dialog";
  const endDateVarName = "nextFinishAt";
  const startDateVarName = "nextStartAt";

  const { navigateToDialog, closeDialog } = useDialog();
  const location = useLocation();
  const { t } = useTranslation();
  const { showToast } = useToast({ variant: "success" });
  const { getCategoryMapFromEnum } = useEnum();

  const { entity: updateData } = location.state as { entity: Entity | undefined };

  const { profile, loading: profileLoading } = useAuthContext();
  const { createEvent, loading: createLoading } = useCreateEvent();
  const { updateEvent, loading: updateLoading } = useUpdateEvent();
  const { deleteEntity: deleteEvent, loading: deleteLoading } = useDeleteEntity(EntityType.event);

  const {
    updateEventImageFromNft,
    loading: loadingUpdateImageFromNft,
    error: errorUpdateImageFromNft,
  } = useUpdateEventImageFromNft();
  const {
    updateEventImageFromFile,
    loading: loadingUpdateImageFromFile,
    error: errorUpdateImageFromFile,
  } = useUpdateEventImageFromFile();
  const { deleteImage, loading: loadingDeleteImage, error: errorDeleteImage } = useDeleteEventMedia("image");
  const {
    deleteImage: deleteFeaturedMedia,
    loading: loadingDeleteFeaturedMedia,
    error: errorDeleteFeaturedMedia,
  } = useDeleteEventMedia("featuredMedia");
  const { getEntity, data: initialPlaceData, loading: initialPlaceLoading } = useLazyGetEntity();

  const [eventImage, setEventImage] = useState<MediaImage | null | undefined>(
    updateData?.image ? { type: MediaType.url, url: updateData.image, media: updateData.image } : undefined,
  );
  const [eventFeaturedMedia, setEventFeaturedMedia] = useState<MediaImage | null | undefined>(
    updateData?.featuredMedia
      ? { type: MediaType.url, url: updateData.featuredMedia, media: updateData.featuredMedia }
      : undefined,
  );
  const [selectedPlace, setSelectedPlace] = useState<Place | null>((initialPlaceData?.entity as Place) ?? null);

  const isLoading =
    createLoading ||
    updateLoading ||
    deleteLoading ||
    loadingUpdateImageFromFile ||
    loadingUpdateImageFromNft ||
    loadingDeleteImage ||
    loadingDeleteFeaturedMedia;

  const nowRounded = new Date();
  nowRounded.setHours(nowRounded.getHours() + 1, 0, 0, 0);

  const defaultStartAt = new Date(nowRounded);
  defaultStartAt.setHours(defaultStartAt.getHours() + 1);

  const defaultEnd = new Date(defaultStartAt);
  defaultEnd.setHours(defaultEnd.getHours() + 1);

  const {
    formContext,
    resetForm,
    errors,
    watch,
    inputCreators: { createCategoriesInput, createDateTimePicker, createTagsInput, createTextField },
  } = useCreateForm<EventFormData>({
    nextStartAt: defaultStartAt,
    nextFinishAt: defaultEnd,
  });
  const watchDateFields = watch([startDateVarName, endDateVarName]);

  useEffect(() => {
    if (updateData) {
      const placeId = updateData.estateId ?? updateData.parcelId;
      if (placeId) {
        void getEntity({ variables: { id: placeId } });
      }

      resetForm({
        categories: updateData.eventCategories,
        description: updateData.description,
        name: updateData.name,
        nextStartAt: updateData.nextStartAt,
        nextFinishAt: updateData.nextFinishAt,
        ownerUser: updateData.ownerUser,
        tags: updateData.tags,
      });
    }
  }, []);

  useEffect(() => {
    if (initialPlaceData && updateData) {
      setSelectedPlace((initialPlaceData?.entity as Place) ?? null);
    }
  }, [initialPlaceLoading]);

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

  const handleSuccess = (event: Event, successMessage: string): void => {
    closeDialog();
    showToast(successMessage, {
      action: {
        label: t("events.viewEvent"),
        onClick: () =>
          navigateToDialog(paths.entityDetails.buildPath(event.entityId), { entity: mapGenericToMergedEntity(event) }),
      },
    });
  };

  const handleSubmit = async (eventData: EventFormData): Promise<void> => {
    const input: CreateCustomEventInput = {
      categories: eventData.categories,
      description: eventData.description,
      name: eventData.name,
      nextStartAt: eventData.nextStartAt.toISOString(),
      nextFinishAt: eventData.nextFinishAt.toISOString(),
      ownerUser: eventData.ownerUser ?? (profile?.userId || ""),
      placeId: selectedPlace?.entityId as string,
      tags: eventData.tags,
    };

    let fileEventMediaInput: UpdateCustomEventMediaFromFileInput | undefined = undefined;
    if (eventImage?.type === MediaType.file || eventFeaturedMedia?.type === MediaType.file) {
      fileEventMediaInput = {};
      if (eventImage?.type === MediaType.file) {
        fileEventMediaInput.image = { file: eventImage.media, cropArea: eventImage.croppedArea };
      }
      if (eventFeaturedMedia?.type === MediaType.file) {
        fileEventMediaInput.featuredMedia = {
          file: eventFeaturedMedia.media,
          cropArea: eventFeaturedMedia.croppedArea,
        };
      }
    }

    if (updateData) {
      const eventImageAlreadyExists = updateData.image && updateData.image !== defaultEntityImage;
      if (eventImage === null && eventImageAlreadyExists) {
        await deleteImage({
          variables: { entityId: updateData.entityId },
        });
      }

      const eventFeaturedMediaAlreadyExists =
        updateData.featuredMedia && updateData.featuredMedia !== defaultEntityImage;
      if (eventFeaturedMedia === null && eventFeaturedMediaAlreadyExists) {
        await deleteFeaturedMedia({
          variables: { entityId: updateData.entityId },
        });
      }

      if (fileEventMediaInput) {
        await updateEventImageFromFile({
          variables: { entityId: updateData.entityId, input: fileEventMediaInput },
        });
      }

      if (eventImage?.type === MediaType.nft) {
        await updateEventImageFromNft({
          variables: {
            entityId: updateData.entityId,
            input: { ...eventImage.media, cropArea: eventImage.croppedArea },
          },
        });
      }

      void updateEvent({
        variables: { id: updateData.entityId, input },
        onCompleted: data => handleSuccess(data.updateEvent, t("success.editEvent")),
        onError: () => showToast(t("error.updateEvent"), { variant: "error" }),
      });
    } else {
      void createEvent({
        variables: { input },
        onCompleted: data => {
          if (eventImage?.type === MediaType.nft) {
            void updateEventImageFromNft({
              variables: {
                entityId: data.createEvent.entityId,
                input: { ...eventImage.media, cropArea: eventImage.croppedArea },
              },
              onCompleted: imageUpdateData =>
                handleSuccess(imageUpdateData.updateEventImageFromNft, t("success.createEvent")),
              onError: () => handleSuccess(data.createEvent, t("success.createEvent")),
            });
          } else if (fileEventMediaInput) {
            void updateEventImageFromFile({
              variables: { entityId: data.createEvent.entityId, input: fileEventMediaInput },
              onCompleted: imageUpdateData =>
                handleSuccess(imageUpdateData.updateEventImageFromFile, t("success.createEvent")),
              onError: () => handleSuccess(data.createEvent, t("success.createEvent")),
            });
          } else {
            handleSuccess(data.createEvent, t("success.createEvent"));
          }
        },
        onError: () => showToast(t("error.createEvent"), { variant: "error" }),
      });
    }
  };

  useEffect(() => {
    const startDate = formContext.getValues(startDateVarName);
    const endDate = formContext.getValues(endDateVarName);
    if (startDate >= endDate && !errors.nextFinishAt) {
      formContext.setError(endDateVarName, { message: t("error.invalidEndDate") });
    } else if (endDate > startDate && errors.nextFinishAt) {
      formContext.clearErrors(endDateVarName);
    }
  }, [watchDateFields]);

  return (
    <DialogFrame persistent aria-labelledby={`${dialogName}-title`}>
      <LoadingBackdrop open={isLoading || profileLoading || initialPlaceLoading} borderRadius={borderRadius.default} />

      <Stack spacing={4} padding={6} paddingBottom={0}>
        <Typography variant="h6" id={`${dialogName}-title`}>
          {t(updateData ? "form.title.editEvent" : "form.title.createEvent")}
        </Typography>
        <FormDateProvider>
          <FormContainer formContext={formContext} onSuccess={handleSubmit}>
            <Stack spacing={10} whiteSpace="pre-line">
              <Stack spacing={4}>
                {createTextField({
                  varName: "name",
                  label: t("form.label.what"),
                  required: true,
                  placeholder: t("form.placeholder.eventName"),
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

              <PlacePicker
                initialPlace={selectedPlace ?? undefined}
                setValue={(place: Place | null) => {
                  setSelectedPlace(place);
                  formContext.resetField("place", { defaultValue: place ?? undefined });
                }}
                register={formContext.register}
                error={errors?.place}
                godMode={godMode}
              />

              <Stack spacing={4}>
                <Typography variant="h7">{addRequiredAsterisk(t("form.label.when"))}</Typography>
                {createDateTimePicker({
                  varName: startDateVarName,
                  label: t("form.label.startDate"),
                  required: true,
                  disablePast: true,
                  defaultValue: defaultStartAt,
                })}
                {createDateTimePicker({
                  varName: endDateVarName,
                  label: t("form.label.endDate"),
                  required: true,
                  defaultValue: defaultEnd,
                  disablePast: true,
                  minDateTime: new Date(formContext.getValues(startDateVarName)),
                })}
              </Stack>

              <ImageSelector
                mediaImage={eventImage}
                setMediaImage={setEventImage}
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
                    EventCategory,
                    "eventCategory",
                    updateData?.eventCategories?.includes(EventCategory.mvfw) ? undefined : [EventCategory.mvfw],
                  ),
                  initialCategoriesSelected: updateData?.eventCategories ?? [],
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
                  mediaImage={eventFeaturedMedia}
                  setMediaImage={setEventFeaturedMedia}
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
                        label: t("form.buttons.delete.buttonLabel", { type: "event" }),
                        onDelete: () => deleteEvent(updateData.entityId),
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

export default CustomEventDialog;
