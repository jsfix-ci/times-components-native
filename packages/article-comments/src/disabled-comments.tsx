import React, { FC } from "react";
import { Text, TextProps, View } from "react-native";
import { TextLink } from "@times-components-native/link";
import Context from "@times-components-native/context";
import styles from "./styles";

type Props = {
  onCommentGuidelinesPress: TextProps["onPress"];
};

const DisabledComments: FC<Props> = ({ onCommentGuidelinesPress }) => (
  <Context.Consumer>
    {({ maxFontSizeMultiplier, minimumFontScale }) => (
      <View style={styles.container}>
        <Text
          style={styles.headline}
          maxFontSizeMultiplier={maxFontSizeMultiplier}
          minimumFontScale={minimumFontScale}
        >
          Comments for this article have been turned off
        </Text>
        <Text
          style={styles.supporting}
          maxFontSizeMultiplier={maxFontSizeMultiplier}
          minimumFontScale={minimumFontScale}
        >
          For more details, please see our {"\n"}
          <TextLink
            onPress={onCommentGuidelinesPress}
            style={styles.link}
            target={null}
            url={null}
          >
            community guidelines
          </TextLink>
        </Text>
      </View>
    )}
  </Context.Consumer>
);

export default DisabledComments;
