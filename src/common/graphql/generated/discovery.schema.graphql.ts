export type Maybe<T> = T;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BlockchainAddress: string;
  DateTime: string;
  EntityId: string;
  EntityOrUserId: string;
  EstateId: string;
  EventId: string;
  JSONObject: Record<string, unknown>;
  ParcelId: string;
  URL: string;
  Upload: File;
  UserId: string;
};

export type CreateCustomEventInput = {
  /** List of categories that describe the entity. Max number of categories: 10. */
  categories?: Array<EventCategory>;
  description: Scalars["String"];
  name: Scalars["String"];
  /** The end of the event. */
  nextFinishAt: Scalars["DateTime"];
  /** The start of the event. */
  nextStartAt: Scalars["DateTime"];
  ownerUser: Scalars["UserId"];
  placeId: Scalars["EntityId"];
  /** List of tags that describe the entity. Max number of tags: 10. Max tag length: 20 characters. */
  tags?: Array<Scalars["String"]>;
};

export type CreateCustomPlaceInput = {
  /** List of categories that describe the entity. Max number of categories: 10. */
  categories?: Array<ParcelCategory>;
  description: Scalars["String"];
  marketplace?: InputMaybe<Scalars["URL"]>;
  name: Scalars["String"];
  ownerUser: Scalars["UserId"];
  /** List of tags that describe the entity. Max number of tags: 10. Max tag length: 20 characters. */
  tags?: Array<Scalars["String"]>;
  url: Scalars["URL"];
};

export enum Currency {
  eth = "eth",
  mana = "mana",
  sand = "sand",
}

export type DateTimeFilter = {
  greaterThan?: InputMaybe<Scalars["DateTime"]>;
  greaterThanOrEqual?: InputMaybe<Scalars["DateTime"]>;
  lessThan?: InputMaybe<Scalars["DateTime"]>;
  lessThanOrEqual?: InputMaybe<Scalars["DateTime"]>;
};

export type EntityRelationship = {
  __typename?: "EntityRelationship";
  entityId: Scalars["EntityOrUserId"];
};

export enum EntityType {
  estate = "estate",
  event = "event",
  member = "member",
  parcel = "parcel",
}

export type Estate = {
  __typename?: "Estate";
  /** `true` if the entity can be viewed in a marketplace; `false` otherwise. */
  canViewMarketplace: Scalars["Boolean"];
  /** The date and time that the entity was created. */
  createdAt?: Maybe<Scalars["DateTime"]>;
  currency?: Maybe<Currency>;
  /** Description of the entity. Max length: 5000 characters. */
  description?: Maybe<Scalars["String"]>;
  /** Unique identifier generated by Lighthouse. */
  entityId: Scalars["EntityOrUserId"];
  /** Used if the entity is featured on Lighthouse's [homepage](https://lighthouse.world/home). Gifs and slideshows that display dynamic content are recommended. Optimized for files under 5 MB. */
  featuredMedia?: Maybe<Scalars["URL"]>;
  fetchedAt: Scalars["DateTime"];
  /** Displayed when viewing the entity. Optimized for files under 5 MB. */
  image?: Maybe<Scalars["URL"]>;
  /** `true` if the entity is jumpable; `false` otherwise. */
  jumpable: Scalars["Boolean"];
  liked?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  /** Wallet address of the entity owner. */
  owner?: Maybe<Scalars["BlockchainAddress"]>;
  /** Lighthouse user id of the entity owner. Either `owner` or `ownerUser` must be specified. */
  ownerUser?: Maybe<Scalars["UserId"]>;
  pinned?: Maybe<Scalars["Boolean"]>;
  price?: Maybe<Scalars["Float"]>;
  priceStatus?: Maybe<PriceStatus>;
  storedAt: Scalars["DateTime"];
  tags: Array<Scalars["String"]>;
  tokenUri?: Maybe<Scalars["URL"]>;
  /** Type of the entity. */
  type: EntityType;
  /** The date and time that the entity was updated. */
  updatedAt?: Maybe<Scalars["DateTime"]>;
  /** The world in which this entity can be found. */
  world: World;
  xCoordinate?: Maybe<Scalars["Float"]>;
  yCoordinate?: Maybe<Scalars["Float"]>;
};

