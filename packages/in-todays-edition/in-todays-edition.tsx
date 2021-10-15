import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import Item from "./item";

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
};

type TDirection = "row" | "column";
type TSize = "small" | "medium" | "large";

interface Props {
  items: [ItemType];
  onArticlePress: <T = unknown, R = unknown>(args?: T) => R;
  onLinkPress: <T = unknown, R = unknown>(args?: T) => R;
  direction: TDirection;
  size: TSize;
}

const headingText = "IN TODAY'S EDITION";

const InTodaysEdition: React.FC<Props> = ({
  items,
  onArticlePress,
  onLinkPress,
  direction,
  size,
}) => {
  if (!items.length) return null;

  const getWidth = () => {
    let width = "100%";
    if (direction === "column") {
      return width;
    }
    switch (size) {
      case "small":
        width = "50%";
        break;
      default:
        width = "25%";
    }

    return width;
  };
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.heading}>{headingText}</Text>
      </View>
      <View
        style={[
          styles.itemsContainer,
          { flex: 1, flexDirection: direction, flexWrap: "wrap" },
        ]}
      >
        {items.map((item, index) => (
          <View style={{ width: getWidth() }} key={`${item.id}-${index}`}>
            <Item
              direction={direction}
              // key={`${item.id}-${index}`}
              item={item}
              index={index}
              onArticlePress={onArticlePress}
              onLinkPress={onLinkPress}
            />
          </View>
        ))}
      </View>
    </>
  );
};

export default InTodaysEdition;
