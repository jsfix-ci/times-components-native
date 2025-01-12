import React, { Component } from "react";
import { Linking } from "react-native";
import { WebView } from "react-native-webview";
import PropTypes from "prop-types";
import webviewEventCallbackSetup from "./webview-event-callback-setup";
import ResponsiveImageInteractive from "./responsive-image";

const editorialLambdaProtocol = "https://";
const editorialLambdaOrigin = "jotn9sgpg6.execute-api.eu-west-1.amazonaws.com";
const editorialLambdaSlug = "prod/component";

class InteractiveWrapper extends Component {
  static openURLInBrowser(url) {
    return Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          return console.error("Cant open url", url); // eslint-disable-line no-console
        }
        return Linking.openURL(url);
      })
      .catch(err => console.error("An error occurred", err)); // eslint-disable-line no-console
  }

  constructor() {
    super();
    this.state = {
      height: 0,
    };
    this.onMessage = this.onMessage.bind(this);
    this.handleNavigationStateChange = this.handleNavigationStateChange.bind(
      this,
    );
    this.onLoadEnd = this.onLoadEnd.bind(this);
  }

  onMessage(e) {
    if (
      (e && e.nativeEvent && e.nativeEvent.data) ||
      e.nativeEvent.data === "0"
    ) {
      const { height } = this.state;
      const newHeight = parseInt(e.nativeEvent.data, 10);
      const minimumDifferenceInPixels = 5;
      const smallInteractiveAdditionalHeight = 30;

      if (
        newHeight &&
        Math.abs(newHeight - height) > minimumDifferenceInPixels
      ) {
        const updateState =
          newHeight < smallInteractiveAdditionalHeight
            ? { height: newHeight + smallInteractiveAdditionalHeight }
            : { height: newHeight };
        this.setState(updateState);
      }
    } else {
      console.error(`Invalid height received ${e.nativeEvent.data}`); // eslint-disable-line no-console
    }
  }

  onLoadEnd() {
    if (this.webview) {
      this.webview.postMessage("thetimes.co.uk", "*");
    }
  }

  handleNavigationStateChange(data) {
    if (
      !data.url.includes("data:text/html") &&
      data.url.includes("http") &&
      !data.url.includes(editorialLambdaOrigin)
    ) {
      // Need to handle native routing when something is clicked.
      InteractiveWrapper.openURLInBrowser(data.url);
      this.webview.reload();
    }
  }

  render() {
    const {
      config: { dev, environment, platform, version },
      id,
    } = this.props;
    const { height } = this.state;
    const uri = `${editorialLambdaProtocol}${editorialLambdaOrigin}/${editorialLambdaSlug}/${id}?dev=${dev}&env=${environment}&platform=${platform}&version=${version}`;

    // ERROR  Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    // We'd avoid the memory leaks removing the callback componentWillUnmount() TBC
    // const scriptToInjectUponUnmount = `window.postMessage = undefined (${webviewEventCallbackSetup})({window});`;
    const scriptToInject = `window.postMessage = function(data) {window.ReactNativeWebView.postMessage(data);};(${webviewEventCallbackSetup})({window});`;

    return (
      <WebView
        injectedJavaScriptBeforeContentLoaded={scriptToInject}
        onLoadEnd={this.onLoadEnd}
        onMessage={this.onMessage}
        onNavigationStateChange={this.handleNavigationStateChange}
        ref={ref => {
          this.webview = ref;
        }}
        scrollEnabled={false}
        source={{ uri }}
        style={{ height }}
        androidLayerType={"software"}
        textInteractionEnabled={true}
      />
    );
  }
}

InteractiveWrapper.propTypes = {
  config: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
};

InteractiveWrapper.defaultProps = {
  config: {},
};

InteractiveWrapper.ResponsiveImageInteractive = ResponsiveImageInteractive;

export default InteractiveWrapper;
