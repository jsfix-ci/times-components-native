import React from "react";
import { Text } from "react-native";
import { TextPropTypes } from "deprecated-react-native-prop-types";

import PropTypes from "prop-types";
import styles from "./styles";

const ArticleSummaryStrapline = ({ strapline, style, allowFontScaling }) => (
  <Text
    accessibilityRole="header"
    aria-level="4"
    style={[styles.strapline, style]}
    allowFontScaling={allowFontScaling !== false}
  >
    {strapline}
  </Text>
);

ArticleSummaryStrapline.propTypes = {
  allowFontScaling: PropTypes.bool,
  strapline: PropTypes.string.isRequired,
  style: TextPropTypes.style,
};

ArticleSummaryStrapline.defaultProps = {
  allowFontScaling: false,
  style: {},
};

export default ArticleSummaryStrapline;