/** An experience in the metaverse that is delimited in time. */
export type Event = {
  __typename?: "Event";
  /** List of categories that describe the entity. Max number of categories: 10. */
  categories: Array<EventCategory>;
  /** The date and time that the entity was created. */
  createdAt?: Maybe<Scalars["DateTime"]>;
  /** @deprecated Usage no longer enforced, access to events are based on owner only. */
  createdThroughLighthouse: Scalars["Boolean"];
  /** Description of the entity. Max length: 5000 characters. */
  description?: Maybe<Scalars["String"]>;
  /** Duration of the event in seconds, calculated from the `nextStartAt` and `nextFinishAt` fields. */
  durationInSeconds: Scalars["Float"];
  /** Unique identifier generated by Lighthouse. */
  entityId: Scalars["EntityOrUserId"];
  estateId?: Maybe<Scalars["EstateId"]>;
  /** Used if the entity is featured on Lighthouse's [homepage](https://lighthouse.world/home). Gifs and slideshows that display dynamic content are recommended. Optimized for files under 5 MB. */
  featuredMedia?: Maybe<Scalars["URL"]>;
  fetchedAt: Scalars["DateTime"];
  /** Displayed when viewing the entity. Optimized for files under 5 MB. */
  image?: Maybe<Scalars["URL"]>;
  initialStartAt?: Maybe<Scalars["DateTime"]>;
  interested?: Maybe<Scalars["Boolean"]>;
  isAllDay: Scalars["Boolean"];
  isRecurring: Scalars["Boolean"];
  /** `true` if the entity is jumpable; `false` otherwise. */
  jumpable: Scalars["Boolean"];
  latestFinishAt?: Maybe<Scalars["DateTime"]>;
  liked?: Maybe<Scalars["Boolean"]>;
  live: Scalars["Boolean"];
  /** Name of the entity. Max length: 100 characters. */
  name?: Maybe<Scalars["String"]>;
  /** The end of the event. */
  nextFinishAt: Scalars["DateTime"];
  /** The start of the event. */
  nextStartAt: Scalars["DateTime"];
  /** Wallet address of the entity owner. */
  owner?: Maybe<Scalars["BlockchainAddress"]>;
  /** Lighthouse user id of the entity owner. Either `owner` or `ownerUser` must be specified. */
  ownerUser?: Maybe<Scalars["UserId"]>;
  /** Lighthouse parcel id specifying the location of the event. */
  parcelId?: Maybe<Scalars["ParcelId"]>;
  past: Scalars["Boolean"];
  pinned?: Maybe<Scalars["Boolean"]>;
  storedAt: Scalars["DateTime"];
  /** List of tags that describe the entity. Max number of tags: 10. Max tag length: 20 characters. */
  tags: Array<Scalars["String"]>;
  totalAttendees?: Maybe<Scalars["Float"]>;
  /** Type of the entity. */
  type: EntityType;
  /** The date and time that the entity was updated. */
  updatedAt?: Maybe<Scalars["DateTime"]>;
  /** The location of the entity. */
  url?: Maybe<Scalars["URL"]>;
  /** The world in which this entity can be found. */
  world: World;
  xCoordinate?: Maybe<Scalars["Float"]>;
  yCoordinate?: Maybe<Scalars["Float"]>;
};

export enum EventCategory {
  artExhibition = "artExhibition",
  brandLaunch = "brandLaunch",
  competition = "competition",
  conference = "conference",
  fundraising = "fundraising",
  giveaway = "giveaway",
  hangout = "hangout",
  livePerformance = "livePerformance",
  music = "music",
  mvfw = "mvfw",
  networking = "networking",
  party = "party",
  playToEarn = "playToEarn",
  socialActivity = "socialActivity",
  sport = "sport",
  talkPresentation = "talkPresentation",
  workshopLecture = "workshopLecture",
}

export type EventRecommendationsFilteringArgs = {
  categories?: InputMaybe<Array<EventCategory>>;
  nextFinishAt?: InputMaybe<DateTimeFilter>;
  nextStartAt?: InputMaybe<DateTimeFilter>;
  parcelId?: InputMaybe<Scalars["EntityId"]>;
  relationshipToOwner?: InputMaybe<Array<RelationshipToOwner>>;
  worlds?: InputMaybe<Array<World>>;
};

export enum EventSortingMethod {
  createdAt = "createdAt",
  mostPopular = "mostPopular",
  nextFinishAtAsc = "nextFinishAtAsc",
  nextFinishAtDesc = "nextFinishAtDesc",
  nextStartAtAsc = "nextStartAtAsc",
  nextStartAtDesc = "nextStartAtDesc",
}

