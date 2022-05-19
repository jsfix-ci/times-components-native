import React from "react";
import { Text } from "react-native";

function Txt({ children, style, ...rest }) {
  const setFontSize = (styleObject) => {
    const style = { ...styleObject };
    if (style.fontSize !== undefined && style.lineHeight !== undefined) {
      style.fontSize = style.fontSize * 2;
      style.lineHeight = style.lineHeight * 2;
    }
    return style;
  };

  const getStyleObject = (style) => {
    let styleObject = {};
    if (style === undefined || style === null) {
      return styleObject;
    }
    //
    if (style.constructor === Array) {
      styleObject = style.reduce((s, obj) => {
        return { ...s, ...obj };
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
