/* eslint-disable prefer-destructuring */
import React from "react";
import { Text as RNText, TextComponent, TextStyle } from "react-native";

interface TextProps {
  children: string | TextComponent;
  style: TextStyle;
}

const Text = ({ children, style = {} }: TextProps) => (
  <RNText style={{ fontSize: 20, ...style }}>{children}</RNText>
);

export default Text;