export type EventsFilteringArgs = {
  nextFinishAt?: InputMaybe<DateTimeFilter>;
  nextStartAt?: InputMaybe<DateTimeFilter>;
  ownerUser?: InputMaybe<Scalars["UserId"]>;
  parcelId?: InputMaybe<Scalars["EntityId"]>;
  worlds?: InputMaybe<Array<World>>;
};

export type FeaturedEntity = Estate | Event | Parcel;

export enum FollowingStatus {
  follower = "follower",
  following = "following",
  friend = "friend",
  none = "none",
  self = "self",
}

export type GenericEntity = Estate | Event | Member | Parcel;

export type JumpLocation = {
  __typename?: "JumpLocation";
  url: Scalars["URL"];
};

export enum JumpNowLocation {
  anywhere = "anywhere",
  featuredSpots = "featuredSpots",
  friends = "friends",
}

export type MarketplaceLocation = {
  __typename?: "MarketplaceLocation";
  url: Scalars["URL"];
};

export type MediaArea = {
  height: Scalars["Int"];
  left: Scalars["Int"];
  top: Scalars["Int"];
  width: Scalars["Int"];
};

export type Member = {
  __typename?: "Member";
  address?: Maybe<Scalars["BlockchainAddress"]>;
  attendingMvfw: Scalars["Boolean"];
  category: UserCategory;
  /** The date and time that the entity was created. */
  createdAt?: Maybe<Scalars["DateTime"]>;
  /** Description of the entity. Max length: 5000 characters. */
  description?: Maybe<Scalars["String"]>;
  entityId: Scalars["EntityOrUserId"];
  followerCount: Scalars["Int"];
  followingCount: Scalars["Int"];
  followingStatus?: Maybe<FollowingStatus>;
  friendCount: Scalars["Int"];
  handle?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["URL"]>;
  name?: Maybe<Scalars["String"]>;
  storedAt: Scalars["DateTime"];
  type: EntityType;
  /** The date and time that the entity was updated. */
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type MembersFilteringArgs = {
  attendingMvfw?: InputMaybe<Scalars["Boolean"]>;
  categories?: InputMaybe<Array<UserCategory>>;
};

export type Mutation = {
  __typename?: "Mutation";
  createCustomEvent: Event;
  createCustomPlace: Parcel;
  deleteCustomEvent: Event;
  deleteCustomEventFeaturedMedia: Event;
  deleteCustomEventImage: Event;
  deleteCustomPlace: Parcel;
  deleteCustomPlaceFeaturedMedia: Parcel;
  deleteCustomPlaceImage: Parcel;
  setFeaturedCreators: Array<UserEntityRelationship>;
  setFeaturedEntities: Array<EntityRelationship>;
  setFeaturedEvents: Array<EntityRelationship>;
  setFeaturedPlaces: Array<EntityRelationship>;
  setTrendingEntities: Array<EntityRelationship>;
  setTrendingUsers: Array<TrendingUserRelationship>;
  touchEntity: TouchEntityData;
  updateCustomEvent: Event;
  updateCustomEventImageFromNft: Event;
  updateCustomEventMediaFromFile: Event;
  updateCustomPlace: Parcel;
  updateCustomPlaceImageFromNft: Parcel;
  updateCustomPlaceMediaFromFile: Parcel;
};

export type MutationCreateCustomEventArgs = {
  input: CreateCustomEventInput;
};

export type MutationCreateCustomPlaceArgs = {
  input: CreateCustomPlaceInput;
};

export type MutationDeleteCustomEventArgs = {
  entityId: Scalars["EntityId"];
};

export type MutationDeleteCustomEventFeaturedMediaArgs = {
  entityId: Scalars["EntityId"];
};

export type MutationDeleteCustomEventImageArgs = {
  entityId: Scalars["EntityId"];
};

export type MutationDeleteCustomPlaceArgs = {
  entityId: Scalars["EntityId"];
};

export type MutationDeleteCustomPlaceFeaturedMediaArgs = {
  entityId: Scalars["EntityId"];
};

export type MutationDeleteCustomPlaceImageArgs = {
  entityId: Scalars["EntityId"];
};

export type MutationSetFeaturedCreatorsArgs = {
  input: Array<Scalars["UserId"]>;
};

export type MutationSetFeaturedEntitiesArgs = {
  input: Array<Scalars["EntityId"]>;
  vrMode?: InputMaybe<Scalars["Boolean"]>;
};

export type MutationSetFeaturedEventsArgs = {
  input: Array<Scalars["EventId"]>;
  vrMode: Scalars["Boolean"];
};

export type MutationSetFeaturedPlacesArgs = {
  input: Array<Scalars["ParcelId"]>;
  vrMode: Scalars["Boolean"];
};

export type MutationSetTrendingEntitiesArgs = {
  input: Array<Scalars["EntityId"]>;
};

export type MutationSetTrendingUsersArgs = {
  input: Array<Scalars["UserId"]>;
};

export type MutationTouchEntityArgs = {
  entityId: Scalars["EntityId"];
  input: Scalars["JSONObject"];
};

export type MutationUpdateCustomEventArgs = {
  entityId: Scalars["EntityId"];
  input: UpdateCustomEventInput;
};

export type MutationUpdateCustomEventImageFromNftArgs = {
  entityId: Scalars["EntityId"];
  input: NftPictureInput;
};

export type MutationUpdateCustomEventMediaFromFileArgs = {
  entityId: Scalars["EntityId"];
  input: UpdateCustomEventMediaFromFileInput;
};

export type MutationUpdateCustomPlaceArgs = {
  entityId: Scalars["EntityId"];
  input: UpdateCustomPlaceInput;
};

export type MutationUpdateCustomPlaceImageFromNftArgs = {
  entityId: Scalars["EntityId"];
  input: NftPictureInput;
};

export type MutationUpdateCustomPlaceMediaFromFileArgs = {
  entityId: Scalars["EntityId"];
  input: UpdateCustomPlaceMediaFromFileInput;
};

export type NftPictureInput = {
  contractAddress: Scalars["BlockchainAddress"];
  cropArea?: InputMaybe<MediaArea>;
  tokenId: Scalars["String"];
};

export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
};

