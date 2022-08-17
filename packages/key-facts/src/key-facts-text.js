import React from "react";
import { NativeModules, Platform, Text } from "react-native";
import { TextLink } from "@times-components-native/link";
import { renderTree } from "@times-components-native/markup-forest";
import coreRenderers from "@times-components-native/markup";
import { defaultProps, propTypes } from "./key-facts-text-prop-types";
import styles from "./styles";

const { ArticleEvents } = NativeModules;

const KeyFactsText = ({ item, listIndex, onLinkPress, fontStyle = {} }) => (
  <Text style={[styles.text, fontStyle]}>
    {item.children.map((data, listItemIndex) =>
      renderTree(
        data,
        {
          ...coreRenderers,
          link(key, attributes, renderedChildren) {
            const { canonicalId, href: url, type } = attributes;

            if (Platform.OS === "android" && !ArticleEvents.scrollToY) {
              return <Text key={key}>{renderedChildren}</Text>;
            } else {
              return (
                <TextLink
                  key={key}
                  onPress={(e) =>
                    onLinkPress(e, {
                      canonicalId,
                      type,
                      url,
                    })
                  }
                  url={url}
                >
                  {renderedChildren}
                </TextLink>
              );
            }
          },
        },
        `key-facts-${listIndex}-${listItemIndex}`,
      ),
    )}
  </Text>
);

KeyFactsText.propTypes = propTypes;
KeyFactsText.defaultProps = defaultProps;

export default KeyFactsText;
