import React from "react";
import { ActivityIndicator, View } from "react-native";
import PropTypes from "prop-types";
import { ArticleExtrasProvider } from "@times-components-native/provider";
import ArticleExtrasError from "./article-extras-error";
import ArticleExtrasContent from "./article-extras-content";
import { Viewport } from "@skele/components";

const ViewportAwareView = Viewport.Aware(View);

const ArticleExtras = ({
  analyticsStream,
  articleId,
  articleUrl,
  onRelatedArticlePress,
  onTopicPress,
  onCommentGuidelinesPress,
  onCommentsPress,
  onTooltipPresented,
  narrowContent,
  template,
  tooltips,
}) => (
  <ArticleExtrasProvider debounceTimeMs={0} id={articleId.toLowerCase()}>
    {({ article, error, isLoading, refetch }) => {
      return (
        <ViewportAwareView onViewportEnter={refetch}>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : error ? (
            <ArticleExtrasError refetch={refetch} />
          ) : (
            <ArticleExtrasContent
              analyticsStream={analyticsStream}
              article={article}
              articleId={articleId}
              articleUrl={articleUrl}
              onCommentGuidelinesPress={onCommentGuidelinesPress}
              onCommentsPress={onCommentsPress}
              onRelatedArticlePress={onRelatedArticlePress}
              onTopicPress={onTopicPress}
              onTooltipPresented={onTooltipPresented}
              narrowContent={narrowContent}
              template={template}
              tooltips={tooltips}
            />
          )}
        </ViewportAwareView>
      );
    }}
  </ArticleExtrasProvider>
);

ArticleExtras.propTypes = {
  analyticsStream: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  articleUrl: PropTypes.string.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTooltipPresented: PropTypes.func,
  onTopicPress: PropTypes.func.isRequired,
  template: PropTypes.string.isRequired,
  tooltips: PropTypes.array,
  narrowContent: PropTypes.bool,
};

ArticleExtras.defaultProps = {
  narrowContent: false,
  onTooltipPresented: () => null,
  tooltips: [],
};

export default ArticleExtras;
