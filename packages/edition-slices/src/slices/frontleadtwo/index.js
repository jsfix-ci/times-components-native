import React from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";

import {
  TileGFront,
  TileHFront,
} from "@times-components-native/edition-slices/src/tiles";
import InTodaysEdition from "@times-components-native/in-todays-edition";

const FrontLeadTwo = (props) => {
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
    <View style={{ width: "100%" }}>
      <InTodaysEdition
        items={inTodaysEditionItems}
        onArticlePress={onPress}
        onLinkPress={onLinkPress}
        direction={direction}
        size={layout.size}
      />
    </View>
  );

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: layout.direction, flex: 1 }}>
        <View style={{ width: layout.colSize, paddingHorizontal: 10 }}>
          <TileHFront
            onPress={onPress}
            tile={props.slice.lead1}
            tileName="lead1"
            orientation={"portrait"}
          />
        </View>
        <View style={{ width: layout.colSize, paddingHorizontal: 10 }}>
          <TileGFront
            onPress={onPress}
            tile={props.slice.lead2}
            tileName="lead2"
            orientation={"portrait"}
          />
        </View>
        {layout.size === "large" ? (
          <View
            style={{
              borderWidth: 1,
              borderColor: "red",
              width: layout.inTodaySize,
              flexDirection: "column",
              flex: 1,
              flexGrow: 1,
            }}
          >
            {getInToday("column")}
          </View>
        ) : null}
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        {layout.size !== "large" ? getInToday("row") : null}
      </View>
    </ScrollView>
  );
};

export default FrontLeadTwo;
