import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  TileAFront,
  TileBFront,
} from "@times-components-native/edition-slices/src/tiles";
import InTodaysEdition from "@times-components-native/in-todays-edition";
import {
  CHundredFiftySeventy,
  CHundredFiftyThirty,
  RowWrapper,
} from "@times-components-native/layouts";
import { MediaQuery } from "@times-components-native/hooks";

const FrontLeadOneAndOne = (props) => {
  const [leftColWidth, setLeftColWidth] = useState(0);
  const [rightColWidth, setRightColWidth] = useState(0);
  const {
    onPress,
    onLinkPress,
    slice: { lead, support },
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
            <CHundredFiftySeventy>
              <View
                onLayout={(event) => {
                  setLeftColWidth(event.nativeEvent.layout.width);
                }}
              >
                <TileAFront
                  onPress={onPress}
                  tile={lead}
                  tileName="lead"
                  orientation={"portrait"}
                  colWidth={leftColWidth}
                />
              </View>
            </CHundredFiftySeventy>
            <CHundredFiftyThirty>
              <View
                onLayout={(event) =>
                  setRightColWidth(event.nativeEvent.layout.width)
                }
              >
                <TileBFront
                  onPress={onPress}
                  tile={support}
                  tileName="support"
                  orientation={"portrait"}
                  showKeyline={true}
                  colWidth={rightColWidth}
                />
              </View>
            </CHundredFiftyThirty>
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

export default FrontLeadOneAndOne;
