import React from "react";
import { Text, View } from "react-native";
import { getStyles } from "./styles";
import Item from "./item";
import { useResponsiveContext } from "@times-components-native/responsive";

export type LinkType = {
  url: string;
};

export type ArticleLinkType = {
  articleId: string;
};

export type PuffMainLinkRef = ArticleLinkType | LinkType;

export type ItemType = {
  id: string;
  title: string;
  strapline: string;
  mainLink: PuffMainLinkRef;
  orientation: string;
};

type TDirection = "row" | "column";

interface Props {
  items: [ItemType];
  onArticlePress: <T = unknown, R = unknown>(args?: T) => R;
  onLinkPress: <T = unknown, R = unknown>(args?: T) => R;
  direction: TDirection;
}

const headingText = "IN TODAY'S EDITION";

const InTodaysEdition: React.FC<Props> = ({
  items,
  onArticlePress,
  onLinkPress,
  direction,
}) => {
  if (!items.length) return null;
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.heading}>{headingText}</Text>
      </View>
      <View style={[styles.itemsContainer, { flexDirection: direction }]}>
        {items.map((item, index) => (
          <Item
            direction={direction}
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            onArticlePress={onArticlePress}
            onLinkPress={onLinkPress}
          />
        ))}
      </View>
    </View>
  );
};

export default InTodaysEdition;
