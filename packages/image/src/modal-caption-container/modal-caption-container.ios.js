import React from "react";
import { Dimensions } from "react-native";
import { OverlayGradient } from "@times-components-native/gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const GRADIENT_HEIGHT = 140;
const MIN_BLACK_HEIGHT = 50;
const START_POINT = `${MIN_BLACK_HEIGHT / GRADIENT_HEIGHT}`;

function ModalCaptionContainer({ children, style, ...props }) {
  return (
    <OverlayGradient
      {...props}
      degrees={0}
      height={GRADIENT_HEIGHT}
      startPoint={START_POINT}
      style={[style, { height: GRADIENT_HEIGHT }]}
      width={Dimensions.get("window").width}
    >
      <SafeAreaView edges={["bottom", "left", "right"]}>
        {children}
      </SafeAreaView>
    </OverlayGradient>
  );
}

export default ModalCaptionContainer;
