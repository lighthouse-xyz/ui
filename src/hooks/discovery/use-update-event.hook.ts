import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { coreEventFields } from "@src/common/graphql/fragments.graphql";
import { Event } from "@src/common/graphql/generated/discovery.schema.graphql";

import { getEventsQuery } from "./use-get-events.hook";

interface UpdateEventResult {
  updateEvent: Event;
}

const updateEventQuery = gql`
  mutation UpdateEvent($id: EntityId!, $input: UpdateCustomEventInput!) {
    updateEvent: updateCustomEvent(entityId: $id, input: $input) {
      ...CoreEventFields
    }
  }
  ${coreEventFields}
`;

function useUpdateEvent(id?: string): {
  updateEvent: (options?: MutationFunctionOptions<UpdateEventResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: UpdateEventResult;
} {
  const [updateEvent, { loading, error, data, client }] = useMutation<UpdateEventResult>(updateEventQuery, {
    variables: { id },
    update() {
      void client.refetchQueries({
        include: [getEventsQuery],
      });
    },
  });

  return { updateEvent, loading, error, data: data ?? undefined };
}

export default useUpdateEvent;