export type PaginatedEntities = {
  __typename?: "PaginatedEntities";
  nodes?: Maybe<Array<GenericEntity>>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"];
};

export type PaginatedEvents = {
  __typename?: "PaginatedEvents";
  nodes?: Maybe<Array<Event>>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"];
};

export type PaginatedFeatured = {
  __typename?: "PaginatedFeatured";
  nodes?: Maybe<Array<FeaturedEntity>>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"];
};

export type PaginatedMembers = {
  __typename?: "PaginatedMembers";
  nodes?: Maybe<Array<Member>>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"];
};

export type PaginatedParcels = {
  __typename?: "PaginatedParcels";
  nodes?: Maybe<Array<Parcel>>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"];
};

export type PaginatedPlaces = {
  __typename?: "PaginatedPlaces";
  nodes?: Maybe<Array<Place>>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"];
};

/** A digital space in the metaverse. */
export type Parcel = {
  __typename?: "Parcel";
  /** `true` if the entity can be viewed in a marketplace; `false` otherwise. */
  canViewMarketplace: Scalars["Boolean"];
  /** List of categories that describe the entity. Max number of categories: 10. */
  categories: Array<ParcelCategory>;
  /** The date and time that the entity was created. */
  createdAt?: Maybe<Scalars["DateTime"]>;
  /** @deprecated Usage no longer enforced, access to parcels are based on owner only. */
  createdThroughLighthouse: Scalars["Boolean"];
  currency?: Maybe<Currency>;
  /** Description of the entity. Max length: 5000 characters. */
  description?: Maybe<Scalars["String"]>;
  /** Unique identifier generated by Lighthouse. */
  entityId: Scalars["EntityOrUserId"];
  estateId?: Maybe<Scalars["EstateId"]>;
  /** Used if the entity is featured on Lighthouse's [homepage](https://lighthouse.world/home). Gifs and slideshows that display dynamic content are recommended. Optimized for files under 5 MB. */
  featuredMedia?: Maybe<Scalars["URL"]>;
  fetchedAt: Scalars["DateTime"];
  /** Displayed when viewing the entity. Optimized for files under 5 MB. */
  image?: Maybe<Scalars["URL"]>;
  /** `true` if the entity is jumpable; `false` otherwise. */
  jumpable: Scalars["Boolean"];
  liked?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  /** Wallet address of the entity owner. */
  owner?: Maybe<Scalars["BlockchainAddress"]>;
  /** Lighthouse user id of the entity owner. Either `owner` or `ownerUser` must be specified. */
  ownerUser?: Maybe<Scalars["UserId"]>;
  pinned?: Maybe<Scalars["Boolean"]>;
  price?: Maybe<Scalars["Float"]>;
  priceStatus?: Maybe<PriceStatus>;
  storedAt: Scalars["DateTime"];
  /** List of tags that describe the entity. Max number of tags: 10. Max tag length: 20 characters. */
  tags: Array<Scalars["String"]>;
  tokenUri?: Maybe<Scalars["URL"]>;
  /** Type of the entity. */
  type: EntityType;
  /** The date and time that the entity was updated. */
  updatedAt?: Maybe<Scalars["DateTime"]>;
  /** The location of the entity. */
  url?: Maybe<Scalars["String"]>;
  /** The world in which this entity can be found. */
  world: World;
  xCoordinate?: Maybe<Scalars["Float"]>;
  yCoordinate?: Maybe<Scalars["Float"]>;
};

