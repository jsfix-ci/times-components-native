/* eslint-disable consistent-return */

import React, { Component, Fragment } from "react";
import { View } from "react-native";
import ArticleError from "@times-components-native/article-error";
import { hasBylineData } from "@times-components-native/article-byline";
import ArticleSkeleton from "@times-components-native/article-skeleton";
import ArticleLeadAsset from "@times-components-native/article-lead-asset";
import { CentredCaption } from "@times-components-native/caption";
import { ResponsiveContext } from "@times-components-native/responsive";
import {
  getAllArticleImages,
  getHeadline,
  getLeadAsset,
  getCropByPriority,
} from "@times-components-native/utils";
import Context from "@times-components-native/context";
import ArticleHeader from "./article-header/article-header";
import {
  articleDefaultProps,
  articlePropTypes,
} from "./article-prop-types/article-prop-types";
import Meta from "./article-meta/article-meta";
import styles from "./styles";

class ArticleInDepth extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader({ width }) {
    const {
      article,
      onAuthorPress,
      onImagePress,
      onTooltipPresented,
      onVideoPress,
      tooltips,
    } = this.props;
    const {
      backgroundColour,
      bylines,
      expirableFlags,
      hasVideo,
      headline,
      label,
      longRead,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
      textColour,
    } = article;

    const withBylineTooltip =
      hasBylineData(bylines) && tooltips.includes("profile");

    return (
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
          <Fragment>
            <ArticleHeader
              backgroundColour={backgroundColour}
              flags={expirableFlags}
              hasVideo={hasVideo}
              headline={getHeadline(headline, shortHeadline)}
              isTablet={isTablet}
              label={label}
              longRead={longRead}
              standfirst={standfirst}
              textColour={textColour}
            />
            <ArticleLeadAsset
              {...getLeadAsset(article)}
              getImageCrop={getCropByPriority}
              onImagePress={onImagePress}
              onVideoPress={onVideoPress}
              renderCaption={({ caption }) =>
                caption && caption.text && <CentredCaption {...caption} />
              }
              style={[styles.leadAsset, isTablet && styles.leadAssetTablet]}
              width={width}
              extraContent={getAllArticleImages(article)}
            />
            <View
              style={[
                styles.metaContainer,
                isTablet && styles.metaContainerTablet,
                withBylineTooltip && styles.metaContainerWithMargin,
              ]}
            >
              <Meta
                backgroundColour={backgroundColour}
                bylines={bylines}
                isTablet={isTablet}
                onAuthorPress={onAuthorPress}
                onTooltipPresented={onTooltipPresented}
                publicationName={publicationName}
                publishedTime={publishedTime}
                textColour={textColour}
                tooltips={tooltips}
              />
            </View>
          </Fragment>
        )}
      </ResponsiveContext.Consumer>
    );
  }

  render() {
    const { error, refetch, isLoading } = this.props;

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
      onViewed,
      receiveChildList,
    } = this.props;

    return (
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
          <Context.Consumer>
            {({ theme: { scale, dropCapFont } }) => (
              <ArticleSkeleton
                adConfig={adConfig}
                analyticsStream={analyticsStream}
                data={article}
                dropCapFont={dropCapFont}
                Header={this.renderHeader}
                interactiveConfig={interactiveConfig}
                isTablet={isTablet}
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
                onViewableItemsChanged={
                  onViewed ? this.onViewableItemsChanged : null
                }
                receiveChildList={receiveChildList}
                scale={scale}
              />
            )}
          </Context.Consumer>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

ArticleInDepth.propTypes = articlePropTypes;
ArticleInDepth.defaultProps = articleDefaultProps;

export default ArticleInDepth;
