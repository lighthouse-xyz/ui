import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { originHeader } from "@src/common/apollo/apollo-client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { FollowOrigin } from "@src/common/enums/track-events.enum";
import { coreProfileFields } from "@src/common/graphql/fragments.graphql";
import { FollowRelationship } from "@src/common/graphql/generated/user.schema.graphql";

interface FollowResult {
  follow: FollowRelationship;
}

const followQuery = gql`
  mutation Follow($id: UserId!, $input: FollowInput!) {
    follow(input: $input, userId: $id) {
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

function useFollow(origin: FollowOrigin): {
  follow: (options?: MutationFunctionOptions<FollowResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: FollowResult;
} {
  const [follow, { loading, error, data }] = useMutation<FollowResult>(followQuery, {
    context: {
      clientName: ClientName.user,
      headers: {
        [originHeader]: origin,
      },
    },
    update(cache, variables) {
      cache.modify({
        id: variables.data?.follow.targetUser.userId,
        fields: {
          followingStatus() {
            return variables.data?.follow.targetUser.followingStatus;
          },
          followerCount() {
            return variables.data?.follow.targetUser.followerCount ?? 0;
          },
          friendCount() {
            return variables.data?.follow.targetUser.friendCount ?? 0;
          },
        },
      });
    },
  });

  return { follow, loading, error, data: data ?? undefined };
}

export default useFollow;
