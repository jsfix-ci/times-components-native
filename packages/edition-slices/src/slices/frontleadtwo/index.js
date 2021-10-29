import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  TileGFront,
  TileHFront,
} from "@times-components-native/edition-slices/src/tiles";
import InTodaysEdition from "@times-components-native/in-todays-edition";
import { CHundredFifty, RowWrapper } from "@times-components-native/layouts";
import { MediaQuery } from "@times-components-native/hooks";

const FrontLeadTwo = (props) => {
  const [leftColWidth, setLeftColWidth] = useState(0);
  const [rightColWidth, setRightColWidth] = useState(0);
  const {
    onPress,
    onLinkPress,
    slice: { lead1, lead2 },
    inTodaysEditionSlice: { items: inTodaysEditionItems = [] },
  } = props;
  const screenSize = MediaQuery();
  const getLayout = () => {
    const layout = {
      direction: "column",
      width: "100%",
    };
    switch (screenSize) {
      case "EXTRA EXTRA LARGE":
      case "EXTRA LARGE":
      case "LARGE":
        layout.direction = "row";
        layout.width = "70%";

        break;
    }
    return layout;
  };

  const layout = getLayout();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      <RowWrapper>
        <View
          style={{
            width: layout.width,
            flexDirection: layout.direction,
          }}
        >
          <RowWrapper>
            <CHundredFifty>
              <View
                onLayout={(event) => {
                  setLeftColWidth(event.nativeEvent.layout.width);
                }}
              >
                <TileHFront
                  onPress={onPress}
                  tile={lead1}
                  tileName="lead1"
                  orientation={"portrait"}
                  numberOfLines={24}
                  colWidth={leftColWidth}
                />
              </View>
            </CHundredFifty>
            <CHundredFifty>
              <View
                onLayout={(event) =>
                  setRightColWidth(event.nativeEvent.layout.width)
                }
              >
                <TileGFront
                  onPress={onPress}
                  tile={lead2}
                  tileName="lead2"
                  orientation={"portrait"}
                  numberOfLines={6}
                  colWidth={rightColWidth}
                />
              </View>
            </CHundredFifty>
          </RowWrapper>
        </View>
        {layout.direction === "row" ? (
          <View style={{ width: "30%", paddingLeft: 20 }}>
            <InTodaysEdition
              direction="column"
              items={inTodaysEditionItems}
              onArticlePress={onPress}
              onLinkPress={onLinkPress}
            />
          </View>
        ) : null}
      </RowWrapper>
      {layout.direction === "column" ? (
        <InTodaysEdition
          direction="row"
          items={inTodaysEditionItems}
          onArticlePress={onPress}
          onLinkPress={onLinkPress}
        />
      ) : null}
    </ScrollView>
  );
};

export default FrontLeadTwo;
