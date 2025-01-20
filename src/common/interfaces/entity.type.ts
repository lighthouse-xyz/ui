import {
  Estate,
  Event,
  EventCategory,
  GenericEntity,
  Member,
  Parcel,
  ParcelCategory,
} from "../graphql/generated/discovery.schema.graphql";

type AllEntities = Estate & Event & Member & Parcel;

type RequiredStringFields = keyof Pick<AllEntities, "name" | "image">;
type DateFields = keyof Pick<AllEntities, "nextStartAt" | "nextFinishAt">;
type CommonFields = keyof GenericEntity;

type OptionalFieldsWithoutDates = Omit<AllEntities, CommonFields | DateFields>;

type EntityWithTypename = Pick<AllEntities, CommonFields> &
  Required<{ [Property in RequiredStringFields]: string }> &
  Partial<
    OptionalFieldsWithoutDates & {
      [Property in DateFields]: Date;
    }
  >;

export type EntityWithCategories = Omit<EntityWithTypename, "categories"> & {
  eventCategories?: EventCategory[];
  parcelCategories?: ParcelCategory[];
};

export type Entity = Omit<EntityWithCategories, "__typename"> & {
  __typename?: "Estate" | "Event" | "Member" | "Parcel";
};

export const defaultName = "Untitled";
