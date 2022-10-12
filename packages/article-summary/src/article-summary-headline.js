import React from "react";
import { TextPropTypes } from "deprecated-react-native-prop-types";
import PropTypes from "prop-types";
import { Text as Txt } from "@times-components-native/text";
import styles from "./styles";

const { style: TextStylePropTypes } = TextPropTypes;

const ArticleSummaryHeadline = ({ className, headline, style }) => (
  <Txt
    testID={"article-summary-headline"}
    accessibilityRole="header"
    aria-level="3"
    className={className}
    style={[styles.headline, styles.headlineWrapper, style]}
  >
    {headline}
  </Txt>
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
