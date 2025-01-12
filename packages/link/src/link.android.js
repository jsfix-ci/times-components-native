import React from "react";
import { TouchableNativeFeedback, View } from "react-native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import PropTypes from "prop-types";

const Link = ({ children, linkStyle, onPress, disabled }) => (
  <TouchableNativeFeedback
    delayPressIn={100}
    disabled={disabled}
    onPress={onPress}
    useForeground={TouchableNativeFeedback.canUseNativeForeground()}
  >
    <View style={linkStyle}>{children}</View>
  </TouchableNativeFeedback>
);

const { style: ViewPropTypesStyle } = ViewPropTypes;

Link.propTypes = {
  disabled: PropTypes.bool,
  linkStyle: ViewPropTypesStyle,
  onPress: PropTypes.func.isRequired,
};

Link.defaultProps = {
  disabled: false,
  linkStyle: {},
};

export default Link;
export { default as TextLink } from "./text-link";
