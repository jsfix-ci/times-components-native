import React from "react";
import { Text, TextProps } from "react-native";
import Context from "@times-components-native/context/src/context";

function Txt({ children, style, ...rest }: React.PropsWithChildren<TextProps>) {
  const setFontSize = (styleObject: any, fontScale = 1) => {
    const style = { ...styleObject };
    if (
      typeof style.fontSize === "number" &&
      typeof style.lineHeight === "number" &&
      typeof fontScale === "number"
    ) {
      style.fontSize = style.fontSize * fontScale;
      style.lineHeight = style.lineHeight * fontScale;
    }
    return style;
  };

  const getStyleObject = (style: any, fontScale = 1) => {
    let styleObject = {};
    if (style === undefined || style === null) {
      return styleObject;
    }

    if (style.constructor === Array) {
      styleObject = style.reduce((s, obj) => {
        return { ...s, ...obj };
      });
      return setFontSize(styleObject, fontScale);
    }
    return setFontSize(style, fontScale);
  };

  return (
    <Context.Consumer>
      {({ theme }) => {
        return (
          <Text
            {...rest}
            style={getStyleObject(style, theme.fontScale)}
            allowFontScaling={false}
          >
            {children}
          </Text>
        );
      }}
    </Context.Consumer>
  );
}

export default Txt;
