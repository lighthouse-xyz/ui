import React, { type PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";
import { Route, Router, Routes } from "react-router-dom";

import { AllProvidersCustomProps, CustomRenderOptions } from "./test-utils.type";
import { MockedProvider as MockedApolloProvider } from "@apollo/client/testing";
import i18n from "@src/locales/i18n";
import { render, type RenderResult } from "@testing-library/react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const AllProviders: React.FC<PropsWithChildren<AllProvidersCustomProps>> = ({ children, initialPath, apolloMock }) => {
  if (initialPath) {
    history.push(initialPath);
  }

  return (
    <MockedApolloProvider {...apolloMock}>
      <I18nextProvider i18n={i18n}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path={initialPath || "/"} element={children} />
          </Routes>
        </Router>
      </I18nextProvider>
    </MockedApolloProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: CustomRenderOptions): RenderResult => {
  return render(ui, {
    wrapper: props => <AllProviders {...props} {...options?.allProvidersCustomProps} />,
    ...options?.testingLibraryOptions,
  });
};

export * from "@testing-library/react";
export { customRender as render };
