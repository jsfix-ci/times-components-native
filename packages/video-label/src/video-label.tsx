import React, { FC } from "react";
import { View } from "react-native";
import { Text } from "@times-components-native/text";
import { IconVideo } from "@times-components-native/icons";
import styles from "./style";

export interface VideoLabel {
  allowFontScaling?: boolean;
  color?: string;
  title?: string;
  childTestID?: string;
}

const VideoLabel: FC<VideoLabel> = ({
  allowFontScaling = true,
  color = "black",
  title = "",
  childTestID,
}) => (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      <IconVideo fillColour={color} height={9} />
    </View>
    <Text
      allowFontScaling={allowFontScaling}
      testID={childTestID}
      style={[styles.title, { color }]}
    >
      {title ? title.toUpperCase() : "VIDEO"}
    </Text>
  </View>
);

export default VideoLabel;
