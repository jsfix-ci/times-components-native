import React, { Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import {
  ArticleBylineWithLinks,
  hasBylineData,
} from "@times-components-native/article-byline";
import Context from "@times-components-native/context";
import DatePublication from "@times-components-native/date-publication";
import { colours } from "@times-components-native/styleguide";

import metaPropTypes from "./article-meta-prop-types";
import styles from "../styles";

const ArticleMeta = ({
  articleId,
  bylines,
  isArticleTablet,
  onAuthorPress,
  publicationName,
  publishedTime,
}) => (
  <View style={isArticleTablet && styles.metaContainerTabletFlow}>
    {hasBylineData(bylines) && (
      <Fragment>
        <View style={styles.meta}>
          <Context.Consumer>
            {({ theme: { sectionColour } }) => (
              <ArticleBylineWithLinks
                articleId={articleId}
                ast={bylines}
                color={sectionColour || colours.section.default}
                onAuthorPress={onAuthorPress}
                centered={isArticleTablet}
              />
            )}
          </Context.Consumer>
        </View>
      </Fragment>
    )}
    <View style={styles.meta}>
      <DatePublication
        style={{
          ...styles.datePublication,
          ...(isArticleTablet && styles.datePulicationTablet),
        }}
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
