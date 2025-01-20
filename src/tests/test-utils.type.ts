import { MockedProviderProps } from "@apollo/client/testing/react/MockedProvider.d";
import { type RenderOptions } from "@testing-library/react";

export type AllProvidersCustomProps = {
  initialPath?: string;
  apolloMock?: MockedProviderProps;
};

export type CustomRenderOptions = {
  allProvidersCustomProps?: AllProvidersCustomProps;
  testingLibraryOptions?: Omit<RenderOptions, "wrapper">;
};
