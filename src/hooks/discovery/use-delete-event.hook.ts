import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { coreEventFields } from "@src/common/graphql/fragments.graphql";
import { Event, PaginatedEvents } from "@src/common/graphql/generated/discovery.schema.graphql";

interface DeleteEventResult {
  deleteEvent: Event;
}

const deleteEventQuery = gql`
  mutation DeleteEvent($id: EntityId!) {
    deleteEvent: deleteCustomEvent(entityId: $id) {
      ...CoreEventFields
    }
  }
  ${coreEventFields}
`;

function useDeleteEvent(): {
  deleteEvent: (options?: MutationFunctionOptions<DeleteEventResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: DeleteEventResult;
} {
  const [deleteEvent, { loading, error, data }] = useMutation<DeleteEventResult>(deleteEventQuery, {
    fetchPolicy: "no-cache",
    update(cache, variables) {
      cache.modify({
        fields: {
          events(existingEvents: PaginatedEvents, { readField }) {
            const newEventNodes = existingEvents.nodes?.filter(
              entity => readField("entityId", entity) !== variables.data?.deleteEvent.entityId,
            );

            return {
              ...existingEvents,
              nodes: newEventNodes,
              totalCount:
                existingEvents.nodes?.length === newEventNodes?.length
                  ? existingEvents.totalCount
                  : existingEvents.totalCount - 1,
              __typename: existingEvents.__typename,
            };
          },
        },
      });
    },
  });

  return { deleteEvent, loading, error, data: data ?? undefined };
}

export default useDeleteEvent;
