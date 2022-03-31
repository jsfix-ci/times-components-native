import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import {
  ArticleBylineWithLinks,
  hasBylineData,
} from "@times-components-native/article-byline";
import DatePublication from "@times-components-native/date-publication";

import metaPropTypes from "./article-meta-prop-types";
import styles from "../styles";

const ArticleMeta = ({
  articleId,
  bylines,
  hasElementsAbove,
  onAuthorPress,
  publicationName,
  publishedTime,
}) => (
  <View style={[styles.metaContainer, !hasElementsAbove && styles.metaSpacer]}>
    {hasBylineData(bylines) && (
      <View style={styles.meta}>
        <ArticleBylineWithLinks
          articleId={articleId}
          ast={bylines}
          onAuthorPress={onAuthorPress}
        />
      </View>
    )}
    <View style={styles.meta}>
      <DatePublication
        style={styles.datePublication}
        date={publishedTime}
        publication={publicationName}
      />
    </View>
  </View>
);

ArticleMeta.propTypes = {
  ...metaPropTypes,
  onAuthorPress: PropTypes.func.isRequired,
};

export default ArticleMeta;
