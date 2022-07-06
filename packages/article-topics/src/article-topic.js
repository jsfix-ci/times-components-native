import React from "react";
import Context from "@times-components-native/context";
import { Text, View } from "react-native";
import Link from "@times-components-native/link";
import { withTrackEvents } from "@times-components-native/tracking";
import styles from "./styles";
import { topicDefaultProps, topicPropTypes } from "./article-topic-prop-types";

const ArticleTopic = ({ fontSize, lineHeight, name, onPress, slug }) => {
  const fontSizeStyle = fontSize ? { fontSize } : null;
  const lineHeightStyle = lineHeight ? { lineHeight } : null;

  const articleTopic = (
    <Context.Consumer>
      {({ makeTopicUrl }) => (
        <View style={styles.spacer}>
          <Link
            onPress={(e) => onPress(e, { name, slug })}
            url={makeTopicUrl({ slug })}
            testIDProp="topic"
          >
            <View style={[styles.container, styles.borderHighlight]}>
              <Text
                accessibilityComponentType="button"
                accessibilityRole="button"
                accessibilityTraits="button"
                style={[styles.text, fontSizeStyle, lineHeightStyle]}
              >
                {name}
              </Text>
            </View>
          </Link>
        </View>
      )}
    </Context.Consumer>
  );

  return articleTopic;
};

ArticleTopic.propTypes = topicPropTypes;
ArticleTopic.defaultProps = topicDefaultProps;

export default withTrackEvents(ArticleTopic, {
  analyticsEvents: [
    {
      actionName: "Pressed",
      eventName: "onPress",
      getAttrs: ({ name, slug }) => ({
        name,
        slug,
      }),
      trackingName: "TopicLink",
    },
  ],
});
