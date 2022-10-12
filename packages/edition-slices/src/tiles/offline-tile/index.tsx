import * as React from "react";
import { View } from "react-native";
import { Text } from "@times-components-native/text";
import { IconNoInternet } from "@times-components-native/icons";

function OfflineTile() {
  return (
    <View
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        height: "100%",
        position: "absolute",
        width: "100%",
      }}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#FFEECC",
          borderRadius: 16,
          bottom: 16,
          height: 32,
          justifyContent: "center",
          paddingHorizontal: 12,
          position: "absolute",
          right: 16,
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <IconNoInternet style={{ marginRight: 8 }} />
          <Text>Unavailable offline</Text>
        </View>
      </View>
    </View>
  );
}

export default OfflineTile;
