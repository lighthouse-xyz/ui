import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { coreEventFields } from "@src/common/graphql/fragments.graphql";
import { Event } from "@src/common/graphql/generated/discovery.schema.graphql";

import { getEventsQuery } from "./use-get-events.hook";

interface CreateEventResult {
  createEvent: Event;
}

const createEventQuery = gql`
  mutation CreateEvent($input: CreateCustomEventInput!) {
    createEvent: createCustomEvent(input: $input) {
      ...CoreEventFields
    }
  }
  ${coreEventFields}
`;

function useCreateEvent(): {
  createEvent: (options?: MutationFunctionOptions<CreateEventResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: CreateEventResult;
} {
  const [createEvent, { loading, error, data, client }] = useMutation<CreateEventResult>(createEventQuery, {
    update() {
      void client.refetchQueries({
        include: [getEventsQuery],
      });
    },
  });

  return { createEvent, loading, error, data: data ?? undefined };
}

export default useCreateEvent;
