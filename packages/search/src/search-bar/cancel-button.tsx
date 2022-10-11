import React, { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Text } from "@times-components-native/text";
import { styles } from "./styles/cancel-button-styles";
import { colours } from "@times-components-native/styleguide";

export interface CancelButtonProps {
  onPress: TouchableOpacityProps["onPress"];
  isConnected: boolean | null;
  testIDProp: string;
}

const CancelButton: FC<CancelButtonProps> = ({
  onPress,
  isConnected,
  testIDProp,
}) => (
  <View style={styles.cancelContainer}>
    <TouchableOpacity
      onPress={onPress}
      disabled={!isConnected}
      testID={testIDProp}
    >
      <Text
        style={[
          styles.cancel,
          {
            color: isConnected
              ? colours.functional.black
              : colours.functional.offlineSearchText,
          },
        ]}
      >
        Cancel
      </Text>
    </TouchableOpacity>
  </View>
);

export default CancelButton;
