import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { useTranslation } from "react-i18next";

import EditableListItem, { itemType } from "./editable-list-item/editable-list-item.component";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack, TextField } from "@mui/material";
import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";
import { useLazyGetEntity } from "@src/hooks/discovery/use-get-entity.hook";
import useProfile, { buildGetProfileArgs } from "@src/hooks/user/use-profile.hook";
import { isEventId, isParcelId, isUserHandle, isUserId } from "@src/utils/entity.util";
import { getUsername } from "@src/utils/get-user-properties.util";

export type EditableEntityType = EntityType.event | EntityType.member | EntityType.parcel;

interface CommonEntityFields {
  entityId: string;
  name?: string;
  handle?: string;
}

interface Props<T extends CommonEntityFields> {
  items: T[];
  setItems: (items: T[]) => void;
  entityTypes: EditableEntityType[];
  max?: number;
}

const EditableList = <T extends CommonEntityFields>({ items, setItems, entityTypes, max }: Props<T>): JSX.Element => {
  const { t } = useTranslation();

  const { getProfile } = useProfile();
  const { getEntity } = useLazyGetEntity();

  const [inputValue, setInputValue] = useState<string>("");
  const [inputError, setInputError] = useState<string | undefined>(undefined);
  const [loadingNewEntity, setLoadingNewEntity] = useState(false);

  const addIsDisabled = inputValue.length === 0 || (!!max && items.length >= max);

  const validateId = (id: string): boolean => {
    let isValid = false;

    if (!isValid && entityTypes.includes(EntityType.member)) {
      isValid = isUserId(id) || isUserHandle(id);
    }
    if (!isValid && entityTypes.includes(EntityType.parcel)) {
      isValid = isParcelId(id);
    }
    if (!isValid && entityTypes.includes(EntityType.event)) {
      isValid = isEventId(id);
    }

    return isValid;
  };

  const getUniqueProfile = async (id: string): Promise<CommonEntityFields | undefined> => {
    try {
      const { data } = await getProfile({ variables: buildGetProfileArgs(id) });
      return data
        ? { entityId: data.profile.userId, name: getUsername(data.profile), handle: data.profile.handle }
        : undefined;
    } catch {
      return undefined;
    }
  };

  const getUniqueEntity = async (id: string): Promise<CommonEntityFields | undefined> => {
    try {
      const { data } = await getEntity({ variables: { id } });
      return data ? { entityId: data.entity.entityId, name: data.entity.name, handle: data.entity.handle } : undefined;
    } catch {
      return undefined;
    }
  };

  const addEntity = async (value: string): Promise<void> => {
    setLoadingNewEntity(true);

    if (!validateId(value)) {
      setInputError(t("godMode.common.invalidInput"));
      setLoadingNewEntity(false);
      return;
    }

    if (items.find(entity => entity.entityId === value || entity.handle === value)) {
      setInputError(t("godMode.common.duplicateError"));
      setLoadingNewEntity(false);
      return;
    }

    let newEntity: T | undefined = undefined;
    if (entityTypes.includes(EntityType.member)) {
      newEntity = (await getUniqueProfile(value)) as T;
    } else {
      newEntity = (await getUniqueEntity(value)) as T;
    }

    if (!newEntity) {
      setInputError(t("godMode.common.noMatchingEntity"));
    } else {
      setItems([...items, newEntity]);
      setInputValue("");
    }

    setLoadingNewEntity(false);
  };

  const findItem = useCallback(
    (id: string) => {
      const index = items.findIndex(c => c.entityId === id);
      return { item: items[index], index };
    },
    [items],
  );

  const moveItem = useCallback(
    (id: string, atIndex: number) => {
      const { item: itemToMove } = findItem(id);

      const updatedItems = items.filter(({ entityId }) => entityId !== itemToMove.entityId);
      updatedItems.splice(atIndex, 0, itemToMove);
      setItems([...updatedItems]);
    },
    [findItem, items, setItems],
  );

  const deleteItem = useCallback(
    (id: string) => {
      const { item: itemToRemove } = findItem(id);
      setItems(items.filter(({ entityId }) => entityId !== itemToRemove.entityId));
    },
    [findItem, items, setItems],
  );

  const [, drop] = useDrop(() => ({ accept: itemType }));
  return (
    <Stack spacing={6}>
      <TextField
        placeholder={t("godMode.common.inputPlaceholder", {
          context: entityTypes.includes(EntityType.member) ? "withHandle" : undefined,
        })}
        value={inputValue}
        onChange={event => {
          setInputValue(event.target.value);
          setInputError(undefined);
        }}
        disabled={loadingNewEntity}
        error={!!inputError}
        helperText={inputError}
      />
      <LoadingButton
        variant="outlined"
        size="large"
        loading={loadingNewEntity}
        disabled={addIsDisabled}
        onClick={() => void addEntity(inputValue.trim())}>
        {t("cta.add")}
      </LoadingButton>
      <Stack spacing={3} ref={drop}>
        {items.map((item, index) => (
          <EditableListItem
            key={`draggable-list-item-${item.entityId}`}
            index={index}
            id={item.entityId}
            text={item.name}
            moveItem={moveItem}
            findItem={findItem}
            deleteItem={deleteItem}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default EditableList;
