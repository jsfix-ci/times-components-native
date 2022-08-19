import "./mocks";
import { SponsoredAd } from "@times-components-native/ad";
import TestRenderer from "react-test-renderer";
import React from "react";
import WebView from "react-native-webview";

describe("SponsoredAd", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders Dianomi script tag", () => {
    const ad = TestRenderer.create(<SponsoredAd numberOfAds={4} />);
    const webView = ad.root.findByType(WebView);

    expect(webView.props.source.html).toMatchSnapshot();
  });

  it("renders the require number of ad items", () => {
    const ad = TestRenderer.create(<SponsoredAd numberOfAds={2} />);
    const webView = ad.root.findByType(WebView);

    expect(webView.props.source.html).toMatchSnapshot();
  });
});
