import React from "react";
import { View, ViewStyle } from "react-native";
import { colours } from "@times-components-native/styleguide";
import styles from "./styles";

import ArticleFlag from "./ArticleFlag";
import DiamondArticleFlag from "./DiamondArticleFlag";
import { Flag, FlagTypes } from "./ArticleFlags.d";
import getActiveArticleFlags from "./getActiveArticleFlags";

const DEFAULT_FLAG_COLOURS = {
  NEW: colours.functional.articleFlagNew,
  UPDATED: colours.functional.articleFlagUpdated,
  EXCLUSIVE: colours.functional.articleFlagExclusive,
  SPONSORED: colours.functional.tertiary,
  LONGREAD: colours.functional.secondary,
  LIVE: colours.functional.darkRed,
  BREAKING: colours.functional.darkRed,
};

interface ArticleFlagWithPaddingType {
  color: string;
  moreThanOneFlag: boolean;
  type: FlagTypes;
}

const ArticleFlagWithPadding = ({
  moreThanOneFlag,
  type,
  color,
}: ArticleFlagWithPaddingType) => {
  const col = color || DEFAULT_FLAG_COLOURS[type];
  return (
    <View key={type} style={moreThanOneFlag && styles.flagPadding}>
      {type === "NEW" && <ArticleFlag color={col} title="new" />}
      {type === "UPDATED" && <ArticleFlag color={col} title={"updated"} />}
      {type === "EXCLUSIVE" && <ArticleFlag color={col} title="exclusive" />}
      {type === "SPONSORED" && <ArticleFlag color={col} title="sponsored" />}
      {type === "LONGREAD" && <ArticleFlag color={col} title="longread" />}
      {type === "LIVE" && <DiamondArticleFlag color={col} title={"Live"} />}
      {type === "BREAKING" && (
        <DiamondArticleFlag color={col} title={"Breaking"} />
      )}
    </View>
  );
};

interface ArticleFlagsType {
  flags?: Array<Flag>;
  longRead?: boolean;
  color: string;
  style?: ViewStyle;
  withContainer?: boolean;
}

const ArticleFlags = ({
  flags = [],
  longRead = false,
  color,
  style = {},
  withContainer = false,
}: ArticleFlagsType) => {
  const activeFlags = getActiveArticleFlags(flags);

  const allFlags = [
    ...activeFlags,
    ...(longRead ? [{ type: "LONGREAD" }] : []),
  ];

  if (!allFlags.length) return null;

  const moreThanOneFlag = allFlags.length > 1;

  const flagsView = (
    <View style={[styles.flags, style]}>
      {allFlags.map(({ type }: any) => (
        <ArticleFlagWithPadding
          key={type}
          {...{ moreThanOneFlag, type, color }}
        />
      ))}
    </View>
  );

  if (!withContainer) return flagsView;

  return <View style={styles.flagsContainer}>{flagsView}</View>;
};

export default ArticleFlags;
