import React from "react";
import { Text, TextProps } from "react-native";

function Txt({ children, style, ...rest }: React.PropsWithChildren<TextProps>) {
  const setFontSize = (styleObject) => {
    const style = { ...styleObject };
    if (style.hasOwnProperty("fontSize")) {
      style.fontSize = style.fontSize * 2;
      style.lineHeight = style.lineHeight * 2;
    }
    return style;
  };

  const getStyleObject = (style) => {
    let styleObject = {};
    if (style === undefined) {
      return styleObject;
    }
    //
    if (style.constructor === Array) {
      styleObject = style.reduce((style, obj) => {
        return { ...style, ...obj };
      });
      return setFontSize(styleObject);
    }
    return setFontSize(style);
  };

  const styleObject = getStyleObject(style);

  return (
    <Text {...rest} style={styleObject} allowFontScaling={false}>
      {children}
    </Text>
  );
}

export default Txt;
