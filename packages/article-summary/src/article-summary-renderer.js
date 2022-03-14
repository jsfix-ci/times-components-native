import React from "react";
import coreRenderers from "@times-components-native/markup";
import { Text } from "react-native";

const renderer = {
  ...coreRenderers,
  link(key, attributes, renderedChildren) {
    return <Text key={key}>{renderedChildren}</Text>;
  },
  paragraph(key, attributes, renderedChildren, index) {
    const padding = renderedChildren.length && index !== 0 ? " " : "";
    return (
      <Text key={key} maxFontSizeMultiplier={2} minimumFontScale={0.7}>
        {padding}
        {renderedChildren}
      </Text>
    );
  },
  teaser(key, { isSingle }, renderedChildren) {
    const padding = isSingle ? "" : " ";
    return (
      <Text key={key} maxFontSizeMultiplier={2} minimumFontScale={0.7}>
        {padding}
        {renderedChildren}
        ...
      </Text>
    );
  },
};

export default renderer;
