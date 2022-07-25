import React, { useEffect, useState, ReactNode } from "react";
import {
  Animated,
  Platform,
  StyleProp,
  TextStyle,
  ViewStyle,
  View,
} from "react-native";
import {
  default as ArticleSummaryComponent,
  ArticleSummaryContent,
  ArticleSummaryHeadline,
  ArticleSummaryStrapline,
} from "@times-components-native/article-summary";
import {
  BylineInput,
  Markup,
  Tile,
} from "@times-components-native/fixture-generator/src/types";

import { ArticleFlags } from "@times-components-native/article-flag";
import {
  colours,
  ARTICLE_READ_ANIMATION,
} from "@times-components-native/styleguide/index";
import PositionedTileStar from "./positioned-tile-star";
import { OnArticlePress } from "@times-components-native/types";

type ArticleRead = {
  id: string;
  highlight: boolean;
};

type ArticleReadState = {
  read: boolean;
  animate: boolean;
};

type MarkAsReadProps = {
  articleReadState: ArticleReadState;
  children: ReactNode;
  opacityAnimation: Animated.Value;
  opacity: number;
};

interface Props {
  bylines?: BylineInput[];
  bylineStyle?: StyleProp<ViewStyle>;
  bylineOnTop: boolean;
  flagColour?: any;
  flagsStyle?: StyleProp<ViewStyle>;
  headlineStyle?: StyleProp<TextStyle>;
  labelColour?: string;
  linesOfTeaserToRender?: number;
  readArticles: ArticleRead[] | null;
  strapline?: string;
  straplineStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  summary?: Markup;
  summaryStyle?: any;
  tile: Tile;
  withStar?: boolean;
  underneathTextStar?: boolean;
  centeredStar?: boolean;
  isDarkStar?: boolean;
  starStyle?: StyleProp<ViewStyle>;
  hideLabel?: boolean;
  whiteSpaceHeight?: number;
  bullets?: string[];
  onPress?: OnArticlePress | (() => null);
}

export const getArticleReadState = (
  readArticles: Array<ArticleRead> | null,
  articleId: string,
  isLive: boolean = false,
): ArticleReadState => {
  // override read state whilst article is LIVE
  if (isLive) {
    return {
      read: false,
      animate: false,
    };
  }
  return {
    read: readArticles?.some((obj) => obj.id === articleId) ?? false,
    animate:
      readArticles?.some((obj) => obj.highlight && obj.id === articleId) ??
      false,
  };
};

export const MarkAsRead = ({
  children,
  articleReadState,
  opacityAnimation,
  opacity,
}: MarkAsReadProps) => (
  <>
    {articleReadState.animate ? (
      <Animated.View
        style={{
          opacity: opacityAnimation,
        }}
      >
        {children}
      </Animated.View>
    ) : articleReadState.read ? (
      <View style={{ opacity }}>{children}</View>
    ) : (
      children
    )}
  </>
);

