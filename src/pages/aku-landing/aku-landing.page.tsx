import React from "react";

import { AkuLandingPageContainer, BottomImage } from "./aku-landing.style";
import AkuLandingHeader from "@src/components/aku/aku-landing-header/aku-landing-header.component";
import DetailsFaq from "@src/components/aku/details-faq/details-faq.component";
import HowDoesItWork from "@src/components/aku/how-does-it-work/how-does-it-work.component";
import SelectAdventure from "@src/components/aku/select-adventure/select-adventure.component";
import Spheres from "@src/components/aku/spheres/spheres.component";
import StoryIntroduction from "@src/components/aku/story-introduction/story-introduction.component";
import Footer from "@src/components/layout/footer/footer.component";

const AkuLanding: React.FC = () => {
  return (
    <AkuLandingPageContainer minWidth="100vw" color="common.white">
      <AkuLandingHeader />
      <StoryIntroduction />
      <SelectAdventure />
      <HowDoesItWork />
      <DetailsFaq />
      <BottomImage height={{ xs: "812px", sm: "960px" }}>
        <Spheres maxHeight="156px" maxWidth="466px" paddingX="55px" paddingBottom="100px" />
      </BottomImage>
      <Footer />
    </AkuLandingPageContainer>
  );
};

export default AkuLanding;
