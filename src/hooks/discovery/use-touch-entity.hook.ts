import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { TouchMetadata, TouchOrigin } from "@src/common/enums/track-events.enum";
import { useLocation } from "react-router-dom";

interface TouchEntityResult {
  touchEntity: {
    entityId: string;
    metadata: TouchMetadata;
  };
}

const touchEntityQuery = gql`
  mutation TouchEntity($id: EntityId!, $input: JSONObject!) {
    touchEntity(entityId: $id, input: $input) {
      entityId
      metadata
    }
  }
`;

function useTouchEntity(origin: TouchOrigin): {
  touchEntity: (options?: MutationFunctionOptions<TouchEntityResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: TouchEntityResult;
} {
  const location = useLocation();
  const [touchEntity, { loading, error, data }] = useMutation<TouchEntityResult>(touchEntityQuery, {
    fetchPolicy: "no-cache",
    variables: { input: { path: location.pathname, origin } },
  });

  return { touchEntity, loading, error, data: data ?? undefined };
}

export default useTouchEntity;
