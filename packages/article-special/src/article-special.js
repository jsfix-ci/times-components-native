/* eslint-disable consistent-return */
import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import ArticleError from "@times-components-native/article-error";
import {
  articlePropTypes,
  articleDefaultProps,
} from "./article-prop-types/article-prop-types";
import WebView from "react-native-webview";
import { NativeModules } from "react-native";

const { onArticleLoaded } = NativeModules.ArticleEvents;

class ArticleSpecial extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { error, isLoading, refetch } = this.props;

    if (error) {
      return <ArticleError refetch={refetch} />;
    }

    if (isLoading) {
      return null;
    }
    const {
      adConfig,
      analyticsStream,
      article,
      interactiveConfig,
      onArticleRead,
      onAuthorPress,
      onCommentGuidelinesPress,
      onCommentsPress,
      onImagePress,
      onLinkPress,
      onRelatedArticlePress,
      onTooltipPresented,
      onTopicPress,
      onTwitterLinkPress,
      onVideoPress,
      onViewed,
      receiveChildList,
      referralUrl,
      tooltips,
    } = this.props;

    const embeddedUrl = article.url + "?enableEmbeddedMode=true";

    return (
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "green",
        }}
      >
        <WebView
          source={{
            uri: article.url,
            // uri: embeddedUrl // not working
          }}
          onLoadEnd={() => {
            // TODO - do we need to use tracking context / analyticsStream?
            onArticleLoaded(article.id, {});
          }}
          nestedScrollEnabled
        />
      </View>
    );
  }
}

ArticleSpecial.propTypes = {
  ...articlePropTypes,
  onLinkPress: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};
ArticleSpecial.defaultProps = {
  ...articleDefaultProps,
};

export default ArticleSpecial;
