/* eslint-disable max-lines, max-lines-per-function, complexity */
import React, { useEffect, useState } from "react";
import { FormContainer } from "react-hook-form-mui";
import { Trans, useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { Chip, InputAdornment, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { defaultBannerImage } from "@src/assets/hosted-assets";
import { ReactComponent as GlobalIcon } from "@src/assets/icons/global-icon.svg";
import { ReactComponent as DiscordLogo } from "@src/assets/logos/discord-bw-logo.svg";
import { ReactComponent as DiscordUserLogo } from "@src/assets/logos/discord-user-bw-logo.svg";
import { ReactComponent as InstagramLogo } from "@src/assets/logos/instagram-bw-logo.svg";
import { ReactComponent as MediumLogo } from "@src/assets/logos/medium-logo.svg";
import { ReactComponent as MirrorLogo } from "@src/assets/logos/mirror-bw-logo.svg";
import { ReactComponent as TwitterLogo } from "@src/assets/logos/twitter-bw-logo.svg";
import { ImageContext, ImageFormat } from "@src/common/enums/image.enum";
import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";
import {
  Profile,
  UpdateProfileInput,
  UpdateProfileMediaFromFileInput,
  UserCategory,
} from "@src/common/graphql/generated/user.schema.graphql";
import { MediaImage, MediaType } from "@src/common/interfaces/media-image.type";
import { borderRadius, defaultMaxTags } from "@src/common/styles/style.const";
import CopyToClipboard from "@src/components/common/copy-to-clipboard/copy-to-clipboard.component";
import DialogFrame from "@src/components/common/dialog-frame/dialog-frame.component";
import FormConfirmationButtons from "@src/components/common/form-confirmation-buttons/form-confirmation-buttons.component";
import ImageSelector from "@src/components/common/image-selector/image-selector.component";
import LoadingBackdrop from "@src/components/common/loading-backdrop/loading-backdrop.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import useDeleteProfileImage from "@src/hooks/user/use-delete-profile-image.hook";
import useUpdateProfile from "@src/hooks/user/use-update-profile.hook";
import useUpdateProfileImageFromNft from "@src/hooks/user/use-update-profile-image-from-nft.hook";
import useUpdateProfileImageFromFiles from "@src/hooks/user/use-update-profile-images-from-files.hook";
import { useCreateForm } from "@src/hooks/utils/use-create-form/use-create-form.hook";
import useDeleteEntity from "@src/hooks/utils/use-delete-entity.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import { useEnum } from "@src/hooks/utils/use-enum.hook";
import useToast from "@src/hooks/utils/use-toast.hook";
import formatWalletAddress from "@src/utils/format-wallet-address.util";
import { getUsername } from "@src/utils/get-user-properties.util";
import { getDefaultUserImage } from "@src/utils/image-fallbacks.util";
import { isUrlInput, urlStartsWithHttps, UrlType } from "@src/utils/validate-url.util";
import mapValues from "lodash.mapvalues";

const EditProfileDialog: React.FC = () => {
  const dialogName = "edit-profile-dialog";
  const sizeLogo = "32px";
  const maxAliasLength = 50;
  const maxHandleLength = 15;
  const maxDiscordUsername = 32;
  const maxDescriptionLength = 1000;
  const maxUrlLength = 2048;
  const hideToastAfter = 5000;

  const theme = useTheme();
  const { closeDialog } = useDialog();
  const { showToast } = useToast({ variant: "error", hideAfter: hideToastAfter });
  const { t } = useTranslation();
  const { getCategoryMapFromEnum } = useEnum();
  const location = useLocation();

  const { gate: profileFromState } = location.state as { gate?: Profile };
  const { profile: profileContext, loading: loadingProfileContext } = useAuthContext();

  const profile = profileFromState ?? profileContext;

  const isLightkeeper = !!profile?.category && profile.category === UserCategory.lightkeeper;
  const isBrand = !!profile?.category && profile.category === UserCategory.brand;
  const isExplorerOrCreator =
    !!profile?.category && (profile.category === UserCategory.explorer || profile.category === UserCategory.creator);
  const excludedCategories = profileFromState
    ? []
    : isExplorerOrCreator
    ? [UserCategory.lightkeeper, UserCategory.brand]
    : isBrand
    ? [UserCategory.lightkeeper]
    : [];

  const { updateProfile, loading: loadingUpdateProfile } = useUpdateProfile();
  const { deleteEntity: deleteProfile, loading: loadingDeleteProfile } = useDeleteEntity(EntityType.member);
  const {
    updateImage: updateAvatarFromNft,
    loading: loadingUpdateAvatarFromNft,
    error: errorUpdateAvatarFromNft,
  } = useUpdateProfileImageFromNft("picture");
  const {
    updateImage: updateBannerFromNft,
    loading: loadingUpdateBannerFromNft,
    error: errorUpdateBannerFromNft,
  } = useUpdateProfileImageFromNft("banner");
  const {
    updateImagesFromFiles,
    loading: loadingImagesFromFiles,
    error: errorUpdateImagesFromFiles,
  } = useUpdateProfileImageFromFiles();
  const {
    deleteImage: deleteAvatar,
    loading: loadingDeleteAvatar,
    error: errorDeleteAvatar,
  } = useDeleteProfileImage("picture");
  const {
    deleteImage: deleteBanner,
    loading: loadingDeleteBanner,
    error: errorDeleteBanner,
  } = useDeleteProfileImage("banner");

  const [imageAvatar, setImageAvatar] = useState<MediaImage | null | undefined>(
    profile?.picture ? { type: MediaType.url, url: profile.picture, media: profile.picture } : undefined,
  );
  const [imageBanner, setImageBanner] = useState<MediaImage | null | undefined>(
    profile?.banner ? { type: MediaType.url, url: profile.banner, media: profile.banner } : undefined,
  );

  const isLoading =
    loadingUpdateProfile ||
    loadingDeleteProfile ||
    loadingImagesFromFiles ||
    loadingUpdateAvatarFromNft ||
    loadingUpdateBannerFromNft ||
    loadingDeleteAvatar ||
    loadingDeleteBanner;

  const getDefaultValues = (): UpdateProfileInput => {
    if (profile) {
      return {
        alias: profile.alias,
        description: profile.description,
        category: profile.category,
        discord: profile.discord,
        discordUsername: profile.discordUsername,
        handle: profile.handle,
        instagram: profile.instagram,
        medium: profile.medium,
        mirror: profile.mirror,
        tags: profile.tags,
        twitter: profile.twitter,
        website: profile.website,
      };
    }

    return {} as UpdateProfileInput;
  };

  const {
    formContext,
    errors,
    resetForm,
    inputCreators: { createTextField, createTagsInput, createCategoriesInput },
  } = useCreateForm<UpdateProfileInput>(getDefaultValues());

  const updateImages = async (): Promise<void> => {
    const avatarImageAlreadyExists =
      profile?.picture && profile?.picture !== getDefaultUserImage(profile?.userId || "");
    const bannerImageAlreadyExists = profile?.banner && profile?.banner !== defaultBannerImage;

    if (imageAvatar === null && avatarImageAlreadyExists) {
      await deleteAvatar({
        variables: { userId: profile?.userId },
      });
    }
    if (imageBanner === null && bannerImageAlreadyExists) {
      await deleteBanner({
        variables: { userId: profile?.userId },
      });
    }

    if (imageAvatar?.type === MediaType.file || imageBanner?.type === MediaType.file) {
      const filesInput: UpdateProfileMediaFromFileInput = {
        banner:
          imageBanner?.type === MediaType.file
            ? { file: imageBanner.media, cropArea: imageBanner.croppedArea }
            : undefined,
        picture:
          imageAvatar?.type === MediaType.file
            ? { file: imageAvatar.media, cropArea: imageAvatar.croppedArea }
            : undefined,
      };
      await updateImagesFromFiles({
        variables: {
          input: filesInput,
          userId: profile?.userId,
        },
      });
    }

    if (imageAvatar?.type === MediaType.nft) {
      await updateAvatarFromNft({
        variables: {
          userId: profile?.userId,
          input: { ...imageAvatar.media, cropArea: imageAvatar.croppedArea },
        },
      });
    }

    if (imageBanner?.type === MediaType.nft) {
      await updateBannerFromNft({
        variables: {
          userId: profile?.userId,
          input: { ...imageBanner.media, cropArea: imageBanner.croppedArea },
        },
      });
    }
  };

  const handleSubmit = async (profileUpdated: UpdateProfileInput): Promise<void> => {
    const input = mapValues(profileUpdated, (value, key) => {
      value = value === "" ? null : value;
      if (
        value &&
        typeof value === "string" &&
        isUrlInput(key) &&
        key !== UrlType.discordUsername &&
        !urlStartsWithHttps(value.toLowerCase())
      ) {
        value = `https://${value}`;
      } else if (value && key === "category") {
        value = value[0];
      }
      return value;
    });
    if (!input.alias && input?.handle) {
      input.alias = input.handle;
    }

    await updateImages();

    void updateProfile({
      variables: { input, id: profile?.userId },
      onCompleted: closeDialog,
      onError: errorUpdateProfile => {
        const handleAlreadyTakenError = errorUpdateProfile.graphQLErrors?.find(
          ({ extensions }) => extensions.code === "USER_HANDLE_ALREADY_TAKEN",
        );
        if (handleAlreadyTakenError) {
          formContext.setError("handle", { type: "validate" });
        } else {
          showToast(t("error.updateProfile"));
        }
      },
    });
  };

  useEffect(() => {
    if (!loadingProfileContext) {
      resetForm(getDefaultValues());
      setImageAvatar(
        profile?.picture ? { type: MediaType.url, url: profile.picture, media: profile.picture } : undefined,
      );
      setImageBanner(profile?.banner ? { type: MediaType.url, url: profile.banner, media: profile.banner } : undefined);
    }
  }, [loadingProfileContext]);

  useEffect(() => {
    if (errorUpdateImagesFromFiles) {
      const nsfwError = errorUpdateImagesFromFiles.graphQLErrors?.find(
        ({ extensions }) => extensions.code === "FILE_CONTENT_NSFW",
      );

      if (nsfwError) {
        showToast(t("error.uploadNsfw"), { variant: "error" });
      } else {
        showToast(t("error.upload"), { variant: "error" });
      }
    }
  }, [errorUpdateImagesFromFiles]);

  useEffect(() => {
    if (errorUpdateAvatarFromNft || errorUpdateBannerFromNft) {
      showToast(t("error.selectNft"), { variant: "error" });
    }
  }, [errorUpdateAvatarFromNft || errorUpdateBannerFromNft]);

  useEffect(() => {
    if (errorDeleteAvatar || errorDeleteBanner) {
      showToast(t("error.deleteImage"));
    }
  }, [errorDeleteAvatar, errorDeleteBanner]);

  return (
    <DialogFrame persistent loading={isLoading} aria-labelledby={`${dialogName}-title`}>
      <LoadingBackdrop open={isLoading || loadingProfileContext} borderRadius={borderRadius.default} />

      <Stack padding={6} paddingBottom={0}>
        <Typography variant="h6" marginBottom={4} id={`${dialogName}-title`}>
          {profileFromState ? t("godMode.edit.editGate") : t("form.title.editProfile")}
        </Typography>

        <FormContainer formContext={formContext} onSuccess={handleSubmit}>
          <Stack spacing={10}>
            {profileFromState && (
              <Stack spacing={1}>
                <Typography variant="h7">{t("godMode.adminInfo.userId")}</Typography>
                <CopyToClipboard
                  activator={
                    <Tooltip title={t("cta.copy")} arrow placement="bottom">
                      <Chip label={profileFromState.userId} sx={{ maxWidth: "554px" }} />
                    </Tooltip>
                  }
                  content={profileFromState.userId}
                />
              </Stack>
            )}
            <>
              {createTextField({
                varName: "alias",
                inputName: "username",
                label: t("form.label.username"),
                helper: t("form.helper.username"),
                placeholder:
                  formContext.getValues("handle") ||
                  formatWalletAddress(profile?.walletAddress, {
                    firstCharacters: 3,
                    lastCharacters: 2,
                  }),
                initialCount: profile?.alias?.length ?? 0,
                maxLength: maxAliasLength,
              })}
            </>
            <>
              {createTextField({
                varName: "handle",
                label: t("form.label.handle"),
                helper: t("form.helper.handle"),
                placeholder: t("form.placeholder.handle"),
                initialCount: profile?.handle?.length ?? 0,
                maxLength: maxHandleLength,
                InputProps: {
                  startAdornment: <InputAdornment position="start">@</InputAdornment>,
                },
                validation: { pattern: /^[0-9a-zA-Z]+$/ },
                parseError: error =>
                  error.type === "pattern" ? t("error.invalidHandle") : t("error.handleAlreadyTaken"),
              })}
            </>

            <>
              {createTextField({
                varName: "description",
                label: t("form.label.aboutYou"),
                placeholder: t("form.placeholder.description"),
                initialCount: profile?.description?.length ?? 0,
                maxLength: maxDescriptionLength,
                rows: 3,
              })}
            </>

            <ImageSelector
              mediaImage={imageAvatar}
              setMediaImage={setImageAvatar}
              imageProps={{
                format: ImageFormat.square,
                context: ImageContext.profile,
                username: getUsername(profile),
                userId: profile?.userId as string,
              }}
              label={t("form.label.avatar")}
            />
            <ImageSelector
              mediaImage={imageBanner}
              setMediaImage={setImageBanner}
              imageProps={{ format: ImageFormat.banner, context: ImageContext.profile }}
              label={t("form.label.banner")}
            />

            <Stack spacing={4}>
              <Typography variant="h7">{t("form.label.links")}</Typography>
              <Stack spacing={2}>
                <>
                  {createTextField({
                    varName: UrlType.website,
                    placeholder: "Site url",
                    maxLength: maxUrlLength,
                    leftIcon: <GlobalIcon width={sizeLogo} height={sizeLogo} color={theme.palette.action.active} />,
                  })}
                </>
                <>
                  {createTextField({
                    varName: UrlType.twitter,
                    placeholder: "twitter.com/janedoe",
                    maxLength: maxUrlLength,
                    leftIcon: <TwitterLogo width={sizeLogo} height={sizeLogo} color={theme.palette.action.active} />,
                  })}
                </>
                <>
                  {createTextField({
                    varName: UrlType.discord,
                    placeholder: "discord.gg/janedoe",
                    maxLength: maxUrlLength,
                    leftIcon: <DiscordLogo width={sizeLogo} height={sizeLogo} color={theme.palette.action.active} />,
                  })}
                </>
                <>
                  {createTextField({
                    varName: UrlType.discordUsername,
                    placeholder: "Discord username#1234",
                    maxLength: maxDiscordUsername,
                    leftIcon: (
                      <DiscordUserLogo width={sizeLogo} height={sizeLogo} color={theme.palette.action.active} />
                    ),
                  })}
                </>
                <>
                  {createTextField({
                    varName: UrlType.instagram,
                    placeholder: "instagram.com/janedoe",
                    maxLength: maxUrlLength,
                    leftIcon: <InstagramLogo width={sizeLogo} height={sizeLogo} color={theme.palette.action.active} />,
                  })}
                </>
                <>
                  {createTextField({
                    varName: UrlType.mirror,
                    placeholder: "Mirror URL",
                    maxLength: maxUrlLength,
                    leftIcon: <MirrorLogo width={sizeLogo} height={sizeLogo} color={theme.palette.action.active} />,
                  })}
                </>
                <>
                  {createTextField({
                    varName: UrlType.medium,
                    placeholder: "Medium URL",
                    maxLength: maxUrlLength,
                    leftIcon: <MediumLogo width={sizeLogo} height={sizeLogo} color={theme.palette.action.active} />,
                  })}
                </>
              </Stack>
            </Stack>

            <Stack spacing={6}>
              {createCategoriesInput({
                varName: "category",
                helper: t("form.helper.profileCategory"),
                label: t("form.label.tags"),
                categoriesList: getCategoryMapFromEnum(UserCategory, "userCategory", excludedCategories, [
                  UserCategory.lightkeeper,
                  UserCategory.explorer,
                  UserCategory.creator,
                  UserCategory.brand,
                ]),
                initialCategoriesSelected: profile?.category ? [profile.category] : [],
                required: true,
                maxSelected: 1,
                disabled: !profileFromState && (isLightkeeper || isBrand),
              })}
              {createTagsInput({
                varName: "tags",
                helper: (
                  <Trans
                    i18nKey="form.helper.profileTags"
                    values={{ maxTags: defaultMaxTags }}
                    components={{
                      strong: <strong />,
                    }}
                  />
                ),
                placeholder: t("form.placeholder.tags"),
                initialTags: profile?.tags,
                maxTags: defaultMaxTags,
              })}
            </Stack>

            <FormConfirmationButtons
              cancelButtonProps={{ onClick: closeDialog }}
              confirmButtonProps={{
                loading: isLoading,
                disabled: Object.keys(errors).length !== 0,
              }}
              deleteButtonProps={
                profileFromState
                  ? {
                      label: t("form.buttons.delete.buttonLabel", { type: "user" }),
                      onDelete: () => deleteProfile(profileFromState.userId),
                    }
                  : undefined
              }
            />
          </Stack>
        </FormContainer>
      </Stack>
    </DialogFrame>
  );
};

export default EditProfileDialog;
