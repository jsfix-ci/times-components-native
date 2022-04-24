import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { DateTime } from "luxon";
import {
  ArticleFlags,
  getActiveArticleFlags,
} from "@times-components-native/article-flag";
import styleguide from "@times-components-native/styleguide";
import DatePublication from "@times-components-native/date-publication";

import HeaderLabel from "../article-header-label/article-header-label";
import HeaderStandfirst from "./article-header-standfirst";
import styles from "../styles/article-header";

const ArticleHeader = ({
  flags,
  hasVideo,
  headline,
  isArticleTablet,
  isLive,
  label,
  standfirst,
  publishedTime,
}) => {
  const hasActiveFlags = getActiveArticleFlags(flags).length > 0;
  const { colours, fonts } = styleguide();

  const getLiveTimeStamp = () => {
    const pt = DateTime.fromISO(publishedTime).setLocale("en-US");
    const now = DateTime.fromISO(new Date(Date.now()).toISOString());
    const diff = now.diff(pt, ["hours"]).values.hours;

    return (
      <>
        {diff < 12 ? (
          <Text
            style={{
              color: colours.functional.secondary,
              fontFamily: fonts.supporting,
              marginHorizontal: 8,
              marginBottom: 8,
            }}
          >
            {pt.toRelative()}
          </Text>
        ) : (
          <View
            style={{
              flexDirection: "row",
              marginBottom: 8,
              marginHorizontal: 8,
            }}
          >
            <Text style={{ marginRight: 4 }}>Updated</Text>
            <DatePublication
              style={styles.datePublication}
              date={publishedTime}
              showDay={false}
            />
          </View>
        )}
      </>
    );
  };

  return (
    <View
      style={[
        styles.articleMainContentRow,
        isArticleTablet && styles.articleMainContentRowTablet,
        isArticleTablet && styles.headerTablet,
      ]}
    >
      <HeaderLabel isVideo={hasVideo} label={label} />
      <Text
        testID={"headline"}
        selectable
        style={[
          styles.articleHeadLineText,
          !(hasActiveFlags || standfirst) && styles.articleHeadlineSpacer,
          isArticleTablet && styles.articleHeadLineTextTablet,
        ]}
      >
        {headline}
      </Text>
      <HeaderStandfirst hasFlags={hasActiveFlags} standfirst={standfirst} />
      {hasActiveFlags && (
        <View style={styles.flags}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ArticleFlags flags={flags} />
            {isLive && getLiveTimeStamp()}
          </View>
        </View>
      )}
    </View>
  );
};

ArticleHeader.propTypes = {
  flags: PropTypes.arrayOf(PropTypes.string),
  hasVideo: PropTypes.bool,
  headline: PropTypes.string.isRequired,
  isArticleTablet: PropTypes.bool,
  isLive: PropTypes.bool,
  label: PropTypes.string,
  standfirst: PropTypes.string,
  publishedTime: PropTypes.string,
};

ArticleHeader.defaultProps = {
  flags: [],
  hasVideo: false,
  isArticleTablet: false,
  isLive: false,
  label: null,
  standfirst: null,
  publishedTime: "",
};

export default ArticleHeader;
