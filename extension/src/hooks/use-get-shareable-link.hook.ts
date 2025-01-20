import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { JumpToUserLocation } from "@src/common/graphql/generated/user.schema.graphql";

interface GetShareableLinkResponse {
  getUserShareableJumpUrl: JumpToUserLocation;
}

interface GetShareableLinkVariables {
  userId: string;
}

export const getShareableLinkQuery = gql`
  mutation UserShareableJumpUrl($userId: UserId!) {
    getUserShareableJumpUrl(userId: $userId) {
      url
    }
  }
`;

function useGetShareableLink(variables: GetShareableLinkVariables): {
  getShareableLink: (
    options?: MutationFunctionOptions<GetShareableLinkResponse>,
  ) => Promise<FetchResult<GetShareableLinkResponse>>;
  loading: boolean;
  error?: ApolloError;
  data?: GetShareableLinkResponse | null;
} {
  const [getShareableLink, { loading, error, data }] = useMutation<GetShareableLinkResponse>(getShareableLinkQuery, {
    variables,
  });

  return { getShareableLink, loading, error, data };
}

export default useGetShareableLink;
