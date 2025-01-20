import { ApolloError, gql, LazyQueryExecFunction, OperationVariables, useLazyQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { ApiProfileRole } from "@src/common/graphql/generated/user.schema.graphql";

interface ProfileRolesResults {
  profileRolesFromToken: ApiProfileRole;
}

const getProfileRolesFromTokenQuery = gql`
  query ProfileRolesFromToken {
    profileRolesFromToken {
      roles
    }
  }
`;

function useProfileRolesFromToken(): {
  getProfileRolesFromToken: LazyQueryExecFunction<ProfileRolesResults, OperationVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: ProfileRolesResults;
} {
  const [getProfileRolesFromToken, { loading, error, data }] = useLazyQuery<ProfileRolesResults>(
    getProfileRolesFromTokenQuery,
    {
      context: { clientName: ClientName.user },
    },
  );

  return { getProfileRolesFromToken, loading, error, data };
}

export default useProfileRolesFromToken;
