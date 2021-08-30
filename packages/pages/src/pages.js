/* eslint-disable global-require */
import React, { Component } from "react";
import withErrorBoundaries from "./with-error-boundaries";

import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = (Child) =>
  class AppRoot extends Component {
    render() {
      return (
        <SafeAreaProvider>
          <Child {...this.props} />
        </SafeAreaProvider>
      );
    }
  };

export default (page) => {
  if (page === "Article") return App(require("./article").default);
  if (page === "AuthorProfile")
    return App(withErrorBoundaries(require("./author-profile").default));
  if (page === "Section")
    return App(withErrorBoundaries(require("./section").default));
  if (page === "Topic")
    return App(withErrorBoundaries(require("./topic").default));
  if (page === "Search")
    return App(withErrorBoundaries(require("./search").default));
  return App(withErrorBoundaries(require("./article").default));
};
