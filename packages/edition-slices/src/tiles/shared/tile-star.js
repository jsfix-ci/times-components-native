import React from "react";
import PropTypes from "prop-types";
import StarButton from "@times-components-native/star-button";
import { SectionContext } from "@times-components-native/context";
import withArticleSaveTracking from "./save-article-tracking-events";

const StarWithTracking = withArticleSaveTracking(
  ({ articleId, onArticleSavePress, savedArticles, isDark, style }) => {
    const disabled = !savedArticles;
    const isSaved = savedArticles && savedArticles[articleId];

    const onStarPress = () => {
      onArticleSavePress(!isSaved, articleId);
    };

    return (
      <StarButton
        style={style}
        disabled={disabled}
        isDark={isDark}
        onPress={onStarPress}
        selected={isSaved}
      />
    );
  },
);

const TileStar = ({ articleId, isDark, style, headline }) => (
  <SectionContext.Consumer>
    {({ onArticleSavePress, savedArticles }) =>
      onArticleSavePress ? (
        <StarWithTracking
          style={style}
          articleId={articleId}
          isDark={isDark}
          onArticleSavePress={onArticleSavePress}
          savedArticles={savedArticles}
          headline={headline}
        />
      ) : null
    }
  </SectionContext.Consumer>
);

TileStar.propTypes = {
  articleId: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  isDark: PropTypes.bool,
  headline: PropTypes.string,
};

TileStar.defaultProps = {
  style: null,
  isDark: false,
  headline: undefined,
};

export default TileStar;
