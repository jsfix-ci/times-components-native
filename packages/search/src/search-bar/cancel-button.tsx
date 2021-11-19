import React, { FC } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { styles } from "./styles/cancel-button-styles";
import { colours } from "@times-components-native/styleguide";

export interface CancelButtonProps {
  onPress: TouchableOpacityProps["onPress"];
  isConnected: boolean | null;
  testID: string;
}

const CancelButton: FC<CancelButtonProps> = ({
  onPress,
  isConnected,
  testID,
}) => (
  <View style={styles.cancelContainer}>
    <TouchableOpacity onPress={onPress} disabled={!isConnected}>
      <Text
        style={[
          styles.cancel,
          {
            color: isConnected
              ? colours.functional.black
              : colours.functional.offlineSearchText,
          },
        ]}
        testID={testID}
      >
        Cancel
      </Text>
    </TouchableOpacity>
  </View>
);

export default CancelButton;
