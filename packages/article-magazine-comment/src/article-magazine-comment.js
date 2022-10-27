/* eslint-disable consistent-return */

import React, { Fragment } from "react";
import ArticleError from "@times-components-native/article-error";
import ArticleSkeleton from "@times-components-native/article-skeleton";
import {
  getHeadline,
  getLeadAsset,
  getCropByPriority,
} from "@times-components-native/utils";
import { CentredCaption } from "@times-components-native/caption";
import ArticleLeadAsset from "@times-components-native/article-lead-asset";
import ArticleHeader from "./article-header/article-header";
import { usePartialResponsiveContext } from "@times-components-native/responsive";
import { useAppContext } from "@times-components-native/context";
import {
  articlePropTypes,
  articleDefaultProps,
} from "./article-prop-types/article-prop-types";
import styles from "./styles";

const ArticleMagazineComment = props => {
  const { isArticleTablet } = usePartialResponsiveContext();

  const {
    theme: { scale, dropCapFont },
  } = useAppContext();

  const renderHeader = ({ width }) => {
    const { article, onAuthorPress, onImagePress, onVideoPress } = props;

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

    const renderCaption = ({ caption }) => <CentredCaption {...caption} />;

    return (
      <Fragment>
        <ArticleHeader
          articleId={article.id}
          authorImage={authorImage}
          bylines={bylines}
          flags={expirableFlags}
          hasVideo={hasVideo}
          headline={getHeadline(headline, shortHeadline)}
          label={label}
          onAuthorPress={onAuthorPress}
          publicationName={publicationName}
          publishedTime={publishedTime}
          standfirst={standfirst}
        />
        <ArticleLeadAsset
          {...getLeadAsset(article)}
          getImageCrop={getCropByPriority}
          onImagePress={onImagePress}
          onVideoPress={onVideoPress}
          renderCaption={renderCaption}
          style={styles.leadAssetContainer}
          width={width}
        />
      </Fragment>
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
      Header={renderHeader}
      interactiveConfig={interactiveConfig}
      isArticleTablet={isArticleTablet}
      dropCapFont={dropCapFont}
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

ArticleMagazineComment.propTypes = articlePropTypes;
ArticleMagazineComment.defaultProps = articleDefaultProps;

export default ArticleMagazineComment;
