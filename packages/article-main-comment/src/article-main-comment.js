/* eslint-disable consistent-return */
import React from "react";
import ArticleError from "@times-components-native/article-error";
import ArticleSkeleton from "@times-components-native/article-skeleton";
import { getHeadline } from "@times-components-native/utils";
import ArticleHeader from "./article-header/article-header";
import { usePartialResponsiveContext } from "@times-components-native/responsive";
import { useAppContext } from "@times-components-native/context";
import {
  articlePropTypes,
  articleDefaultProps,
} from "./article-prop-types/article-prop-types";

const ArticleMainComment = props => {
  const { isArticleTablet } = usePartialResponsiveContext();

  const {
    theme: { scale, dropCapFont },
  } = useAppContext();

  const renderHeader = () => {
    const {
      article,
      onAuthorPress,
      onImagePress,
      onTooltipPresented,
      tooltips,
    } = props;

    const {
      bylines,
      expirableFlags,
      hasVideo,
      headline,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
    } = article;

    const authorImage =
      bylines &&
      bylines.length > 0 &&
      bylines[0].image &&
      Object.keys(bylines[0].image).length !== 0 &&
      bylines[0].image.crop
        ? bylines[0].image.crop.url
        : null;

    return (
      <ArticleHeader
        articleId={article.id}
        authorImage={authorImage}
        bylines={bylines}
        flags={expirableFlags}
        hasVideo={hasVideo}
        headline={getHeadline(headline, shortHeadline)}
        label={label}
        onAuthorPress={onAuthorPress}
        onImagePress={onImagePress}
        onTooltipPresented={onTooltipPresented}
        publicationName={publicationName}
        publishedTime={publishedTime}
        standfirst={standfirst}
        tooltips={tooltips}
      />
    );
  };

  const { error, refetch, isLoading } = props;

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
    receiveChildList,
    tooltips,
  } = props;

  return (
    <ArticleSkeleton
      adConfig={adConfig}
      analyticsStream={analyticsStream}
      data={article}
      dropCapFont={dropCapFont}
      Header={renderHeader}
      interactiveConfig={interactiveConfig}
      isArticleTablet={isArticleTablet}
      onArticleRead={onArticleRead}
      onAuthorPress={onAuthorPress}
      onCommentGuidelinesPress={onCommentGuidelinesPress}
      onCommentsPress={onCommentsPress}
      onImagePress={onImagePress}
      onLinkPress={onLinkPress}
      onRelatedArticlePress={onRelatedArticlePress}
      onTooltipPresented={onTooltipPresented}
      onTopicPress={onTopicPress}
      onTwitterLinkPress={onTwitterLinkPress}
      onVideoPress={onVideoPress}
      onViewableItemsChanged={null}
      receiveChildList={receiveChildList}
      scale={scale}
      tooltips={tooltips}
    />
  );
};

ArticleMainComment.propTypes = articlePropTypes;
ArticleMainComment.defaultProps = articleDefaultProps;

export default ArticleMainComment;
