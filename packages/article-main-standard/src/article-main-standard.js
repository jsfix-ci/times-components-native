/* eslint-disable consistent-return */
import React, { Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ArticleError from "@times-components-native/article-error";
import ArticleSkeleton from "@times-components-native/article-skeleton";
import ArticleLeadAsset from "@times-components-native/article-lead-asset";
import { usePartialResponsiveContext } from "@times-components-native/responsive";
import { useAppContext } from "@times-components-native/context";
import {
  getAllArticleImages,
  getHeadline,
  getLeadAsset,
  getCropByPriority,
} from "@times-components-native/utils";
import { tabletWidth } from "@times-components-native/styleguide";
import { Caption } from "@times-components-native/caption";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import stylesFactory from "./styles/article-body";
import {
  articlePropTypes,
  articleDefaultProps,
} from "./article-prop-types/article-prop-types";

const ArticleMainStandard = props => {
  const { isArticleTablet } = usePartialResponsiveContext();

  const {
    theme: { scale, dropCapFont },
  } = useAppContext();

  const renderHeader = parentProps => {
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

    const styles = stylesFactory();

    const isLive = expirableFlags
      ? expirableFlags.filter(flag => flag.type === "LIVE").length > 0
      : false;

    const renderCaption = ({ caption }) => (
      <Caption
        testIDCaption={"lead-image-caption"}
        testIDCredit={"lead-image-credit"}
        {...caption}
        style={!isArticleTablet && { container: styles.captionContainer }}
      />
    );

    const leadAsset = (
      <View key="leadAsset" testID="leadAsset">
        <ArticleLeadAsset
          {...getLeadAsset(article)}
          getImageCrop={getCropByPriority}
          onImagePress={onImagePress}
          onVideoPress={onVideoPress}
          renderCaption={renderCaption}
          style={[styles.leadAsset, isArticleTablet && styles.leadAssetTablet]}
          width={Math.min(parentProps.width, tabletWidth)}
          extraContent={getAllArticleImages(article)}
        />
      </View>
    );
    const header = (
      <Fragment key="header">
        <ArticleHeader
          flags={expirableFlags}
          hasVideo={hasVideo}
          headline={getHeadline(headline, shortHeadline)}
          isArticleTablet={isArticleTablet}
          isLive={isLive}
          label={label}
          publishedTime={publishedTime}
          standfirst={standfirst}
        />

        <ArticleMeta
          articleId={article.id}
          bylines={bylines}
          isArticleTablet={isArticleTablet}
          onAuthorPress={onAuthorPress}
          publicationName={publicationName}
          publishedTime={publishedTime}
        />
      </Fragment>
    );
    return (
      <View
        style={
          isArticleTablet && [
            styles.articleMainContentRow,
            styles.articleMainContentRowTablet,
          ]
        }
      >
        {[header, leadAsset]}
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
    referralUrl,
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
      referralUrl={referralUrl}
      scale={scale}
      tooltips={tooltips}
    />
  );
};

ArticleMainStandard.whyDidYouRender = true;

ArticleMainStandard.propTypes = {
  ...articlePropTypes,
  interactiveConfig: PropTypes.shape({}),
  onArticleRead: PropTypes.func.isRequired,
  onAuthorPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onImagePress: PropTypes.func,
  onLinkPress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  referralUrl: PropTypes.string,
  refetch: PropTypes.func.isRequired,
};
ArticleMainStandard.defaultProps = {
  ...articleDefaultProps,
  interactiveConfig: {},
  onImagePress: null,
  referralUrl: null,
};

export default React.memo(ArticleMainStandard);
