import { EntityType, ParcelCategory, World } from "@src/common/graphql/generated/discovery.schema.graphql";
import { QueryEntitiesResults } from "@src/common/interfaces/query-results.interface";

const customPlacesData: Pick<QueryEntitiesResults, "data"> = {
  data: {
    entities: {
      __typename: "PaginatedPlaces",
      list: [
        {
          canViewMarketplace: false,
          description: "dddd",
          entityId: "lh_pa_ac695939cfc7c105faca8beb29641afeb3abf845f54fe9ffe9061b6c59a917e0",
          featuredMedia: "",
          image: "https://cdn.dev.lighthouse.world/static/default-entity-image.svg",
          jumpable: true,
          liked: false,
          name: "Custom place 1",
          owner: "0xC111cf293a47e57f4613C3019D08f3c0199741b8",
          ownerUser: "lh_us_7a8060fe64bf9fd1c50965596e01cd9c48a6e064a11f79233d59cea5136a4232",
          parcelCategories: [ParcelCategory.art],
          pinned: true,
          tags: [],
          type: EntityType.parcel,
          url: "https://play.decentraland.org/?149%2C-44",
          world: World.decentraland,
          __typename: "Parcel",
          storedAt: "2022-09-24T23:00:00.000Z",
        },
        {
          canViewMarketplace: false,
          description: "BAR",
          entityId: "lh_pa_34c126097cb5705d5c0e0f5395f8a0662ae15fd0ff3582923434009efa5da2d2",
          featuredMedia: "",
          image: "https://cdn.dev.lighthouse.world/static/default-entity-image.svg",
          jumpable: true,
          liked: false,
          name: "Custom place 2",
          owner: "0xC111cf293a47e57f4613C3019D08f3c0199741b8",
          ownerUser: "lh_us_7a8060fe64bf9fd1c50965596e01cd9c48a6e064a11f79233d59cea5136a4232",
          parcelCategories: [ParcelCategory.art],
          pinned: false,
          type: EntityType.parcel,
          url: "https://www.voxels.com/play?coords=NW@282E,27U,207N",
          world: World.mona,
          tags: [],
          __typename: "Parcel",
          storedAt: "2022-09-24T23:00:00.000Z",
        },
      ],
      totalCount: 2,
      pageInfo: {
        hasNextPage: false,
      },
    },
  },
};

const emptyCustomPlacesData = {
  data: {
    entities: {
      __typename: "PaginatedPlaces",
      list: [],
      totalCount: 0,
      pageInfo: {
        hasNextPage: false,
      },
    },
  },
};

export { customPlacesData, emptyCustomPlacesData };
