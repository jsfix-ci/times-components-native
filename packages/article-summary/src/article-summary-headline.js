import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { Text as Txt } from "@times-components-native/text";
import styles from "./styles";

const { style: TextStylePropTypes } = Text.propTypes;

const ArticleSummaryHeadline = ({
  allowFontScaling,
  className,
  headline,
  style,
}) => (
  <Txt
    allowFontScaling={allowFontScaling}
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
  allowFontScaling: PropTypes.bool,
  className: PropTypes.string,
  headline: PropTypes.string.isRequired,
  style: TextStylePropTypes,
};

ArticleSummaryHeadline.defaultProps = {
  allowFontScaling: true,
  className: "",
  style: {},
};

export default ArticleSummaryHeadline;
