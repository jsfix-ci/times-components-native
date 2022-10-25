/* eslint-disable react/forbid-prop-types */
import React, { Component, isValidElement } from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import NewRelic from "newrelic-react-native-agent";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const isFatal = false;
    NewRelic.NRMAModularAgentWrapper.execute(
      "recordStack",
      "ArticleSkeleton " + error.name,
      error.message + "\n" + error.cause,
      errorInfo.componentStack + "\n\n\n" + error.stack,
      isFatal,
      NewRelic.JSAppVersion,
    );
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError || !isValidElement(children)) {
      const { attributes } = children || {};
      // Best effort attempt to show any text content
      if (attributes && attributes.value) {
        return <Text>{attributes.value}</Text>;
      }
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
};
