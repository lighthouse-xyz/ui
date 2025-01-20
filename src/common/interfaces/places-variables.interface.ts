import {
  PlaceRecommendationsFilteringArgs,
  PlacesFilteringArgs,
  PlaceSortingMethod,
} from "../graphql/generated/discovery.schema.graphql";

interface PlacesCommonVariables {
  first: number;
  offset: number;
  sort: PlaceSortingMethod;
}

export interface PlacesVariables extends PlacesCommonVariables {
  where?: PlacesFilteringArgs;
}

export interface PlaceRecommendationsVariables extends PlacesCommonVariables {
  where?: Omit<PlaceRecommendationsFilteringArgs, "categories">;
}
