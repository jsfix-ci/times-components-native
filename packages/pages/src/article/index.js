import React from "react";
import PropTypes from "prop-types";
import { Linking, NativeModules, Text } from "react-native";

import { ArticleProvider } from "@times-components-native/provider";
import Responsive from "@times-components-native/responsive";
import { propTypes, defaultProps } from "./article-prop-types";
import { withErrorBoundaries } from "../with-error-boundaries";
import ArticleBase from "./article-base";
import withNativeProvider from "../with-native-provider";
import { OptimizelyExperiment, OptimizelyProvider, createInstance } from '@optimizely/react-sdk'

const { refetch: refetchArticle } = NativeModules.ArticleEvents;

// Instantiate an Optimizely client
const optimizely = createInstance({
  sdkKey: 'X2ZaEYhseMrxmURnDSkCg',
});

const ArticlePage = (props) => {
  const { article, articleId, error } = props;
  const data = article ? JSON.parse(article).data.article : null;
  const openInBrowser = (data || {}).url
    ? () => Linking.openURL(data.url)
    : undefined;
  const errorBoundaryOptions = {
    title: "View online",
    message: "This article will display on the web",
    buttonText: "Open in browser",
    onAction: openInBrowser,
  };
  console.log(optimizely, '<--- optimizely')
  if (article || error) {
    const ArticlePageView = withErrorBoundaries(
      withNativeProvider(
        <Responsive>
          <ArticleBase
            {...props}
            article={article ? JSON.parse(article).data.article : null}
            error={error ? { message: error } : null}
            refetch={() => refetchArticle(articleId)}
          />
        </Responsive>,
      ),
      errorBoundaryOptions,
    );

    return <ArticlePageView />;
  }

  const ArticlePageView = withErrorBoundaries(
    withNativeProvider(
      <ArticleProvider debounceTimeMs={100} id={articleId}>
        {({ article: articleData, isLoading, error: errorData, refetch }) => (
          <Responsive>
            <OptimizelyExperiment experiment="exp1">
              {(variation) => (
                variation === 'simple'
                  ? <Text>simple variation</Text>
                  : <Text>detailed variation</Text>
              )}
            </OptimizelyExperiment>
            <ArticleBase
              {...props}
              article={articleData}
              error={errorData}
              isLoading={isLoading}
              refetch={refetch}
            />
          </Responsive>
        )}
      </ArticleProvider>,
    ),
    errorBoundaryOptions,
  );

  return (
  <OptimizelyProvider
    optimizely={optimizely}
    user={{id: '12310'}}>
      <OptimizelyExperiment experiment="react-native-experiment">
          <Text>experiment</Text>
          <Text>{optimizely}</Text>

            {(variation) => (
              variation === 'variation_1'
                ? <Text>simple variation</Text>
                : <Text>detailed variation</Text>
            )}
          </OptimizelyExperiment>
    <ArticlePageView />
  </OptimizelyProvider>);
};
ArticlePage.propTypes = {
  ...propTypes,
  article: PropTypes.string,
  error: PropTypes.string,
};
ArticlePage.defaultProps = defaultProps;

export default ArticlePage;
