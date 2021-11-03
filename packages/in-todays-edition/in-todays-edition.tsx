import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import Item from "./item";
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
}) => {
  if (!items.length) return null;

  return (
    <View style={[styles.container]}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{headingText}</Text>
      </View>
      <RowWrapper>
        {items.map((item, index) => (
          <CHundredFiftyTwentyFive
            key={`${item.id}-${index}`}
            responsive={direction !== "column"}
            style={{ marginBottom: 10 }}
          >
            <Item
              key={`${item.id}-${index}`}
              direction={direction}
              item={item}
              index={index}
              onArticlePress={onArticlePress}
              onLinkPress={onLinkPress}
            />
          </CHundredFiftyTwentyFive>
        ))}
      </RowWrapper>
    </View>
  );
};

export default InTodaysEdition;
