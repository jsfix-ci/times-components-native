import React from "react";
import { NativeModules, Platform } from "react-native";
import Article from "@times-components-native/article";
import {
  ContextProviderWithDefaults,
  defaults,
} from "@times-components-native/context";
import { themeFactory } from "@times-components-native/styleguide";
import { defaultProps, propTypes } from "./article-prop-types";
import trackArticle from "./track-article";
import { RemoteConfigProvider } from "@times-components-native/remote-config";

const { appVersion = "", environment = "prod" } = NativeModules.ReactConfig;

const {
  onArticlePress,
  onArticleRead,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onImagePress,
  onLinkPress,
  onTopicPress,
  onVideoPress,
  onTooltipPresented,
} = NativeModules.ArticleEvents;

const ArticleBase = ({
  article,
  devInteractives,
  error,
  isLoading,
  referralUrl,
  refetch,
  omitErrors,
  scale,
  sectionName: pageSection,
  remoteConfig,
  tooltips,
}) => {
  const { section: articleSection, template } = article || {};
  const section = pageSection || articleSection || "default";
  const theme = {
    ...themeFactory(section, template),
    scale: scale || defaults.theme.scale,
  };

  const interactiveConfig = {
    dev: devInteractives,
    environment,
    platform: Platform.OS,
    version: appVersion,
  };

  const onAuthorPressWithProps = (event, { slug }) => onAuthorPress(slug);
  const onCommentsPressWithProps = (event, { articleId: id, url }) =>
    onCommentsPress(id, url);
  const onLinkPressWithProps = (event, { type, url }) => {
    if (type === "article") {
      onArticlePress(url);
    } else if (type === "topic") {
      onTopicPress(url);
    } else {
      onLinkPress(url);
    }
  };

  const onRelatedArticlePress = (event, { url }) => onArticlePress(url);
  const onTopicPressWithProps = (event, { slug }) => onTopicPress(slug);
  const onTwitterLinkPress = (_, { url }) => onLinkPress(url);
  const onVideoPressWithProps = (event, info) => onVideoPress(info);

  return (
    <ContextProviderWithDefaults value={{ theme }}>
      <RemoteConfigProvider config={remoteConfig}>
        <Article
          adConfig={{ sectionName: section }}
          analyticsStream={trackArticle}
          article={article}
          error={omitErrors ? null : error}
          interactiveConfig={interactiveConfig}
          isLoading={isLoading || (omitErrors && error)}
          onArticleRead={onArticleRead}
          onAuthorPress={onAuthorPressWithProps}
          onCommentGuidelinesPress={onCommentGuidelinesPress}
          onCommentsPress={onCommentsPressWithProps}
          onImagePress={onImagePress}
          onLinkPress={onLinkPressWithProps}
          onRelatedArticlePress={onRelatedArticlePress}
          onTopicPress={onTopicPressWithProps}
          onTwitterLinkPress={onTwitterLinkPress}
          onTooltipPresented={onTooltipPresented}
          onVideoPress={onVideoPressWithProps}
          pageSection={pageSection}
          referralUrl={referralUrl}
          refetch={refetch}
          tooltips={tooltips}
        />
      </RemoteConfigProvider>
    </ContextProviderWithDefaults>
  );
};

ArticleBase.whyDidYouRender = true;

ArticleBase.propTypes = propTypes;
ArticleBase.defaultProps = defaultProps;

export default ArticleBase;
