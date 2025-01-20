import { ApolloError, ApolloQueryResult, gql, useQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { AkuChapter, AkuChapterName } from "@src/common/graphql/generated/user.schema.graphql";

interface AkuChapterResponse {
  akuChapter: AkuChapter;
}

export const getAkuChapterQuery = gql`
  query AkuChapter($chapter: AkuChapterName!) {
    akuChapter(chapterName: $chapter) {
      chapterName
      quests {
        answer
        chapterId
        day
        questId
        question
        type
      }
      status
    }
  }
`;

function useGetAkuChapter(chapter: AkuChapterName): {
  loading: boolean;
  error?: ApolloError;
  data?: AkuChapterResponse;
  refetch?: () => Promise<ApolloQueryResult<AkuChapterResponse>>;
} {
  const { loading, error, data, refetch } = useQuery<AkuChapterResponse>(getAkuChapterQuery, {
    variables: { chapter },
    context: { clientName: ClientName.user },
  });

  return { loading, error, data, refetch };
}

export default useGetAkuChapter;
