import { InviteLink } from "@src/common/graphql/generated/user.schema.graphql";
import { useTranslation } from "react-i18next";

import useGetInvites from "../user/use-get-invites.hook";
import useToast from "./use-toast.hook";

export enum InviteType {
  telegram = "telegram",
  twitter = "twitter",
  facebook = "facebook",
  reddit = "reddit",
}

interface InviteLinksUtils {
  getReferralLink: (userIdOrHandle: string) => string;
  handleInviteClick: (inviteType: InviteType) => void;
}

function useInviteLinks(): InviteLinksUtils {
  const { t } = useTranslation();
  const { showToast } = useToast({ variant: "error" });

  const {
    facebook: { getInvite: getFacebookInvite },
    reddit: { getInvite: getRedditInvite },
    telegram: { getInvite: getTelegramInvite },
    twitter: { getInvite: getTwitterInvite },
  } = useGetInvites();

  const onGetInviteCompleted = (inviteLink: InviteLink): void => {
    window.open(inviteLink.url);
  };

  const onGetInviteError = (): void => {
    showToast(t("error.generic"));
  };

  const getReferralLink = (userIdOrHandle: string): string =>
    `${window.location.origin}/home?lightkeeper=${userIdOrHandle}`;

  const handleInviteClick = (type: InviteType): void => {
    switch (type) {
      case InviteType.telegram:
        void getTelegramInvite({
          onCompleted: data => onGetInviteCompleted(data.telegramInvite),
          onError: onGetInviteError,
        });
        break;
      case InviteType.twitter:
        void getTwitterInvite({
          onCompleted: data => onGetInviteCompleted(data.twitterInvite),
          onError: onGetInviteError,
        });
        break;
      case InviteType.facebook:
        void getFacebookInvite({
          onCompleted: data => onGetInviteCompleted(data.facebookInvite),
          onError: onGetInviteError,
        });
        break;
      case InviteType.reddit:
        void getRedditInvite({
          onCompleted: data => onGetInviteCompleted(data.redditInvite),
          onError: onGetInviteError,
        });
        break;
      default:
        break;
    }
  };

  return { getReferralLink, handleInviteClick };
}

export default useInviteLinks;
