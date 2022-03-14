import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const { style: TextStylePropTypes } = Text.propTypes;

const ArticleSummaryHeadline = ({ className, headline, style }) => (
  <Text
    testID={"article-summary-headline"}
    accessibilityRole="header"
    aria-level="3"
    className={className}
    style={[styles.headline, styles.headlineWrapper, style]}
    maxFontSizeMultiplier={2}
    minimumFontScale={0.7}
  >
    {headline}
  </Text>
);

ArticleSummaryHeadline.propTypes = {
  className: PropTypes.string,
  headline: PropTypes.string.isRequired,
  style: TextStylePropTypes,
};

ArticleSummaryHeadline.defaultProps = {
  className: "",
  style: {},
};

export default ArticleSummaryHeadline;
