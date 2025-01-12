import React from "react";
import { TouchableOpacity } from "react-native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";

import PropTypes, { string } from "prop-types";

const Link = ({
  children,
  disabled,
  linkStyle,
  onPress,
  testIDProp = null,
}) => {
  return (
    <TouchableOpacity
      delayPressIn={100}
      disabled={disabled}
      onPress={onPress}
      style={linkStyle}
      testID={testIDProp}
    >
      {children}
    </TouchableOpacity>
  );
};

const { style: ViewPropTypesStyle } = ViewPropTypes;

Link.propTypes = {
  disabled: PropTypes.bool,
  linkStyle: ViewPropTypesStyle,
  onPress: PropTypes.func.isRequired,
  testIDProp: string,
};

Link.defaultProps = {
  disabled: false,
  linkStyle: {},
};

export default Link;
export { default as TextLink } from "./text-link";
