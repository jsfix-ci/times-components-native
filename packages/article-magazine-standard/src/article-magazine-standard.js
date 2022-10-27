/* eslint-disable consistent-return */

import React from "react";
import { View } from "react-native";
import ArticleError from "@times-components-native/article-error";
import ArticleSkeleton from "@times-components-native/article-skeleton";
import {
  getAllArticleImages,
  getHeadline,
  getLeadAsset,
  getCropByPriority,
} from "@times-components-native/utils";
import { CentredCaption } from "@times-components-native/caption";
import { usePartialResponsiveContext } from "@times-components-native/responsive";
import { useAppContext } from "@times-components-native/context";
import { tabletWidth } from "@times-components-native/styleguide";
import LeadAsset from "@times-components-native/article-lead-asset";
import ArticleHeader from "./article-header/article-header";
import {
  articlePropTypes,
  articleDefaultProps,
} from "./article-prop-types/article-prop-types";
import styles from "./styles";

const ArticleMagazineStandard = props => {
  const { isArticleTablet } = usePartialResponsiveContext();

  const {
    theme: { scale, dropCapFont },
  } = useAppContext();

  const renderHeader = ({ width }) => {
    const {
      article,
      onAuthorPress,
      onImagePress,
      onVideoPress,
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

    const renderCaption = ({ caption }) => <CentredCaption {...caption} />;

    return (
      <View>
        <ArticleHeader
          articleId={article.id}
          bylines={bylines}
          flags={expirableFlags}
          hasVideo={hasVideo}
          headline={getHeadline(headline, shortHeadline)}
          isArticleTablet={isArticleTablet}
          label={label}
          onAuthorPress={onAuthorPress}
          onTooltipPresented={onTooltipPresented}
          publicationName={publicationName}
          publishedTime={publishedTime}
          standfirst={standfirst}
          tooltips={tooltips}
        />
        <LeadAsset
          {...getLeadAsset(article)}
          getImageCrop={getCropByPriority}
          onImagePress={onImagePress}
          onVideoPress={onVideoPress}
          renderCaption={renderCaption}
          style={[
            styles.leadAssetContainer,
            isArticleTablet && styles.leadAssetContainerTablet,
            isArticleTablet && styles.tabletContainer,
            { zIndex: 0 },
          ]}
          width={Math.min(width, tabletWidth)}
          extraContent={getAllArticleImages(article)}
        />
      </View>
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

ArticleMagazineStandard.propTypes = articlePropTypes;
ArticleMagazineStandard.defaultProps = articleDefaultProps;

export default ArticleMagazineStandard;
