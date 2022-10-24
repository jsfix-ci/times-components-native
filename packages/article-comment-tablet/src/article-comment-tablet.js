/* eslint-disable consistent-return */

import React from "react";
import { View } from "react-native";
import ArticleError from "@times-components-native/article-error";
import ArticleSkeleton from "@times-components-native/article-skeleton";
import {
  getHeadline,
  getLeadAsset,
  getCropByPriority,
} from "@times-components-native/utils";
import ArticleLeadAsset from "@times-components-native/article-lead-asset";
import { useResponsiveContext } from "@times-components-native/responsive";
import { Caption } from "@times-components-native/caption";
import { useAppContext } from "@times-components-native/context";
import ArticleHeader from "./article-header/article-header";
import ArticleLeftColumn from "./article-left-column/article-left-column";
import {
  articlePropTypes,
  articleDefaultProps,
} from "./article-prop-types/article-prop-types";
import styles from "./styles";

const ArticleCommentTablet = props => {
  const { isArticleTablet, narrowArticleBreakpoint } = useResponsiveContext();

  const {
    theme: { scale, dropCapFont },
  } = useAppContext();

  const renderHeader = () => {
    const { article, onAuthorPress, onImagePress, onVideoPress } = props;
    const {
      expirableFlags,
      hasVideo,
      headline,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
      template,
    } = article;

    const showLeadAsset = template === "magazinecomment";

    const renderCaption = ({ caption }) => (
      <Caption
        testIDCaption={"lead-image-caption"}
        testIDCredit={"lead-image-credit"}
        {...caption}
        style={styles.captionContainer}
      />
    );

    return (
      <View>
        <ArticleHeader
          flags={expirableFlags}
          hasVideo={hasVideo}
          headline={getHeadline(headline, shortHeadline)}
          label={label}
          onAuthorPress={onAuthorPress}
          onImagePress={onImagePress}
          publicationName={publicationName}
          publishedTime={publishedTime}
          standfirst={standfirst}
        />
        {showLeadAsset && (
          <ArticleLeadAsset
            {...getLeadAsset(article)}
            getImageCrop={getCropByPriority}
            onImagePress={onImagePress}
            onVideoPress={onVideoPress}
            renderCaption={renderCaption}
            style={styles.leadAssetContainer}
          />
        )}
      </View>
    );
  };

  const {
    error,
    refetch,
    isLoading,
    adConfig,
    adPosition,
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

  if (error) {
    return <ArticleError refetch={refetch} />;
  }

  if (isLoading) {
    return null;
  }

  const { bylines, topics } = article;
  const authorImage =
    bylines &&
    bylines.length > 0 &&
    bylines[0].image &&
    Object.keys(bylines[0].image).length !== 0 &&
    bylines[0].image.crop
      ? bylines[0].image.crop.url
      : null;

  return (
    <View
      style={[
        styles.mainContainer,
        { maxWidth: narrowArticleBreakpoint.container },
      ]}
    >
      <ArticleLeftColumn
        articleId={article.id}
        authorImage={authorImage}
        bylines={bylines}
        onAuthorPress={onAuthorPress}
        onImagePress={onImagePress}
        onTooltipPresented={onTooltipPresented}
        onTopicPress={onTopicPress}
        tooltips={tooltips}
        topics={topics}
      />
      <View style={styles.contentContainer}>
        <ArticleSkeleton
          adConfig={adConfig}
          adPosition={adPosition}
          analyticsStream={analyticsStream}
          data={article}
          dropCapFont={dropCapFont}
          Header={renderHeader}
          interactiveConfig={interactiveConfig}
          isArticleTablet={isArticleTablet}
          onArticleRead={onArticleRead}
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
          narrowContent={true}
          receiveChildList={receiveChildList}
          scale={scale}
          tooltips={tooltips}
        />
      </View>
    </View>
  );
};

ArticleCommentTablet.propTypes = articlePropTypes;
ArticleCommentTablet.defaultProps = articleDefaultProps;

export default ArticleCommentTablet;
