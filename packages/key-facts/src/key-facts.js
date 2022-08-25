import React from "react";
import { Text, View } from "react-native";
import Context from "@times-components-native/context";
import styleguide from "@times-components-native/styleguide";
import KeyFactsText from "./key-facts-text";
import KeyFactsWrapper from "./key-facts-wrapper";
import { defaultProps, propTypes } from "./key-facts-prop-types";
import styles from "./styles";
import {
  withTrackEvents,
  withTrackingContext,
} from "@times-components-native/tracking";

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
    } else {
      onLinkPress(e, other);
    }
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

export default withTrackingContext(
  withTrackEvents(KeyFacts, {
    analyticsEvents: [
      {
        actionName: "click",
        eventName: "onPress",
        trackingName: "KeyMoment",
        getAttrs: ({ headline }) => ({
          article_parent_name: `${headline}`,
          event_navigation_name: `in-article component clicked : key moments : interactive`,
          event_navigation_browsing_method: "click",
        }),
      },
    ],
  }),
  {
    getAttrs: ({ headline }) => ({
      event_navigation_action: "navigation",
      event_navigation_name:
        "in-article component displayed : key moments : interactive",
      article_parent_name: `${headline}`,
      event_navigation_browsing_method: "scroll",
    }),
    trackingName: "KeyMoment",
    trackingObjectName: "KeyMoment",
  },
);
