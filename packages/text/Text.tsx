import React from "react";
// eslint-disable-next-line no-restricted-imports
import { Text, TextProps } from "react-native";
import { arrayToObj } from "@times-components-native/utils";
import Context from "@times-components-native/context/src/context";
import isEqual from "lodash.isequal";

const getScaledStyle = (styleObject: any, fontScale?: number) => {
  typeof fontScale !== "number" &&
    console.warn(">>>>>>>>> typeof fontScale", typeof fontScale);

  if (
    fontScale === 1 ||
    typeof fontScale !== "number" ||
    typeof styleObject !== "object"
  ) {
    return styleObject;
  }

  const result = {
    ...styleObject,
    ...(styleObject.fontSize === "number" && {
      fontSize: styleObject.fontSize * fontScale,
    }),
    ...(styleObject.lineHeight === "number" && {
      lineHeight: styleObject.lineHeight * fontScale,
    }),
  };
  if (!isEqual(styleObject, result)) {
    console.log("\n--------------Scaling up");
    console.log("previous", styleObject);
    console.log("result", result);
  }

  return result;
};

function Txt({ children, style, ...rest }: React.PropsWithChildren<TextProps>) {
  return (
    <Context.Consumer>
      {({ theme }) => (
        <Text
          {...rest}
          style={getScaledStyle(arrayToObj(style), theme.fontScale)}
          allowFontScaling={false}
        >
          {children}
        </Text>
      )}
    </Context.Consumer>
  );
}

export default Txt;
