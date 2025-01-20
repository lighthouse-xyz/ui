import React from "react";

import Box from "@mui/material/Box";
import ethDenverCompletedTicketImage from "@src/assets/images/aku-eth-denver-completed-ticket-image.png";
import ethDenverExpiredTicketImage from "@src/assets/images/aku-eth-denver-expired-ticket-image.png";
import ethDenverImage from "@src/assets/images/aku-eth-denver-image.webp";
import ethDenverTicketImage from "@src/assets/images/aku-eth-denver-ticket-image.png";
import nftNycCompletedTicketImage from "@src/assets/images/aku-nft-nyc-completed-ticket-image.png";
import nftNycExpiredTicketImage from "@src/assets/images/aku-nft-nyc-expired-ticket-image.png";
import nftNycImage from "@src/assets/images/aku-nft-nyc-image.webp";
import nftNycTicketImage from "@src/assets/images/aku-nft-nyc-ticket-image.png";
import nftParisCompletedTicketImage from "@src/assets/images/aku-nft-paris-completed-ticket-image.png";
import nftParisExpiredTicketImage from "@src/assets/images/aku-nft-paris-expired-ticket-image.png";
import nftParisImage from "@src/assets/images/aku-nft-paris-image.webp";
import nftParisTicketImage from "@src/assets/images/aku-nft-paris-ticket-image.png";
import {
  AkuChapterName,
  AkuChapterStatus,
  AkuQuest,
  AkuQuestType,
} from "@src/common/graphql/generated/user.schema.graphql";

interface ChapterDetails {
  no: number;
  chapterId: AkuChapterName;
  expired: boolean;
  title: string;
  destination: string;
  ticket: (state?: AkuChapterStatus | "completed") => JSX.Element;
  image: string;
  paragraphs: string[];
  fallbackQuests: AkuQuest[];
}

export const akuChaptersData: ChapterDetails[] = [
  {
    no: 3,
    chapterId: AkuChapterName.nftNyc,
    expired: true,
    title: "chapter.nftNyc.title",
    destination: "NFT.NYC",
    ticket: (state?: AkuChapterStatus | "completed"): JSX.Element => (
      <Box maxHeight="270px" maxWidth="596px">
        <img
          src={
            state === AkuChapterStatus.expired
              ? nftNycExpiredTicketImage
              : state === "completed"
              ? nftNycCompletedTicketImage
              : nftNycTicketImage
          }
          width="100%"
          height="100%"
        />
      </Box>
    ),
    image: nftNycImage,
    paragraphs: [
      "chapter.nftNyc.paraph1",
      "chapter.nftNyc.paraph2",
      "chapter.nftNyc.paraph3",
      "chapter.nftNyc.paraph4",
      "chapter.nftNyc.paraph5",
    ],
    fallbackQuests: [
      {
        chapterId: AkuChapterName.nftNyc,
        day: 1,
        questId: "questId1",
        type: AkuQuestType.main,
      },
      {
        chapterId: AkuChapterName.nftNyc,
        day: 2,
        questId: "questId2",
        type: AkuQuestType.main,
      },
      {
        chapterId: AkuChapterName.nftNyc,
        day: 3,
        questId: "questId3",
        type: AkuQuestType.main,
      },
    ],
  },
  {
    no: 2,
    chapterId: AkuChapterName.ethDenver,
    expired: true,
    title: "chapter.ethDenver.title",
    destination: "ETH Denver",
    ticket: (state?: AkuChapterStatus | "completed"): JSX.Element => (
      <Box maxHeight="270px" maxWidth="596px">
        <img
          src={
            state === AkuChapterStatus.expired
              ? ethDenverExpiredTicketImage
              : state === "completed"
              ? ethDenverCompletedTicketImage
              : ethDenverTicketImage
          }
          width="100%"
          height="100%"
        />
      </Box>
    ),
    image: ethDenverImage,
    paragraphs: [
      "chapter.ethDenver.paraph1",
      "chapter.ethDenver.paraph2",
      "chapter.ethDenver.paraph3",
      "chapter.ethDenver.paraph4",
      "chapter.ethDenver.paraph5",
      "chapter.ethDenver.paraph6",
    ],
    fallbackQuests: [
      {
        chapterId: AkuChapterName.ethDenver,
        day: 1,
        questId: "questId1",
        type: AkuQuestType.main,
      },
      {
        chapterId: AkuChapterName.ethDenver,
        day: 1,
        questId: "questId2",
        type: AkuQuestType.extra,
      },
      {
        chapterId: AkuChapterName.ethDenver,
        day: 2,
        questId: "questId3",
        type: AkuQuestType.main,
      },
      {
        chapterId: AkuChapterName.ethDenver,
        day: 2,
        questId: "questId4",
        type: AkuQuestType.extra,
      },
    ],
  },
  {
    no: 1,
    chapterId: AkuChapterName.nftParis,
    expired: true,
    title: "chapter.nftParis.title",
    destination: "NFT Paris",
    ticket: (state?: AkuChapterStatus | "completed"): JSX.Element => (
      <Box maxHeight="270px" maxWidth="596px">
        <img
          src={
            state === AkuChapterStatus.expired
              ? nftParisExpiredTicketImage
              : state === "completed"
              ? nftParisCompletedTicketImage
              : nftParisTicketImage
          }
          width="100%"
          height="100%"
        />
      </Box>
    ),
    image: nftParisImage,
    paragraphs: [
      "chapter.nftParis.paraph1",
      "chapter.nftParis.paraph2",
      "chapter.nftParis.paraph3",
      "chapter.nftParis.paraph4",
      "chapter.nftParis.paraph5",
      "chapter.nftParis.paraph6",
      "chapter.nftParis.paraph7",
      "chapter.nftParis.paraph8",
    ],
    fallbackQuests: [
      {
        chapterId: AkuChapterName.nftParis,
        day: 1,
        questId: "questId1",
        type: AkuQuestType.main,
      },
      {
        chapterId: AkuChapterName.nftParis,
        day: 2,
        questId: "questId2",
        type: AkuQuestType.main,
      },
      {
        chapterId: AkuChapterName.nftParis,
        day: 3,
        questId: "questId3",
        type: AkuQuestType.main,
      },
      {
        chapterId: AkuChapterName.nftParis,
        day: 4,
        questId: "questId4",
        type: AkuQuestType.main,
      },
    ],
  },
];
