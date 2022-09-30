import React, { Component } from "react";
import { NativeModules } from "react-native";
import NewRelic from "newrelic-react-native-agent";
import ArticleError from "@times-components-native/article-error";

const { componentCaughtError } = NativeModules.ReactAnalytics;

export const withErrorBoundaries = (WrappedComponent, extras = {}) =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      componentCaughtError(error.message, errorInfo.componentStack);
      const isFatal = false;
      NewRelic.NRMAModularAgentWrapper.execute(
        "recordStack",
        "Pages" + error.name,
        error.message + "\n" + error.cause,
        errorInfo.componentStack + "\n\n\n" + error.stack,
        isFatal,
        NewRelic.JSAppVersion,
      );
    }

    render() {
      const { hasError } = this.state;

      return hasError ? (
        <ArticleError
          title={extras.title}
          message={extras.message}
          buttonText={extras.buttonText}
          refetch={extras.onAction}
        />
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };

export default withErrorBoundaries;
