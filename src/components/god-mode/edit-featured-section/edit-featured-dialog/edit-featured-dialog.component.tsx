import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@mui/lab";
import { Button, Stack, Typography } from "@mui/material";
import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";
import { FeaturedEntityType } from "@src/common/interfaces/featured-entity-type.type";
import Alert from "@src/components/common/alert/alert.component";
import DialogFrame from "@src/components/common/dialog-frame/dialog-frame.component";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import EditableList from "@src/components/god-mode/editable-list/editable-list.component";
import { useLazyGetFeatured } from "@src/hooks/discovery/use-get-featured.hook";
import useSetFeatured from "@src/hooks/discovery/use-set-featured.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

const nbOfFeatured = 3;

export interface Featured {
  entityId: string;
  name?: string;
  handle?: string;
}

interface Props {
  type: FeaturedEntityType;
  label: string;
  vrMode?: boolean;
}

const EditFeatured: React.FC<Props> = ({ type, label, vrMode = false }) => {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    getFeatured,
    results: { loading: loadingOriginalFeatured, error: errorOriginalFeatured },
  } = useLazyGetFeatured(type, vrMode);
  const { setFeatured, loading: loadingSetFeatured } = useSetFeatured(type, vrMode);

  const [currentFeatured, setCurrentFeatured] = useState<Featured[]>([]);
  const [newFeatured, setNewFeatured] = useState<Featured[]>([]);

  useEffect(() => {
    if (dialogOpen) {
      void getFeatured({
        onCompleted: data => {
          const originalFeatured = data.entities.list?.map(entity => ({
            entityId: entity.entityId,
            name: entity.name,
            handle: entity.handle,
          }));
          setCurrentFeatured(originalFeatured ?? []);
          setNewFeatured(originalFeatured ?? []);
        },
      });
    } else {
      setCurrentFeatured([]);
      setNewFeatured([]);
    }
  }, [dialogOpen]);

  const saveIsDisabled =
    newFeatured.length !== nbOfFeatured ||
    newFeatured.every(
      (newEntity, index) => currentFeatured[index] && currentFeatured[index].entityId === newEntity.entityId,
    );

  const save = (): void => {
    const input = newFeatured.map(entity => entity.entityId);

    void setFeatured({
      variables: { input },
      onCompleted: data => {
        const featured = data.setFeatured.map(entity => ({ entityId: entity.entityId }));
        setCurrentFeatured(featured);
        showToast(t("godMode.featured.success", { type: label }));
      },
      onError: error => {
        showToast(error.graphQLErrors[0].message, { variant: "error" });
      },
    });
  };

  return (
    <>
      <Button variant="contained" size="large" onClick={() => setDialogOpen(true)}>
        {t("godMode.featured.edit", { type: label })}
      </Button>

      {dialogOpen && (
        <DialogFrame persistent onClose={() => setDialogOpen(false)}>
          <Stack spacing={6} padding={6}>
            <Stack spacing={1}>
              <Typography variant="h6">{t("godMode.featured.headingWithType", { type: label })}</Typography>
              <Typography variant="caption">{t("godMode.featured.subheading")}</Typography>
            </Stack>

            {loadingOriginalFeatured ? (
              <LoadingIndicator size="75px" />
            ) : errorOriginalFeatured ? (
              <Alert color="error" title={t("godMode.featured.fetchError", { type: label })} />
            ) : (
              <>
                <EditableList
                  items={newFeatured}
                  setItems={setNewFeatured}
                  entityTypes={type === "all" ? [EntityType.event, EntityType.parcel] : [type]}
                  max={nbOfFeatured}
                />
                <LoadingButton
                  variant="contained"
                  size="large"
                  disabled={saveIsDisabled}
                  loading={loadingSetFeatured}
                  onClick={save}>
                  {t("cta.save")}
                </LoadingButton>
              </>
            )}
          </Stack>
        </DialogFrame>
      )}
    </>
  );
};

export default EditFeatured;
