import React from "react";
import { TextPropTypes } from "deprecated-react-native-prop-types";

import { Text, Platform } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const ArticleSummaryHeadline = ({
  className,
  headline,
  style,
  allowFontScaling,
}) => (
  <Text
    testID={"article-summary-headline"}
    accessibilityRole="header"
    aria-level="3"
    allowFontScaling={
      allowFontScaling !== false ? Platform.OS === "ios" : false
    }
    className={className}
    style={[styles.headline, styles.headlineWrapper, style]}
  >
    {headline}
  </Text>
);

ArticleSummaryHeadline.propTypes = {
  allowFontScaling: PropTypes.bool,
  className: PropTypes.string,
  headline: PropTypes.string.isRequired,
  style: TextPropTypes.style,
};

ArticleSummaryHeadline.defaultProps = {
  allowFontScaling: false,
  className: "",
  style: {},
};

export default ArticleSummaryHeadline;
