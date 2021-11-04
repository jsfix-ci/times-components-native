/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { View, Text } from "react-native";
import Link from "@times-components-native/link";
import { IconForwardArrow } from "@times-components-native/icons";
import { spacing, colours } from "@times-components-native/styleguide";
import { styles } from "./styles";
import { ItemType, LinkType, ArticleLinkType } from "./in-todays-edition";
import withTrackingEvents from "./tracking-events";
import { MediaQuery } from "@times-components-native/hooks";

type TDirection = "row" | "column";
interface Props {
  direction: TDirection;
  item: ItemType;
  index: number;
  onArticlePress: <T = unknown, R = unknown>(args?: T) => R;
  onLinkPress: <T = unknown, R = unknown>(args?: T) => R;
}

const isArticleLink = (
  link: ArticleLinkType | LinkType,
): link is ArticleLinkType => {
  // @ts-ignore
  return !!link.articleId;
};

const Item: React.FC<Props> = ({
  direction,
  item,
  index,
  onArticlePress,
  onLinkPress,
}) => {
  const link = item.mainLink;
  const ctaText = isArticleLink(link) ? "Read the full story" : "Take me there";
  const onPress = isArticleLink(link)
    ? () =>
        onArticlePress({
          id: (item.mainLink as ArticleLinkType).articleId,
          isPuff: true,
        })
    : () => onLinkPress({ url: (item.mainLink as LinkType).url });

  const screenSize = MediaQuery();

  // handle the border layout at different break points
  const getDividerStyle = (index: number) => {
    switch (screenSize) {
      case "EXTRA SMALL":
        if (index !== 3) {
          return {
            borderBottomWidth: 1,
            marginVertical: spacing(2),
          };
        }
        return {};
      case "SMALL":
        if (index % 2) {
          return {
            borderLeftWidth: 0,
          };
        }
        return {
          paddingLeft: spacing(3),
        };
      default:
        if (index !== 3) {
          return {
            borderBottomWidth: direction === "row" ? 0 : 1,
            marginBottom: direction === "row" ? 0 : spacing(2),
          };
        }
        return {};
    }
  };

  return (
    <View
      style={{
        flexDirection: screenSize === "EXTRA SMALL" ? "column" : direction,
      }}
    >
      <Link
        linkStyle={[styles.item, index === 3 && styles.itemLast]}
        key={item.id}
        onPress={onPress}
      >
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemStrapline}>{item.strapline}</Text>
        {direction === "column" && (
          <View style={styles.itemCTA}>
            <Text style={styles.itemCTAText}>{ctaText}</Text>
            <View style={styles.itemCTAIconContainer}>
              <IconForwardArrow
                fillColour={colours.functional.red}
                height={8}
              />
            </View>
          </View>
        )}
      </Link>
      <View style={[styles.divider, getDividerStyle(index)]} />
    </View>
  );
};

export default withTrackingEvents(Item);
