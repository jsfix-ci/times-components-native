import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { Text as Txt } from "@times-components-native/text";
import styles from "./styles";

const { style: TextStylePropTypes } = Text.propTypes;

const ArticleSummaryStrapline = ({ allowFontScaling, strapline, style }) => (
  <Txt
    accessibilityRole="header"
    allowFontScaling={allowFontScaling}
    aria-level="4"
    style={[styles.strapline, style]}
  >
    {strapline}
  </Txt>
);

ArticleSummaryStrapline.propTypes = {
  allowFontScaling: PropTypes.bool,
  strapline: PropTypes.string.isRequired,
  style: TextStylePropTypes,
};

ArticleSummaryStrapline.defaultProps = {
  allowFontScaling: true,
  style: {},
};

export default ArticleSummaryStrapline;
