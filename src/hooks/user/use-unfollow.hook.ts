import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { coreProfileFields } from "@src/common/graphql/fragments.graphql";
import { FollowRelationship } from "@src/common/graphql/generated/user.schema.graphql";

interface UnfollowResult {
  unfollow: FollowRelationship;
}

const unfollowQuery = gql`
  mutation Unfollow($id: UserId!, $input: FollowInput!) {
    unfollow(input: $input, userId: $id) {
      currentUser {
        ...CoreProfileFields
      }
      targetUser {
        ...CoreProfileFields
      }
    }
  }
  ${coreProfileFields}
`;

function useUnfollow(): {
  unfollow: (options?: MutationFunctionOptions<UnfollowResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: UnfollowResult;
} {
  const [unfollow, { loading, error, data }] = useMutation<UnfollowResult>(unfollowQuery, {
    context: {
      clientName: ClientName.user,
    },
    update(cache, variables) {
      cache.modify({
        id: variables.data?.unfollow.targetUser.userId,
        fields: {
          followingStatus() {
            return variables.data?.unfollow.targetUser.followingStatus;
          },
          followerCount() {
            return variables.data?.unfollow.targetUser.followerCount ?? 0;
          },
          friendCount() {
            return variables.data?.unfollow.targetUser.friendCount ?? 0;
          },
        },
      });
    },
  });

  return { unfollow, loading, error, data: data ?? undefined };
}

export default useUnfollow;
