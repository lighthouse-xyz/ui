import { ApolloError, gql, LazyQueryExecFunction, OperationVariables, useLazyQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { coreProfileFields } from "@src/common/graphql/fragments.graphql";
import { Profile, QueryProfileArgs } from "@src/common/graphql/generated/user.schema.graphql";
import { isUserId } from "@src/utils/entity.util";

interface ProfileResults {
  profile: Profile;
}

export const getProfileQuery = gql`
  query Profile($handle: String, $userId: UserId) {
    profile(handle: $handle, userId: $userId) {
      ...CoreProfileFields
    }
  }
  ${coreProfileFields}
`;

function useProfile(): {
  getProfile: LazyQueryExecFunction<ProfileResults, OperationVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: ProfileResults;
} {
  const [getProfile, { loading, error, data }] = useLazyQuery<ProfileResults>(getProfileQuery, {
    context: { clientName: ClientName.user },
  });

  return { getProfile, loading, error, data };
}

function buildGetProfileArgs(id: string): QueryProfileArgs {
  const args: QueryProfileArgs = {};
  if (isUserId(id)) {
    args.userId = id;
  } else {
    args.handle = id;
  }

  return args;
}

export { buildGetProfileArgs, useProfile as default };
