import React from "react";
import { View } from "react-native";
import {
  ArticleSummaryHeadline,
  ArticleSummaryStrapline,
} from "@times-components-native/article-summary";
import FrontArticleSummaryContent from "./front-article-summary-content";
import { Markup } from "@times-components-native/fixture-generator/src/types";
import { FrontPageByline } from "./front-page-byline";
import { PlayIcon } from "@times-components-native/video";
import { getIconSize } from "@times-components-native/video/src/play-icon";

interface Props {
  columnCount?: number;
  headlineStyle?: any;
  strapline?: string;
  straplineStyle?: any;
  containerStyle?: any;
  summary: Markup;
  summaryStyle?: any;
  tile: any;
  bylines?: Markup;
  showKeyline?: boolean;
  bylineContainerStyle?: any;
  headlineMarginBottom: number;
  straplineMarginTop: number;
  straplineMarginBottom: number;
  bylineMarginBottom: number;
  justified?: boolean;
  summaryLineHeight: number;
  hasVideo?: boolean;
  numberOfLines?: number;
  colWidth?: number;
}

const renderContent = (
  props: Props,
  {
    numberOfLines,
    contentWidth,
    contentHeight,
  }: { numberOfLines: number; contentWidth: number; contentHeight: number },
) => {
  const { summary, summaryStyle, justified, columnCount, bylines } = props;

  return (
    <FrontArticleSummaryContent
      summary={summary}
      summaryStyle={summaryStyle}
      numberOfLines={numberOfLines}
      columnCount={columnCount}
      bylines={bylines}
      contentHeight={contentHeight}
      contentWidth={contentWidth}
      justified={justified}
    />
  );
};

const renderHeadline = (props: Props) => {
  const {
    tile: {
      headline: tileHeadline,
      article: { headline, shortHeadline },
    },
    headlineStyle,
  } = props;

  return (
    <ArticleSummaryHeadline
      headline={tileHeadline || shortHeadline || headline}
      style={[headlineStyle, { marginBottom: 10 }]}
      allowFontScaling={true}
    />
  );
};

const renderStrapline = (props: Props) => {
  const { strapline, straplineStyle } = props;
  if (!strapline) return null;

  return (
    <ArticleSummaryStrapline
      strapline={strapline}
      style={[straplineStyle, { marginBottom: 10 }]}
      allowFontScaling={false}
    />
  );
};

const renderByline = (props: Props) => {
  const { bylines: ast, columnCount } = props;
  if (!ast || ast.length === 0) return null;
  if (columnCount && columnCount > 1) return null;

  return (
    <FrontPageByline
      showKeyline={props.showKeyline}
      containerStyle={[props.bylineContainerStyle, { marginBottom: 10 }]}
      byline={ast}
    />
  );
};

const FrontTileSummary: React.FC<Props> = (props) => {
  const {
    summaryLineHeight,
    hasVideo = false,
    numberOfLines = 6,
    colWidth = 300,
  } = props;

  return (
    <View>
      {renderHeadline(props)}
      {renderStrapline(props)}
      {renderByline(props)}
      {renderContent(props, {
        numberOfLines: numberOfLines,
        contentHeight: numberOfLines * summaryLineHeight,
        contentWidth: colWidth,
      })}
      {hasVideo && (
        <View style={{ position: "absolute", top: getIconSize(colWidth) }}>
          <PlayIcon size={getIconSize(colWidth)} />
        </View>
      )}
    </View>
  );
};

export default FrontTileSummary;
