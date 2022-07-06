import React from "react";
import { ResponsiveSlice } from "../shared";
import {
  InteractiveWrapper,
  WebviewWrapper
} from "@times-components-native/interactive-wrapper";
import { spacing } from "@times-components-native/styleguide";
import { Platform, View } from "react-native";

const RenderInteractive = (interactiveConfig, id) => (
  <View
    style={{
      marginBottom: spacing(4),
    }}
  >
    {Platform.OS === "android" ? (
      <InteractiveWrapper config={interactiveConfig} id={id} />
    ) : (
      <WebviewWrapper config={interactiveConfig} id={id} />
    )}
  </View>
);

const InteractiveSlice = ({ slice }) => {
  return (
    <ResponsiveSlice
      grow
      renderSmall={() => RenderInteractive(slice.interactiveConfig, slice.id)}
      renderMedium={() => RenderInteractive(slice.interactiveConfig, slice.id)}
    />
  );
};

export default InteractiveSlice;
