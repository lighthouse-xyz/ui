import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { AkuChapterPageContainer } from "./aku-chapter.style";
import { AkuChapterName } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";
import AkuChapterHeader from "@src/components/aku/aku-chapter-header/aku-chapter-header.component";
import { akuChaptersData } from "@src/components/aku/aku-chapters-data.const";
import ChapterContent from "@src/components/aku/chapter-content/chapter-content.component";
import QuestForm from "@src/components/aku/quest-form/quest-form.component";
import Footer from "@src/components/layout/footer/footer.component";
import { usePageMetadataContext } from "@src/context/page-metadata/page-metadata-context";

const AkuChapter: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const params = useParams();

  const { setDynamicPageMetadata } = usePageMetadataContext();

  const chapterId = params.chapterId as AkuChapterName;

  useEffect(() => {
    const validAkuChapter = Object.keys(AkuChapterName);
    if (!chapterId || !validAkuChapter.includes(chapterId)) {
      navigate(paths.akuChapter.buildPath(AkuChapterName.nftParis));
    } else {
      const chapterData = akuChaptersData.find(chapter => chapter.chapterId === chapterId);
      if (chapterData) {
        setDynamicPageMetadata({
          title: t("metadata.aku.chapterTitle", { chapter: chapterData?.destination }),
          description: t("metadata.aku.description"),
        });
      }
    }
  }, [chapterId]);

  return (
    <AkuChapterPageContainer minWidth="100vw" color="common.white">
      <AkuChapterHeader chapterId={chapterId} />
      <QuestForm chapterId={chapterId} />
      <ChapterContent chapterId={chapterId} />
      <Footer />
    </AkuChapterPageContainer>
  );
};

export default AkuChapter;
