/* eslint-disable consistent-return */

import React, { Fragment } from "react";
import { View } from "react-native";
import ArticleError from "@times-components-native/article-error";
import ArticleSkeleton from "@times-components-native/article-skeleton";
import ArticleLeadAsset from "@times-components-native/article-lead-asset";
import { CentredCaption } from "@times-components-native/caption";
import { usePartialResponsiveContext } from "@times-components-native/responsive";
import { useAppContext } from "@times-components-native/context";

import {
  getAllArticleImages,
  getHeadline,
  getLeadAsset,
  getCropByPriority,
} from "@times-components-native/utils";
import ArticleHeader from "./article-header/article-header";
import {
  articleDefaultProps,
  articlePropTypes,
} from "./article-prop-types/article-prop-types";
import Meta from "./article-meta/article-meta";
import styles from "./styles";

const ArticleInDepth = props => {
  const { isArticleTablet } = usePartialResponsiveContext();

  const renderHeader = ({ width }) => {
    const { article, onAuthorPress, onImagePress, onVideoPress } = props;

    const {
      backgroundColour,
      bylines,
      expirableFlags,
      hasVideo,
      headline,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
      textColour,
    } = article;

    const formattedHeadline = getHeadline(headline, shortHeadline);
    const renderCaption = ({ caption }) =>
      caption && caption.text && <CentredCaption {...caption} />;

    return (
      <Fragment>
        <ArticleHeader
          backgroundColour={backgroundColour}
          flags={expirableFlags}
          hasVideo={hasVideo}
          headline={formattedHeadline}
          isArticleTablet={isArticleTablet}
          label={label}
          standfirst={standfirst}
          textColour={textColour}
        />
        <ArticleLeadAsset
          {...getLeadAsset(article)}
          getImageCrop={getCropByPriority}
          onImagePress={onImagePress}
          onVideoPress={onVideoPress}
          renderCaption={renderCaption}
          style={[styles.leadAsset, isArticleTablet && styles.leadAssetTablet]}
          width={width}
          extraContent={getAllArticleImages(article)}
        />
        <View
          style={[
            styles.metaContainer,
            isArticleTablet && styles.metaContainerTablet,
          ]}
        >
          <Meta
            backgroundColour={backgroundColour}
            bylines={bylines}
            isArticleTablet={isArticleTablet}
            onAuthorPress={onAuthorPress}
            publicationName={publicationName}
            publishedTime={publishedTime}
            textColour={textColour}
          />
        </View>
      </Fragment>
    );
  };

  const {
    error,
    refetch,
    isLoading,
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
  } = props;

  const {
    theme: { scale, dropCapFont },
  } = useAppContext();

  if (error) {
    return <ArticleError refetch={refetch} />;
  }

  if (isLoading) {
    return null;
  }

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
    />
  );
};

ArticleInDepth.propTypes = articlePropTypes;
ArticleInDepth.defaultProps = articleDefaultProps;

export default ArticleInDepth;
