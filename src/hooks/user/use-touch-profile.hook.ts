import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { TouchMetadata, TouchOrigin } from "@src/common/enums/track-events.enum";
import { useLocation } from "react-router-dom";

interface TouchProfileResult {
  touchProfile: {
    userId: string;
    metadata: TouchMetadata;
  };
}

const touchProfileQuery = gql`
  mutation TouchProfile($id: UserId!, $input: JSONObject!) {
    touchProfile(input: $input, userId: $id) {
      metadata
      userId
    }
  }
`;

function useTouchProfile(origin: TouchOrigin): {
  touchProfile: (options?: MutationFunctionOptions<TouchProfileResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: TouchProfileResult;
} {
  const location = useLocation();
  const [touchProfile, { loading, error, data }] = useMutation<TouchProfileResult>(touchProfileQuery, {
    fetchPolicy: "no-cache",
    variables: { input: { path: location.pathname, origin } },
    context: {
      clientName: ClientName.user,
    },
  });

  return { touchProfile, loading, error, data: data ?? undefined };
}

export default useTouchProfile;
