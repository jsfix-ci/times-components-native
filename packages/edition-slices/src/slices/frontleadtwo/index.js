import React from "react";
import { ScrollView } from "react-native";
import {
  TileGFront,
  TileHFront,
} from "@times-components-native/edition-slices/src/tiles";
import InTodaysEdition from "@times-components-native/in-todays-edition";
import { CHundredFifty, RowWrapper } from "@times-components-native/layouts";

const FrontLeadTwo = (props) => {
  const {
    onPress,
    onLinkPress,
    slice: { lead1, lead2 },
    inTodaysEditionSlice: { items: inTodaysEditionItems = [] },
  } = props;

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
        <CHundredFifty>
          <TileHFront
            onPress={onPress}
            tile={lead1}
            tileName="lead1"
            orientation={"portrait"}
          />
        </CHundredFifty>
        <CHundredFifty>
          <TileGFront
            onPress={onPress}
            tile={lead2}
            tileName="lead2"
            orientation={"portrait"}
          />
        </CHundredFifty>
      </RowWrapper>
      <InTodaysEdition
        direction="row"
        items={inTodaysEditionItems}
        onArticlePress={onPress}
        onLinkPress={onLinkPress}
      />
    </ScrollView>
  );
};

export default FrontLeadTwo;
