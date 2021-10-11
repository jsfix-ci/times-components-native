import React from "react";
import { ScrollView, Text, View } from "react-native";

import { TabletContentContainer } from "../shared";
import HorizontalLayout from "../horizontallayout";
import { getStyles } from "./styles";
import { useResponsiveContext } from "@times-components-native/responsive";

const FrontLeadTwoSlice = ({ orientation, lead1, lead2, inTodaysEdition }) => {
  // const { windowWidth, windowHeight } = useResponsiveContext();
  // const styles = getStyles(orientation, windowWidth, windowHeight);

  const getInToday = (layout) =>
    layout === orientation ? (
      <View style={{ backgroundColor: "violet", width: "100%", height: 100 }} />
    ) : null;

  const getTileSize = () => (orientation === "landscape" ? "35%" : "50%");

  const tileSize = getTileSize();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "pink",
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={{ backgroundColor: "orange", width: tileSize }}>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
          <Text style={{ fontSize: 32 }}>x</Text>
        </View>
        <View style={{ backgroundColor: "purple", width: tileSize }} />
        <View style={{ width: "30%" }}>{getInToday("landscape")}</View>
      </View>
      {getInToday("portrait")}
    </ScrollView>
  );
};

export default FrontLeadTwoSlice;
