import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { Text as Txt } from "@times-components-native/text";
import styles from "./styles";

const { style: TextStylePropTypes } = Text.propTypes;

const ArticleSummaryStrapline = ({ strapline, style }) => (
  <Txt
    accessibilityRole="header"
    aria-level="4"
    style={[styles.strapline, style]}
  >
    {strapline}
  </Txt>
);

ArticleSummaryStrapline.propTypes = {
  strapline: PropTypes.string.isRequired,
  style: TextStylePropTypes,
};

ArticleSummaryStrapline.defaultProps = {
  style: {},
};

export default ArticleSummaryStrapline;
