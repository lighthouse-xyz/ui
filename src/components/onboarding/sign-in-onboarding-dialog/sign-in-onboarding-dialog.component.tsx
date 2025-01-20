/* eslint-disable no-magic-numbers */
import React from "react";

import CommunityMembersStep from "./community-members-step/community-members-step.component";
import DownloadExtensionStep from "./download-extension-step/download-extension-step.component";
import PickCategoryStep from "./pick-category-step/pick-category-step.component";
import PickHandleStep from "./pick-handle-step/pick-handle-step.component";
import WelcomeStep from "./welcome-step/welcome-step.component";
import { UserCategory } from "@src/common/graphql/generated/user.schema.graphql";
import DialogFrame from "@src/components/common/dialog-frame/dialog-frame.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  onClose: () => void;
}

const SignInOnboardingDialog: React.FC<Props> = ({ onClose: handleClose }) => {
  const { profile } = useAuthContext();
  const isLightkeeperOrBrand =
    profile?.category === UserCategory.lightkeeper || profile?.category === UserCategory.brand;

  return profile ? (
    <DialogFrame persistent notDismissable width="smMd" onClose={handleClose} data-testid="signIn-onboarding-dialog">
      {isLightkeeperOrBrand ? (
        <Swiper spaceBetween={5} allowTouchMove={false} autoHeight observer observeParents>
          <SwiperSlide>
            <WelcomeStep index={0} nbSteps={4} />
          </SwiperSlide>
          <SwiperSlide>
            <PickHandleStep index={1} nbSteps={4} userId={profile.userId} initialHandle={profile.handle} />
          </SwiperSlide>
          <SwiperSlide>
            <CommunityMembersStep index={2} nbSteps={4} userId={profile.userId} />
          </SwiperSlide>
          <SwiperSlide>
            <DownloadExtensionStep index={3} nbSteps={4} closeDialog={handleClose} />
          </SwiperSlide>
        </Swiper>
      ) : (
        <Swiper spaceBetween={5} allowTouchMove={false} autoHeight observer observeParents>
          <SwiperSlide>
            <WelcomeStep index={0} nbSteps={5} />
          </SwiperSlide>
          <SwiperSlide>
            <PickCategoryStep index={1} nbSteps={5} userId={profile.userId} initialCategory={profile.category} />
          </SwiperSlide>
          <SwiperSlide>
            <PickHandleStep index={2} nbSteps={5} userId={profile.userId} initialHandle={profile.handle} />
          </SwiperSlide>
          <SwiperSlide>
            <CommunityMembersStep index={3} nbSteps={5} userId={profile.userId} />
          </SwiperSlide>
          <SwiperSlide>
            <DownloadExtensionStep index={4} nbSteps={5} closeDialog={handleClose} />
          </SwiperSlide>
        </Swiper>
      )}
    </DialogFrame>
  ) : null;
};

export default SignInOnboardingDialog;
