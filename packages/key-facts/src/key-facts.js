import React from "react";
import { Text, View } from "react-native";
import Context from "@times-components-native/context";
import styleguide from "@times-components-native/styleguide";
import KeyFactsText from "./key-facts-text";
import KeyFactsWrapper from "./key-facts-wrapper";
import { defaultProps, propTypes } from "./key-facts-prop-types";
import styles from "./styles";

const KeyFacts = ({ ast, onLinkPress, scrollToRef }) => {
  const {
    children,
    attributes: { title },
  } = ast;
  const { children: keyFactsItems } = children[0];

  /**
   * Triggers scrollTo ref in article-skeleton if the
   * key fact link has a #id as a ref
   */
  const handlePress = (e, other) => {
    if (other.url.startsWith("#")) {
      scrollToRef(other.url);
    }
    onLinkPress(e, other);
  };

  return (
    <Context.Consumer>
      {({ theme: { scale } }) => {
        const themedStyles = styleguide({ scale });
        return (
          <View style={[styles.container]}>
            {title && <Text style={styles.title}>{title}</Text>}
            <KeyFactsWrapper>
              {keyFactsItems.map((item, index) => (
                <View key={`key-facts-${index}`} style={styles.bulletContainer}>
                  <View style={[styles.bullet]} />
                  <KeyFactsText
                    fontStyle={themedStyles.fontFactory({
                      font: "body",
                      fontSize: "secondary",
                    })}
                    item={item}
                    listIndex={index}
                    onLinkPress={handlePress}
                  />
                </View>
              ))}
            </KeyFactsWrapper>
          </View>
        );
      }}
    </Context.Consumer>
  );
};

KeyFacts.propTypes = propTypes;
KeyFacts.defaultProps = defaultProps;

export default KeyFacts;
