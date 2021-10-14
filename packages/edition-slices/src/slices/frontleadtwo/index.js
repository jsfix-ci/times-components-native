import React, { useState } from "react";
import {
  Button,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import {
  TileGFront,
  TileHFront,
} from "@times-components-native/edition-slices/src/tiles";
import InTodaysEdition from "@times-components-native/in-todays-edition";

// import { useResponsiveContext } from "@times-components-native/responsive";
//import { Orientation } from "@times-components-native/responsive/src/types";

const FrontLeadTwo = (props) => {
  console.log("PROPS: ", props);
  console.log();
  const { width, fontScale } = useWindowDimensions();

  const getLayout = () => {
    const breakpoint = width / fontScale;
    // default layout - fontScale @ 1
    const layout = {
      colSize: "100%",
      inTodaySize: "100%",
      direction: "column",
      size: "small",
    };

    if (breakpoint > 600 && breakpoint < 1080) {
      layout.colSize = "50%";
      layout.direction = "row";
      layout.size = "medium";
    }

    if (breakpoint >= 1080) {
      layout.colSize = "35%";
      layout.direction = "row";
      layout.inTodaySize = "30%";
      layout.size = "large";
    }

    return layout;
  };

  const layout = getLayout();

  const {
    onPress,
    onLinkPress,
    inTodaysEditionSlice: { items: inTodaysEditionItems = [] },
  } = props;

  const getInToday = (direction) => (
    <View style={{ backgroundColor: "violet", width: "100%", height: 100 }}>
      <InTodaysEdition
        items={inTodaysEditionItems}
        onArticlePress={onPress}
        onLinkPress={onLinkPress}
        orientation={"portrait"}
        direction={direction}
      />
    </View>
  );

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
          <TileHFront
            onPress={onPress}
            tile={props.slice.lead1}
            tileName="lead1"
            orientation={"portrait"}
          />
        </View>
        <View style={{ backgroundColor: "purple", width: layout.colSize }}>
          <TileGFront
            onPress={onPress}
            tile={props.slice.lead2}
            tileName="lead2"
            orientation={"portrait"}
          />
        </View>
        <View style={{ width: layout.inTodaySize }}>
          {layout.size === "large" ? getInToday("column") : null}
        </View>
      </View>
      {layout.size !== "large" ? getInToday("row") : null}
    </ScrollView>
  );
};

export default FrontLeadTwo;
