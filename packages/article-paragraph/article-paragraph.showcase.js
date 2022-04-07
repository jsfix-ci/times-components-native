/* eslint-disable react/prop-types */
import React from "react";
import { ContextProviderWithDefaults } from "@times-components-native/context";
import Context from "@times-components-native/context";
import coreRenderers from "@times-components-native/markup";
import { renderTree } from "@times-components-native/markup-forest";
import { scales } from "@times-components-native/styleguide";
import paragraphData from "./fixtures/paragraph-showcase.json";
import ArticleParagraph from "./src";
import { Text } from "react-native";

const renderParagraphWithScale = ({ select }, ast) => {
  const scale = select("Scale", scales, scales.medium);

  return (
    <ContextProviderWithDefaults value={{ theme: { scale } }}>
      {renderTree(ast, {
        ...coreRenderers,
        paragraph(key, attributes, children, indx, node) {
          return (
            <Context.Consumer>
              {({ maxFontSizeMultiplier, minimumFontScale }) => {
                <ArticleParagraph ast={node} key={indx} uid={indx}>
                  <Text
                    maxFontSizeMultiplier={maxFontSizeMultiplier}
                    minimumFontScale={minimumFontScale}
                  >
                    {children}
                  </Text>
                </ArticleParagraph>;
              }}
            </Context.Consumer>
          );
        },
      })}
    </ContextProviderWithDefaults>
  );
};

export default {
  children: [
    {
      component: ({ select }) =>
        renderParagraphWithScale({ select }, paragraphData),
      name: "Paragraph",
      platform: "native",
      type: "story",
    },
  ],
  name: "Primitives/Article Paragraph",
};
