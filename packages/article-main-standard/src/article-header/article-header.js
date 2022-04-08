import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { DateTime } from "luxon";
import {
  ArticleFlags,
  getActiveArticleFlags,
} from "@times-components-native/article-flag";
import styleguide from "@times-components-native/styleguide";
import DatePublication from "@times-components-native/date-publication";
import { Text } from "@times-components-native/text";

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
  longRead,
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
          !(hasActiveFlags || longRead || standfirst) &&
            styles.articleHeadlineSpacer,
          isArticleTablet && styles.articleHeadLineTextTablet,
        ]}
      >
        {headline}
      </Text>
      <HeaderStandfirst
        hasFlags={hasActiveFlags || longRead}
        standfirst={standfirst}
      />
      {(hasActiveFlags || longRead) && (
        <View style={styles.flags}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ArticleFlags flags={flags} longRead={longRead} />
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
  longRead: PropTypes.bool,
  standfirst: PropTypes.string,
  publishedTime: PropTypes.string,
};

ArticleHeader.defaultProps = {
  flags: [],
  hasVideo: false,
  isArticleTablet: false,
  isLive: false,
  label: null,
  longRead: false,
  standfirst: null,
  publishedTime: "",
};

export default ArticleHeader;
