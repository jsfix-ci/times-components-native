import React from "react";
import { Text, TextProps } from "react-native";
import Context from "@times-components-native/context/src/context";

function Txt({ children, ...rest }: React.PropsWithChildren<TextProps>) {
  return (
    <Context.Consumer>
      {({ maxFontSizeMultiplier, minimumFontScale }) => (
        <Text
          {...rest}
          maxFontSizeMultiplier={maxFontSizeMultiplier}
          minimumFontScale={minimumFontScale}
        >
          {children}
        </Text>
      )}
    </Context.Consumer>
  );
}

export default Txt;
