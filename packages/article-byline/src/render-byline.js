/* eslint-disable react/prop-types */
import React from "react";
import { Text } from "react-native";
import renderTrees from "@times-components-native/markup-forest";
import renderers from "@times-components-native/markup";

const bylineRenderers = (Component, textStyle, props = {}) => ({
  ...renderers,
  author(key, attributes, children) {
    return (
      <Component key={key} name={children[0]} {...attributes} {...props}>
        {children}
      </Component>
    );
  },

  inline(key, attributes, children) {
    const { className, bylineStyle } = props;
    return (
      <Text className={className} key={key} style={[textStyle, bylineStyle]}>
        {children}
      </Text>
    );
  },
});

const renderByline = (Component, ast, textStyle, props = {}) => {
  const bylineAst = ast.map(bylineObj =>
    bylineObj.byline && bylineObj.byline.length > 0 ? bylineObj.byline[0] : {},
  );
  const trees = renderTrees(
    bylineAst,
    bylineRenderers(Component, textStyle, props),
  );
  return (
    <Text testID={"author"} style={textStyle}>
      {trees}
    </Text>
  );
};

export default renderByline;