export enum ParcelCategory {
  art = "art",
  education = "education",
  gaming = "gaming",
  mvfw = "mvfw",
  services = "services",
  shopping = "shopping",
  social = "social",
  work = "work",
}

export type Place = Estate | Parcel;

export type PlaceRecommendationsFilteringArgs = {
  categories?: InputMaybe<Array<ParcelCategory>>;
  relationshipToOwner?: InputMaybe<Array<RelationshipToOwner>>;
  worlds?: InputMaybe<Array<World>>;
};

export enum PlaceSortingMethod {
  createdAt = "createdAt",
  mostPopular = "mostPopular",
  nameAsc = "nameAsc",
  nameDesc = "nameDesc",
}

export type PlacesFilteringArgs = {
  ownerUser?: InputMaybe<Scalars["UserId"]>;
  worlds?: InputMaybe<Array<World>>;
};

export enum PriceStatus {
  cancelled = "cancelled",
  open = "open",
  sold = "sold",
}

export type Query = {
  __typename?: "Query";
  entity: GenericEntity;
  eventRecommendations: PaginatedEvents;
  events: PaginatedEvents;
  featured: PaginatedFeatured;
  featuredCreators: PaginatedMembers;
  featuredEvents: PaginatedEvents;
  featuredPlaces: PaginatedParcels;
  jump: JumpLocation;
  jumpNow: JumpLocation;
  jumpToUser: JumpLocation;
  marketplace: MarketplaceLocation;
  members: PaginatedMembers;
  placeRecommendations: PaginatedPlaces;
  places: PaginatedPlaces;
  search: PaginatedEntities;
  trendingEntities: Array<GenericEntity>;
  trendingUsers: Array<TrendingUser>;
};

export type QueryEntityArgs = {
  entityId: Scalars["EntityId"];
};

export type QueryEventRecommendationsArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sortBy?: InputMaybe<EventSortingMethod>;
  where?: InputMaybe<EventRecommendationsFilteringArgs>;
};

export type QueryEventsArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sortBy?: InputMaybe<EventSortingMethod>;
  where?: InputMaybe<EventsFilteringArgs>;
};

export type QueryFeaturedArgs = {
  vrMode?: InputMaybe<Scalars["Boolean"]>;
};

export type QueryFeaturedEventsArgs = {
  vrMode?: Scalars["Boolean"];
};

export type QueryFeaturedPlacesArgs = {
  vrMode?: Scalars["Boolean"];
};

export type QueryJumpArgs = {
  entityId: Scalars["EntityId"];
};

export type QueryJumpNowArgs = {
  location: JumpNowLocation;
  vrMode?: InputMaybe<Scalars["Boolean"]>;
  worlds?: InputMaybe<Array<World>>;
};

export type QueryJumpToUserArgs = {
  userId: Scalars["UserId"];
};

export type QueryMarketplaceArgs = {
  entityId: Scalars["EntityId"];
};

export type QueryMembersArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<MembersFilteringArgs>;
};

export type QueryPlaceRecommendationsArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sortBy?: InputMaybe<PlaceSortingMethod>;
  where?: InputMaybe<PlaceRecommendationsFilteringArgs>;
};

export type QueryPlacesArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sortBy?: InputMaybe<PlaceSortingMethod>;
  where?: InputMaybe<PlacesFilteringArgs>;
};

export type QuerySearchArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  query: Scalars["String"];
  where?: InputMaybe<SearchFilteringArgs>;
};

export enum RelationshipToOwner {
  following = "following",
  friend = "friend",
}

export type SearchFilteringArgs = {
  relationshipToOwner?: InputMaybe<Array<RelationshipToOwner>>;
  types?: InputMaybe<Array<EntityType>>;
  worlds?: InputMaybe<Array<World>>;
};

