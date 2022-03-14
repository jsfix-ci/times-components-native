import React from "react";
import { StyleSheet, Text } from "react-native";
import { defaultProps, propTypes } from "./text-link-prop-types";

const styles = StyleSheet.create({
  textLink: {
    textDecorationLine: "underline",
  },
});

const TextLink = ({ children, onPress, style, target, url, ...props }) => {
  const textProps = {
    ...props,
    accessibilityRole: "link",
    href: url,
    onPress,
    style: [styles.textLink].concat(style),
  };

  return target ? (
    <Text
      {...textProps}
      target={target}
      maxFontSizeMultiplier={2}
      minimumFontScale={0.7}
    >
      {children}
    </Text>
  ) : (
    <Text {...textProps} maxFontSizeMultiplier={2} minimumFontScale={0.7}>
      {children}
    </Text>
  );
};

TextLink.propTypes = propTypes;
TextLink.defaultProps = defaultProps;

export default TextLink;
