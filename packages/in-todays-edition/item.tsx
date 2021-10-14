/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { View, Text } from "react-native";
import Link from "@times-components-native/link";
import { IconForwardArrow } from "@times-components-native/icons";
import { colours } from "@times-components-native/styleguide";
import { getStyles } from "./styles";
import { ItemType, LinkType, ArticleLinkType } from "./in-todays-edition";
import withTrackingEvents from "./tracking-events";
import { useResponsiveContext } from "@times-components-native/responsive";

type TDirection = "row" | "column";
interface Props {
  item: ItemType;
  index: number;
  onArticlePress: <T = unknown, R = unknown>(args?: T) => R;
  onLinkPress: <T = unknown, R = unknown>(args?: T) => R;
  orientation: string;
  direction: TDirection;
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
  const styles = getStyles();
  const link = item.mainLink;
  const ctaText = isArticleLink(link) ? "Read the full story" : "Take me there";
  const onPress = isArticleLink(link)
    ? () =>
        onArticlePress({
          id: (item.mainLink as ArticleLinkType).articleId,
          isPuff: true,
        })
    : () => onLinkPress({ url: (item.mainLink as LinkType).url });

  console.log("direction: ", direction);

  const linkStyles = direction === "column" ? {} : { flex: 1 };

  return (
    <>
      <Link
        linkStyle={[styles.item, index === 3 && styles.itemLast, linkStyles]}
        key={item.id}
        onPress={onPress}
      >
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemStrapline}>{item.strapline}</Text>
        {direction === "row" && (
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
      {index !== 3 && <View style={styles.divider}></View>}
    </>
  );
};

export default withTrackingEvents(Item);
