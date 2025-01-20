import { When } from "../common/enums/when.enum";
import {
  EventRecommendationsFilteringArgs,
  EventSortingMethod,
} from "../common/graphql/generated/discovery.schema.graphql";
import {
  EventRecommendationsVariables,
  EventsVariables,
  GroupedEventVariables,
} from "../common/interfaces/events-variables.interface";
import { InterestedEventsVariables } from "../hooks/user/use-get-interested-events.hook";

type TVariables = EventsVariables | InterestedEventsVariables | EventRecommendationsVariables;

export function getGroupedEventsVariables<T extends TVariables | undefined>(
  commonVariables: T,
): GroupedEventVariables<T> {
  return {
    live: (now: string) => ({
      ...commonVariables,
      sort: EventSortingMethod.nextStartAtAsc,
      where: { ...commonVariables?.where, nextStartAt: { lessThanOrEqual: now }, nextFinishAt: { greaterThan: now } },
    }),
    scheduled: (now: string) => ({
      ...commonVariables,
      sort: EventSortingMethod.nextStartAtAsc,
      where: { ...commonVariables?.where, nextStartAt: { greaterThan: now } },
    }),
    past: (now: string) => ({
      ...commonVariables,
      sort: EventSortingMethod.nextFinishAtDesc,
      where: { ...commonVariables?.where, nextFinishAt: { lessThanOrEqual: now } },
    }),
  };
}

export function convertWhenToFilteringArgs(now: string, when?: When): EventRecommendationsFilteringArgs | undefined {
  const groupedEventsVariables = getGroupedEventsVariables<EventRecommendationsVariables | undefined>(undefined);

  switch (when) {
    case When.past:
      return groupedEventsVariables.past(now)?.where;
    case When.live:
      return groupedEventsVariables.live(now)?.where;
    case When.scheduled:
      return groupedEventsVariables.scheduled(now)?.where;
    default:
      return undefined;
  }
}
