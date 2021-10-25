import React from "react";
import { Text, View } from "react-native";
import { getStyles } from "./styles";
import Item from "./item";
import { useResponsiveContext } from "@times-components-native/responsive";
import {
  RowWrapper,
  CHundredFiftyTwentyFive,
} from "@times-components-native/layouts";

export type LinkType = {
  url: string;
};

export type ArticleLinkType = {
  articleId: string;
};

export type PuffMainLinkRef = ArticleLinkType | LinkType;

type TDirection = "row" | "column";

export type ItemType = {
  id: string;
  title: string;
  strapline: string;
  mainLink: PuffMainLinkRef;
  orientation: string;
};

interface IProps {
  direction?: TDirection;
  items: [ItemType];
  onArticlePress: <T = unknown, R = unknown>(args?: T) => R;
  onLinkPress: <T = unknown, R = unknown>(args?: T) => R;
}

const headingText = "IN TODAY'S EDITION";

const InTodaysEdition: React.FC<IProps> = ({
  direction = "column",
  items,
  onArticlePress,
  onLinkPress,
  orientation,
}) => {
  if (!items.length) return null;
  return (
    <RowWrapper>
      {items.map((item, index) => (
        <CHundredFiftyTwentyFive
          key={`${item.id}-${index}`}
          responsive={direction !== "column"}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "green",
              width: "100%",
              height: 100,
            }}
          >
            <Text>Item</Text>
          </View>
          {/* // <Item
        //   key={`${item.id}-${index}`}
        //   item={item}
        //   index={index}
        //   onArticlePress={onArticlePress}
        //   onLinkPress={onLinkPress}
        //   orientation={orientation}
        // /> */}
        </CHundredFiftyTwentyFive>
      ))}
    </RowWrapper>
  );
};

export default InTodaysEdition;

{
  /* <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text allowFontScaling={false} style={styles.heading}>
          {headingText}
        </Text>
      </View>
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <Item
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            onArticlePress={onArticlePress}
            onLinkPress={onLinkPress}
            orientation={orientation}
          />
        ))}
      </View>
    </View> */
}