export type TouchEntityData = {
  __typename?: "TouchEntityData";
  entityId: Scalars["EntityId"];
  metadata: Scalars["JSONObject"];
};

export type TrendingUser = {
  __typename?: "TrendingUser";
  entityId: Scalars["EntityOrUserId"];
  handle?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type TrendingUserRelationship = {
  __typename?: "TrendingUserRelationship";
  entityId: Scalars["EntityOrUserId"];
};

export type UpdateCustomEventInput = {
  /** List of categories that describe the entity. Max number of categories: 10. */
  categories?: InputMaybe<Array<EventCategory>>;
  /** Description of the entity. Max length: 5000 characters. */
  description?: InputMaybe<Scalars["String"]>;
  /** Name of the entity. Max length: 100 characters. */
  name?: InputMaybe<Scalars["String"]>;
  /** The end of the event. */
  nextFinishAt?: InputMaybe<Scalars["DateTime"]>;
  /** The start of the event. */
  nextStartAt?: InputMaybe<Scalars["DateTime"]>;
  /** Lighthouse user id of the entity owner. Either `owner` or `ownerUser` must be specified. */
  ownerUser?: InputMaybe<Scalars["UserId"]>;
  placeId?: InputMaybe<Scalars["EntityId"]>;
  /** List of tags that describe the entity. Max number of tags: 10. Max tag length: 20 characters. */
  tags?: InputMaybe<Array<Scalars["String"]>>;
};

export type UpdateCustomEventMediaFromFileInput = {
  featuredMedia?: InputMaybe<UpdateMediaFromFileInput>;
  image?: InputMaybe<UpdateMediaFromFileInput>;
};

export type UpdateCustomPlaceInput = {
  /** List of categories that describe the entity. Max number of categories: 10. */
  categories?: InputMaybe<Array<ParcelCategory>>;
  /** Description of the entity. Max length: 5000 characters. */
  description?: InputMaybe<Scalars["String"]>;
  marketplace?: InputMaybe<Scalars["URL"]>;
  /** Name of the entity. Max length: 100 characters. */
  name?: InputMaybe<Scalars["String"]>;
  /** Lighthouse user id of the entity owner. Either `owner` or `ownerUser` must be specified. */
  ownerUser?: InputMaybe<Scalars["UserId"]>;
  /** List of tags that describe the entity. Max number of tags: 10. Max tag length: 20 characters. */
  tags?: InputMaybe<Array<Scalars["String"]>>;
  /** The location of the entity. */
  url?: InputMaybe<Scalars["String"]>;
};

export type UpdateCustomPlaceMediaFromFileInput = {
  featuredMedia?: InputMaybe<UpdateMediaFromFileInput>;
  image?: InputMaybe<UpdateMediaFromFileInput>;
};

export type UpdateMediaFromFileInput = {
  cropArea?: InputMaybe<MediaArea>;
  file: Scalars["Upload"];
};

export enum UserCategory {
  brand = "brand",
  creator = "creator",
  explorer = "explorer",
  lightkeeper = "lightkeeper",
}

export type UserEntityRelationship = {
  __typename?: "UserEntityRelationship";
  entityId: Scalars["EntityOrUserId"];
  userId: Scalars["UserId"];
};

export enum World {
  arium = "arium",
  artifexUnreal = "artifexUnreal",
  astra = "astra",
  createra = "createra",
  decentraland = "decentraland",
  ethereal = "ethereal",
  hiberWorld = "hiberWorld",
  hyperfy = "hyperfy",
  janusXr = "janusXr",
  lvcidia = "lvcidia",
  mona = "mona",
  mozillaHubs = "mozillaHubs",
  muse = "muse",
  onCyber = "onCyber",
  portals = "portals",
  protoworld = "protoworld",
  rareRooms = "rareRooms",
  ronday = "ronday",
  rove = "rove",
  simulacra = "simulacra",
  somniumSpace = "somniumSpace",
  sougen = "sougen",
  soutsideCity = "soutsideCity",
  spatial = "spatial",
  substrata = "substrata",
  swivelMeta = "swivelMeta",
  theNemesis = "theNemesis",
  theSandbox = "theSandbox",
  tz1and = "tz1and",
  vesta = "vesta",
  viverse = "viverse",
  voxels = "voxels",
  vrChat = "vrChat",
  w3rlds = "w3rlds",
  webaverse = "webaverse",
}
