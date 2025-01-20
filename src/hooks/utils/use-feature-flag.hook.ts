import { useFlags } from "launchdarkly-react-client-sdk";

export enum FeatureFlag {
  claimAvatarsAsNft = "display button to claim avatars as nft",
  dynamicSocialMediaMetadata = "metadata that changes based on page for fb and twitter",
  lightkeeperDashboard = "give access to Lightkeeper dashboard",
  maintenance = "show maintenance page",
  newOnboarding = "show new onboarding flow on sign in",
  oldOnboarding = "show old onboarding flow",
  onboardingButtonBadge = "show badge on onboarding button",
  onboardingChecklist = "display Onboarding button with steps",
  showAttendeesAvatars = "show avatars next to the [X attending] under event cards",
}

interface FeatureFlagUtilities {
  isFeatureEnabled: (name: FeatureFlag) => boolean;
}

function useFeatureFlag(): FeatureFlagUtilities {
  const flags: { [key: string]: boolean } = useFlags();

  const mapFF: { [key in FeatureFlag]?: boolean } = {
    [FeatureFlag.claimAvatarsAsNft]: flags.claimAvatarsAsNft,
    [FeatureFlag.dynamicSocialMediaMetadata]: flags.dynamicSocialMediaMetadata,
    [FeatureFlag.lightkeeperDashboard]: flags.lightkeeperDashboard,
    [FeatureFlag.maintenance]: flags.maintenance,
    [FeatureFlag.newOnboarding]: flags.newOnboarding,
    [FeatureFlag.oldOnboarding]: flags.oldOnboarding,
    [FeatureFlag.onboardingButtonBadge]: flags.onboardingButtonBadge,
    [FeatureFlag.onboardingChecklist]: flags.onboardingPopup,
    [FeatureFlag.showAttendeesAvatars]: flags.showAttendeesAvatars,
  };

  const isFeatureEnabled = (flag: FeatureFlag): boolean => {
    return mapFF[flag] || false;
  };

  return { isFeatureEnabled };
}

export default useFeatureFlag;
