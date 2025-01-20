import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@mui/lab";
import { Button, Stack, Typography } from "@mui/material";
import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";
import { Trending, TrendingType } from "@src/common/interfaces/trending.type";
import Alert from "@src/components/common/alert/alert.component";
import DialogFrame from "@src/components/common/dialog-frame/dialog-frame.component";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import EditableList from "@src/components/god-mode/editable-list/editable-list.component";
import useGetTrending from "@src/hooks/discovery/use-get-trending.hook";
import useSetTrending from "@src/hooks/discovery/use-set-trending.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

interface Props {
  type: TrendingType;
  label: string;
}

const EditTrending: React.FC<Props> = ({ type, label }) => {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    getTrending,
    results: { loading: loadingOriginalTrending, error: errorOriginalTrending },
  } = useGetTrending(type);
  const { setTrending, loading: loadingSetTrending } = useSetTrending(type);

  const [currentTrending, setCurrentTrending] = useState<Trending[]>([]);
  const [newTrending, setNewTrending] = useState<Trending[]>([]);

  useEffect(() => {
    if (dialogOpen) {
      void getTrending({
        onCompleted: data => {
          const originalTrending = data.trending;
          setCurrentTrending(originalTrending ?? []);
          setNewTrending(originalTrending ?? []);
        },
      });
    } else {
      setCurrentTrending([]);
      setNewTrending([]);
    }
  }, [dialogOpen]);

  const saveIsDisabled =
    !!newTrending.length &&
    newTrending.every(
      (newEntity, index) => currentTrending[index] && currentTrending[index].entityId === newEntity.entityId,
    );

  const save = (): void => {
    const input = newTrending.map(entity => entity.entityId);

    void setTrending({
      variables: { input },
      onCompleted: data => {
        const trending = data.setTrending.map(entity => ({ entityId: entity.entityId }));
        setCurrentTrending(trending);
        showToast(t("godMode.trending.success", { type: label }));
      },
      onError: error => {
        showToast(error.graphQLErrors[0].message, { variant: "error" });
      },
    });
  };

  return (
    <>
      <Button variant="contained" size="large" onClick={() => setDialogOpen(true)}>
        {t("godMode.trending.edit", { type: label })}
      </Button>

      {dialogOpen && (
        <DialogFrame persistent onClose={() => setDialogOpen(false)}>
          <Stack spacing={6} padding={6}>
            <Typography variant="h6">{t("godMode.trending.headingWithType", { type: label })}</Typography>

            {loadingOriginalTrending ? (
              <LoadingIndicator size="75px" />
            ) : errorOriginalTrending ? (
              <Alert color="error" title={t("godMode.trending.fetchError", { type: label })} />
            ) : (
              <>
                <EditableList
                  items={newTrending}
                  setItems={setNewTrending}
                  entityTypes={type === "entities" ? [EntityType.event, EntityType.parcel] : [EntityType.member]}
                />
                <LoadingButton
                  variant="contained"
                  size="large"
                  disabled={saveIsDisabled}
                  loading={loadingSetTrending}
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

export default EditTrending;
