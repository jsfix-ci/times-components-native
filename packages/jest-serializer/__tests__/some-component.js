import React from "react";
import { View } from "react-native";
import { Text } from "@times-components-native/text";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import PropTypes from "prop-types";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const SomeComponent = ({ style, children }) => (
  <View style={style}>
    {children}
    <Text>deeply nested</Text>
  </View>
);

SomeComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  style: ViewPropTypesStyle,
};

SomeComponent.defaultProps = {
  style: null,
};

export default SomeComponent;
