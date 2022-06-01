import React from "react";
import { ResponsiveSlice } from "../shared";
import { WebviewWrapper } from "@times-components-native/interactive-wrapper";
import { spacing } from "@times-components-native/styleguide";
import { View } from "react-native";

const RenderInteractive = (interactiveConfig, id) => (
  <View
    style={{
      marginBottom: spacing(4),
    }}
  >
    <WebviewWrapper config={interactiveConfig} id={id} />
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
