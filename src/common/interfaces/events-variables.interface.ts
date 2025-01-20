import {
  EventRecommendationsFilteringArgs,
  EventsFilteringArgs,
  EventSortingMethod,
} from "../graphql/generated/discovery.schema.graphql";

interface EventsCommonVariables {
  first: number;
  offset: number;
  sort?: EventSortingMethod;
}

export interface EventsVariables extends EventsCommonVariables {
  where?: EventsFilteringArgs;
}

export interface EventRecommendationsVariables extends EventsCommonVariables {
  where?: Omit<EventRecommendationsFilteringArgs, "categories">;
}

export interface GroupedEventVariables<Variables> {
  live: (now: string) => Variables;
  scheduled: (now: string) => Variables;
  past: (now: string) => Variables;
}
