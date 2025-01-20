import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";

export const estateRegex = /^lh_es_[a-fA-F\d]+$/;

export const eventRegex = /^lh_ev_[a-fA-F\d]+$/;

export const parcelRegex = /^lh_pa_[a-fA-F\d]+$/;

export const userRegex = /^lh_us_[a-fA-F\d]+$/;

export const entityRegex = /^lh_(es|ev|pa|us)_[a-fA-F\d]+$/;

export const userHandleRegex = /^[A-Za-z\d]{1,15}$/;

export function isEstateId(id: string): boolean {
  return estateRegex.test(id);
}

export function isEventId(id: string): boolean {
  return eventRegex.test(id);
}

export function isParcelId(id: string): boolean {
  return parcelRegex.test(id);
}

export function isUserId(id: string): boolean {
  return userRegex.test(id);
}

export function isEntityId(id: string): boolean {
  return entityRegex.test(id);
}

export function isUserHandle(value: string): boolean {
  return userHandleRegex.test(value);
}

export function isEvent(type: EntityType): boolean {
  return type === EntityType.event;
}

export function isParcel(type: EntityType): boolean {
  return type === EntityType.parcel;
}

export function isEstate(type: EntityType): boolean {
  return type === EntityType.estate;
}

export function isMember(type: EntityType): boolean {
  return type === EntityType.member;
}

export function isPlace(type: EntityType): boolean {
  return isParcel(type) || isEstate(type);
}