const ArticleSummary: React.FC<Props> = ({
  bylines,
  bylineStyle,
  bylineOnTop = false,
  flagColour = {},
  flagsStyle,
  headlineStyle,
  labelColour,
  linesOfTeaserToRender,
  readArticles,
  strapline,
  straplineStyle,
  style,
  summary,
  summaryStyle,
  tile,
  withStar = true,
  whiteSpaceHeight,
  underneathTextStar = false,
  centeredStar = false,
  isDarkStar = false,
  starStyle,
  hideLabel = false,
  bullets = [],
  onPress = () => null,
}) => {
  const {
    headline: overrideHeadline,
    article: {
      expirableFlags,
      hasVideo,
      headline,
      shortHeadline,
      label,
      section,
      id,
    },
  } = tile;

  const sharedTimingConfig = {
    delay: ARTICLE_READ_ANIMATION.DELAY,
    duration: ARTICLE_READ_ANIMATION.DURATION,
    useNativeDriver: Platform.OS === "ios",
  };

  const articleReadOpacity = {
    standard: 0.57,
    summary: 0.7,
  };

  const [standardOpacity] = useState(new Animated.Value(1));
  const [straplineOpacity] = useState(new Animated.Value(1));
  const [summaryOpacity] = useState(new Animated.Value(1));

  const getIsLiveState = () => {
    const isLive = false;
    if (expirableFlags && expirableFlags.length) {
      const hasLiveFlag = expirableFlags.filter((flag) => {
        if (flag) {
          return flag?.type === "LIVE";
        }
        return false;
      });
      return hasLiveFlag.length > 0;
    }

    return isLive;
  };

  const articleReadState = getArticleReadState(
    readArticles,
    id,
    getIsLiveState(),
  );

  useEffect(() => {
    if (!articleReadState.animate) return;

    Animated.parallel([
      Animated.timing(standardOpacity, {
        ...sharedTimingConfig,
        toValue: articleReadOpacity.standard,
      }),
      Animated.timing(straplineOpacity, {
        ...sharedTimingConfig,
        toValue: articleReadOpacity.standard,
      }),
      Animated.timing(summaryOpacity, {
        ...sharedTimingConfig,
        toValue: articleReadOpacity.summary,
      }),
    ]).start();
  }, [articleReadState.animate]);

  const renderContent = (articleReadState: ArticleReadState) => (
    <MarkAsRead
      articleReadState={articleReadState}
      opacityAnimation={summaryOpacity}
      opacity={articleReadOpacity.summary}
    >
      <ArticleSummaryContent
        ast={summary}
        style={summaryStyle}
        lineHeight={(summaryStyle && summaryStyle.lineHeight) || undefined}
        whiteSpaceHeight={whiteSpaceHeight}
        initialLines={linesOfTeaserToRender}
      />
    </MarkAsRead>
  );

  const renderFlags = (articleReadState: ArticleReadState) => {
    return (
      <MarkAsRead
        articleReadState={articleReadState}
        opacityAnimation={standardOpacity}
        opacity={articleReadOpacity.standard}
      >
        <ArticleFlags
          {...flagColour}
          style={flagsStyle}
          flags={expirableFlags}
        />
      </MarkAsRead>
    );
  };

  const renderSaveStar = () => (
    <PositionedTileStar
      articleId={id}
      isDarkStar={isDarkStar}
      centeredStar={centeredStar}
      underneathTextStar={underneathTextStar}
      style={starStyle}
      headline={headline}
    />
  );

  const renderHeadline = (articleReadState: ArticleReadState) => {
    /**
     * Order of precedence for the tile headline
     * 1. 'Override' headline (if present)
     * 2. Article short headline (default)
     * 3. Article headline (fallback)
     */
    const headlineToDisplay =
      overrideHeadline || shortHeadline || headline || "";

    return (
      <MarkAsRead
        articleReadState={articleReadState}
        opacityAnimation={standardOpacity}
        opacity={articleReadOpacity.standard}
      >
        <ArticleSummaryHeadline
          headline={headlineToDisplay}
          style={headlineStyle}
        />
      </MarkAsRead>
    );
  };

  const renderStrapline = (articleReadState: ArticleReadState) =>
    strapline && (
      <MarkAsRead
        articleReadState={articleReadState}
        opacityAnimation={straplineOpacity}
        opacity={articleReadOpacity.standard}
      >
        <ArticleSummaryStrapline strapline={strapline} style={straplineStyle} />
      </MarkAsRead>
    );

  return (
    <ArticleSummaryComponent
      articleReadState={articleReadState}
      bylineProps={bylines ? { ast: bylines, bylineStyle, bylineOnTop } : null}
      content={summary && renderContent(articleReadState)}
      flags={renderFlags(articleReadState)}
      headline={renderHeadline(articleReadState)}
      labelProps={{
        color:
          labelColour ||
          (section && colours.section[section]) ||
          colours.section.default,
        isVideo: hasVideo,
        title: label,
        hide: hideLabel,
      }}
      strapline={renderStrapline(articleReadState)}
      saveStar={withStar && renderSaveStar()}
      style={style}
      center={!!centeredStar}
      bullets={bullets}
      onPress={onPress}
    />
  );
};

export default ArticleSummary;
