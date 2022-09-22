import React, { useEffect } from "react";
import { DeviceEventEmitter, NativeModules, Platform } from "react-native";
import Article from "@times-components-native/article";
import {
  ContextProviderWithDefaults,
  defaults,
} from "@times-components-native/context";
import { themeFactory } from "@times-components-native/styleguide";
import { defaultProps, propTypes } from "./article-prop-types";
import trackArticle from "./track-article";
import { RemoteConfigProvider } from "@times-components-native/remote-config";
import Responsive from "@times-components-native/responsive";

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
  fontScale,
  sectionName: pageSection,
  remoteConfig,
  tooltips,
}) => {
  const { section: articleSection, template } = article || {};
  const section = pageSection || articleSection || "default";

  const [fontScaleToUse, setFontScaleToUse] = React.useState(
    fontScale ? fontScale / 100 : 1,
  );

  const theme = React.useMemo(
    () => ({
      ...themeFactory(section, template),
      scale: scale || defaults.theme.scale,
      fontScale: fontScaleToUse,
    }),
    [fontScaleToUse],
  );

  const interactiveConfig = {
    dev: devInteractives,
    environment,
    platform: Platform.OS,
    version: appVersion,
  };

  const onFontScaleChange = (newVal) => {
    if (newVal) {
      setFontScaleToUse(newVal / 100);
    }
  };

  useEffect(() => {
    const fontChangeListener = DeviceEventEmitter.addListener(
      "onFontScaleChanged",
      onFontScaleChange,
    );

    return () => {
      fontChangeListener.remove();
    };
  }, []);

  return (
    <ContextProviderWithDefaults value={{ theme }}>
      <Responsive fontScale={fontScaleToUse}>
        <RemoteConfigProvider config={remoteConfig}>
          <Article
            adConfig={{ sectionName: section }}
            analyticsStream={trackArticle}
            article={article}
            error={omitErrors ? null : error}
            interactiveConfig={interactiveConfig}
            isLoading={isLoading || (omitErrors && error)}
            onArticleRead={onArticleRead}
            onAuthorPress={(event, { slug }) => onAuthorPress(slug)}
            onCommentGuidelinesPress={() => onCommentGuidelinesPress()}
            onCommentsPress={(event, { articleId: id, url }) =>
              onCommentsPress(id, url)
            }
            onImagePress={onImagePress}
            onLinkPress={(event, { type, url }) => {
              if (type === "article") {
                onArticlePress(url);
              } else if (type === "topic") {
                onTopicPress(url);
              } else {
                onLinkPress(url);
              }
            }}
            onRelatedArticlePress={(event, { url }) => onArticlePress(url)}
            onTopicPress={(event, { slug }) => onTopicPress(slug)}
            onTwitterLinkPress={(_, { url }) => onLinkPress(url)}
            onTooltipPresented={onTooltipPresented}
            onVideoPress={(event, info) => onVideoPress(info)}
            pageSection={pageSection}
            referralUrl={referralUrl}
            refetch={refetch}
            tooltips={tooltips}
          />
        </RemoteConfigProvider>
      </Responsive>
    </ContextProviderWithDefaults>
  );
};

ArticleBase.propTypes = propTypes;
ArticleBase.defaultProps = defaultProps;

export default ArticleBase;
