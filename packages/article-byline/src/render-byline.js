/* eslint-disable react/prop-types */
import React from "react";
import { Text } from "react-native";
import renderTrees from "@times-components-native/markup-forest";
import renderers from "@times-components-native/markup";
import Context from "@times-components-native/context";

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
      <Context.Consumer>
        {({ maxFontSizeMultiplier, minimumFontScale }) => (
          <Text
            className={className}
            key={key}
            style={[textStyle, bylineStyle]}
            maxFontSizeMultiplier={maxFontSizeMultiplier}
            minimumFontScale={minimumFontScale}
          >
            {children}
          </Text>
        )}
      </Context.Consumer>
    );
  },
});

const renderByline = (Component, ast, textStyle, props = {}) => {
  const bylineAst = ast.map((bylineObj) =>
    bylineObj.byline && bylineObj.byline.length > 0 ? bylineObj.byline[0] : {},
  );
  const trees = renderTrees(
    bylineAst,
    bylineRenderers(Component, textStyle, props),
  );
  return (
    <Text
      testID={"author"}
      style={textStyle}
      maxFontSizeMultiplier={2}
      minimumFontScale={0.7}
    >
      {trees}
    </Text>
  );
};

export default renderByline;
