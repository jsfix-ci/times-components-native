import React from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";

// import {
//   TileGFront,
//   TileHFront,
// } from "@times-components-native/edition-slices/src/tiles";
// import InTodaysEdition from "@times-components-native/in-todays-edition";

import { useResponsiveContext } from "@times-components-native/responsive";
//import { Orientation } from "@times-components-native/responsive/src/types";

const FrontLeadTwo = (props) => {
  const { orientation } = useResponsiveContext();
  const { width, fontScale } = useWindowDimensions();
  const getInToday = (layout) =>
    layout === orientation ? (
      <View style={{ backgroundColor: "violet", width: "100%", height: 100 }}>
        <Text>IN TODAY SECTION</Text>
      </View>
    ) : null;

  const getLayout = () => {
    const breakpoint = orientation === "landscape" ? 960 : 600;
    const mediaQuery = width / fontScale;

    console.log("media Q: ", mediaQuery);
    console.log("breakpoint: ", breakpoint);

    let colSize = orientation === "landscape" ? "35%" : "50%";
    let inTodaySize = orientation === "landscape" ? "100%" : "30%";
    let direction = "row";

    if (mediaQuery < breakpoint) {
      colSize = "100%";
      inTodaySize = "100%";
      direction = "column";
    }

    return {
      colSize,
      inTodaySize,
      direction,
    };
  };

  const layout = getLayout();

  console.log("LAYOUT: ", layout);

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
      <View style={{ flexDirection: layout.direction, flex: 1 }}>
        <View style={{ backgroundColor: "orange", width: layout.colSize }}>
          <Text style={{ fontSize: 32 }}>A</Text>
          <Text style={{ fontSize: 32 }}>B</Text>
          <Text style={{ fontSize: 32 }}>C</Text>
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
        <View style={{ backgroundColor: "purple", width: layout.colSize }}>
          <Text style={{ fontSize: 32 }}>A</Text>
          <Text style={{ fontSize: 32 }}>B</Text>
          <Text style={{ fontSize: 32 }}>C</Text>
        </View>
        <View style={{ width: layout.inTodaySize }}>
          {getInToday("landscape")}
        </View>
      </View>
      {getInToday("portrait")}
    </ScrollView>
  );
};

export default FrontLeadTwo;
