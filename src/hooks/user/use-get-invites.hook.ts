import { ApolloError, gql, LazyQueryExecFunction, OperationVariables, useLazyQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { InviteLink } from "@src/common/graphql/generated/user.schema.graphql";

interface FacebookInviteResult {
  facebookInvite: InviteLink;
}

interface RedditInviteResult {
  redditInvite: InviteLink;
}

interface TelegramInviteResult {
  telegramInvite: InviteLink;
}

interface TwitterInviteResult {
  twitterInvite: InviteLink;
}

type InviteResult = FacebookInviteResult | RedditInviteResult | TelegramInviteResult | TwitterInviteResult;

interface InviteLazyQueryResults<T extends InviteResult> {
  getInvite: LazyQueryExecFunction<T, OperationVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: T;
}

const facebookInviteQuery = gql`
  query FacebookInvite {
    facebookInvite {
      url
    }
  }
`;

const redditInviteQuery = gql`
  query RedditInvite {
    redditInvite {
      url
    }
  }
`;

const telegramInviteQuery = gql`
  query TelegramInvite {
    telegramInvite {
      url
    }
  }
`;

const twitterInviteQuery = gql`
  query TwitterInvite {
    twitterInvite {
      url
    }
  }
`;

function useGetInvites(): {
  facebook: InviteLazyQueryResults<FacebookInviteResult>;
  reddit: InviteLazyQueryResults<RedditInviteResult>;
  telegram: InviteLazyQueryResults<TelegramInviteResult>;
  twitter: InviteLazyQueryResults<TwitterInviteResult>;
} {
  const [getFacebookInvite, facebookResult] = useLazyQuery<FacebookInviteResult>(facebookInviteQuery, {
    context: {
      clientName: ClientName.user,
    },
  });

  const [getRedditInvite, redditResult] = useLazyQuery<RedditInviteResult>(redditInviteQuery, {
    context: {
      clientName: ClientName.user,
    },
  });

  const [getTelegramInvite, telegramResult] = useLazyQuery<TelegramInviteResult>(telegramInviteQuery, {
    context: {
      clientName: ClientName.user,
    },
  });

  const [getTwitterInvite, twitterResult] = useLazyQuery<TwitterInviteResult>(twitterInviteQuery, {
    context: {
      clientName: ClientName.user,
    },
  });

  return {
    facebook: {
      getInvite: getFacebookInvite,
      ...facebookResult,
    },
    reddit: {
      getInvite: getRedditInvite,
      ...redditResult,
    },
    telegram: {
      getInvite: getTelegramInvite,
      ...telegramResult,
    },
    twitter: {
      getInvite: getTwitterInvite,
      ...twitterResult,
    },
  };
}

export default useGetInvites;
