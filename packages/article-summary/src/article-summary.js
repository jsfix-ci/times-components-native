import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { articleBylinePropTypes } from "@times-components-native/article-byline";
import DatePublication from "@times-components-native/date-publication";

import ArticleSummaryContent from "./article-summary-content";
import ArticleSummaryHeadline from "./article-summary-headline";
import ArticleSummaryStrapline from "./article-summary-strapline";
import renderer from "./article-summary-renderer";
import styles from "./styles";
import summarise from "./summarise";
import ArticleSummaryByline from "./article-summary-byline";
import ArticleSummaryLabel from "./article-summary-label";
import Read from "@times-components-native/read";
function ArticleSummary({
  articleReadState,
  bylineProps,
  content,
  datePublicationProps,
  flags,
  headline,
  labelProps,
  style,
  strapline,
  saveStar,
  center = false,
  bullets = [],
  onPress,
}) {
  const { bylineOnTop = false } = bylineProps || {};

  const byline = bylineProps ? (
    <ArticleSummaryByline
      {...bylineProps}
      articleReadState={articleReadState}
    />
  ) : null;

  return (
    <View style={style}>
      {labelProps ? (
        <ArticleSummaryLabel
          {...labelProps}
          articleReadState={articleReadState}
        />
      ) : null}
      {bylineOnTop && byline}
      {headline}
      {strapline}
      {!articleReadState.read && flags}
      {articleReadState.read && (
        <Read
          containerStyle={{ justifyContent: center ? "center" : "flex-start" }}
        />
      )}
      {content}
      {bullets.length > 0 && (
        <View style={{ marginTop: 16 }}>
          {bullets.map((bullet, index) => {
            const key = `bullet-${index}`;
            return (
              <View key={key} style={{ flexDirection: "row", marginBottom: 8 }}>
                <View
                  style={{
                    backgroundColor: "black",
                    height: 8,
                    marginRight: 8,
                    marginTop: 6,
                    width: 8,
                  }}
                />
                <Text
                  style={{ textDecorationLine: "underline" }}
                  onPress={() => onPress({ id: bullet.id })}
                >
                  {bullet.headline}
                </Text>
              </View>
            );
          })}
        </View>
      )}
      {saveStar}
      {datePublicationProps ? (
        <DatePublication style={styles.metaText} {...datePublicationProps} />
      ) : null}
      {!bylineOnTop && byline}
    </View>
  );
}

ArticleSummary.propTypes = {
  articleReadState: PropTypes.shape({
    read: PropTypes.bool,
    animationOpacity: PropTypes.bool,
  }),
  bylineProps: PropTypes.shape({
    ...articleBylinePropTypes,
    bylineClass: PropTypes.string,
    bylineOnTop: PropTypes.bool,
  }),
  content: PropTypes.node,
  datePublicationProps: PropTypes.shape({
    date: PropTypes.string,
    publication: PropTypes.string,
  }),
  flags: PropTypes.node,
  headline: PropTypes.node,
  labelProps: PropTypes.shape({
    color: PropTypes.string,
    isVideo: PropTypes.bool,
    title: PropTypes.string,
    hide: PropTypes.bool,
  }),
  saveStar: PropTypes.node,
  strapline: PropTypes.node,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.bool,
  ]),
  onPress: PropTypes.func,
};

ArticleSummary.defaultProps = {
  articleReadState: {
    read: false,
    animate: false,
  },
  bylineProps: null,
  content: null,
  datePublicationProps: null,
  flags: null,
  headline: null,
  labelProps: {
    hide: false,
  },
  saveStar: null,
  strapline: null,
  style: null,
  onPress: () => null,
};

export {
  ArticleSummaryContent,
  ArticleSummaryHeadline,
  ArticleSummaryLabel,
  ArticleSummaryStrapline,
  renderer,
  summarise,
};

export default ArticleSummary;
