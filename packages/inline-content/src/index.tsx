import React, { useCallback } from "react";
import { View } from "react-native";

import {
  renderers,
  Gutter,
  ErrorBoundary,
} from "@times-components-native/article-skeleton";
import { render } from "@times-components-native/markup-forest";
import { useResponsiveContext } from "@times-components-native/responsive";
import {
  spacing,
  tabletWidth,
  getNarrowArticleBreakpoint,
} from "@times-components-native/styleguide";
import { ParagraphContent } from "@times-components-native/types";

import { MeasureInlineContent } from "./measure/MeasureInlineContent";
import { assignWithId } from "./utils/assignWithId";
import { chunkInlineContent } from "./utils/chunkInlineContent";
import { getInlineItemProps } from "./utils/getInlineItemProps";
import { renderInlineItem } from "./utils/renderInlineItem";
import { InlineContentProps } from "./types";

import styles from "./styles";
import { Italic } from "@times-components-native/article-skeleton/src/article-body/Components";
import ComponentPicker from "@times-components-native/article-skeleton/src/article-body/Components/ComponentPicker";

const InlineContent = (props: InlineContentProps) => {
  const {
    defaultFont,
    inlineContent,
    narrowContent,
    originalName,
    skeletonProps,
  } = props;
  const { isArticleTablet } = skeletonProps;
  const { windowWidth } = useResponsiveContext();
  const { lineHeight } = defaultFont;
  const availableWidth = Math.min(
    windowWidth,
    narrowContent
      ? getNarrowArticleBreakpoint(windowWidth).content
      : tabletWidth,
  );
  const isAd = originalName === "ad";
  const isDropCap = originalName === "dropcap";

  let inlineItemWidth = availableWidth * 0.35;
  let inlineContentHeight: number;
  let adContainerHeight: number;

  if (isAd) {
    const { height: adHeight, width: adWidth } = props;
    const adHeaderHeight = spacing(4);
    const adHorizontalSpacing = 21;
    const adMarginBottom = spacing(2);
    adContainerHeight = adHeight + adHeaderHeight;
    inlineContentHeight = adContainerHeight + adMarginBottom;
    inlineItemWidth = adWidth + adHorizontalSpacing;
  }

  if (isDropCap) {
    const { height: dropCapHeight, width: dropCapWidth } = props;
    inlineContentHeight = dropCapHeight;
    inlineItemWidth = dropCapWidth;
  }

  const inlineContentWidth = availableWidth - inlineItemWidth - spacing(2);

  const renderChild = render(
    // @ts-ignore
    renderers({ dropcapsDisabled: true, ...skeletonProps }),
  );

  const Child = useCallback(({ item, index }, inline = false, log = false) => {
    item.attributes = { ...item.attributes, inline };
    return (
      <Gutter style={{ overflow: "hidden" }}>
        <ErrorBoundary>
          {renderChild(item, index.toString(), index, log)}
        </ErrorBoundary>
      </Gutter>
    );
  }, []);

  const renderItem = (inline: boolean, log: boolean = false) => (
    item: ParagraphContent,
    index: number,
  ) => {
    if (log) console.info("Rendering Item:", inline, item);
    return Child({ item, index }, inline, log);
  };

  const paragraphs = inlineContent
    .filter((c) => c.name === "paragraph")
    .map(assignWithId(windowWidth));

  const itemProps = getInlineItemProps(props, inlineItemWidth);

  if (!itemProps) return <>{paragraphs.map(renderItem(false))}</>;

  const contentParameters = {
    contentWidth: inlineContentWidth,
    // @ts-ignore
    contentHeight: inlineContentHeight || 0,
    contentLineHeight: lineHeight,
    itemWidth: inlineItemWidth,
  };

  console.log("THE THING::: ", JSON.stringify(paragraphs[0], null, 2));
  console.log("THE THANG::: ", paragraphs[0]);

  if (
    paragraphs.length === 1 &&
    paragraphs[0].id === "0-744" &&
    paragraphs[0].children.length === 1 &&
    paragraphs[0].children[0].name === "italic" &&
    paragraphs[0].children[0].children.length === 3
  ) {
    console.log(
      "THE PARA: ",
      JSON.stringify(paragraphs[0].children[0], null, 2),
    );
    console.log(
      "params:",
      contentParameters,
      !isAd ? itemProps : undefined,
      skeletonProps,
    );
    return (
      <MeasureInlineContent
        content={paragraphs}
        contentParameters={contentParameters}
        itemProps={!isAd ? itemProps : undefined}
        skeletonProps={skeletonProps}
        renderMeasuredContents={(contentMeasurements, log) => {
          console.log("contentMeasurements:", contentMeasurements);
          const { chunks, currentInlineContentHeight } = chunkInlineContent(
            paragraphs,
            contentMeasurements,
            contentParameters,
            true,
          );

          const itemHeight =
            inlineContentHeight || contentMeasurements.itemHeight || 0;

          const requiredInlineContentHeight = Math.max(
            currentInlineContentHeight,
            itemHeight,
          );

          const chunkedInlineContent = chunks[0] || [];
          const chunkedOverflowContent = chunks[1] || [];

          const inlineItemToRender = (
            <View
              style={[
                styles.inlineItemContainer,
                {
                  width: inlineItemWidth,
                  height: isAd ? adContainerHeight : itemHeight,
                },
              ]}
            >
              {renderInlineItem(itemProps)}
            </View>
          );

          if (log) {
            console.warn(
              "chunkedInlineContent",
              JSON.stringify(chunks, null, 2),
              JSON.stringify(chunkedInlineContent[0].children, null, 2),
            );
          }

          const newParagraph = [
            {
              key: "1",
              component: "Text",
              props: {
                style: {
                  fontStyle: "italic",
                },
              },
              children: "Clarissa Eden, who ",
            },
            {
              key: "2",
              component: "Link",
              props: {
                style: {
                  fontStyle: "italic",
                },
                href:
                  "https://www.thetimes.co.uk/article/clarissa-eden-countess-of-avon-dies-aged-101-g0fhbnltw",
                type: "article",
                canonicalId:
                  "clarissa-eden-countess-of-avon-dies-aged-101-g0fhbnltw",
              },
              children: "Clarissa Eden, who ",
            },
            {
              key: "3",
              component: "Text",
              props: {
                style: {
                  fontStyle: "italic",
                },
              },
              children:
                ", outlived her husband, the former prime minister, by almost 45 years. After Anthony’s death, she indulged all the cultural interests he hadn’t cared for, such as opera — both high and soap. Her friend Hugo Vickers recalled that she was a great fan of Dallas. “I think she thought it was genuine,” he said. “She liked all those oil barons talking about their daddies.”",
            },
          ];

          const inlineContentToRender = (
            <View
              style={{
                width: inlineItemWidth,
                flex: 1,
                justifyContent: "flex-start",
                flexWrap: "wrap",
                alignItems: "flex-start",
                flexDirection: "row",
              }}
            >
              {newParagraph.map(({ component, props, children, key }) => (
                <ComponentPicker
                  key={key}
                  {...{ component, props, children }}
                />
              ))}
            </View>
          );

          return (
            <>
              <View
                style={[
                  styles.container,
                  {
                    height: requiredInlineContentHeight,
                    alignSelf: narrowContent ? "flex-start" : "center",
                  },
                  !isArticleTablet && { width: availableWidth },
                ]}
              >
                {isAd
                  ? [inlineContentToRender, inlineItemToRender]
                  : [inlineItemToRender, inlineContentToRender]}
              </View>
              {chunkedOverflowContent.map(renderItem(false))}
            </>
          );
        }}
        log={true}
      />
    );
  }

  return (
    <MeasureInlineContent
      content={paragraphs}
      contentParameters={contentParameters}
      itemProps={!isAd ? itemProps : undefined}
      skeletonProps={skeletonProps}
      renderMeasuredContents={(contentMeasurements) => {
        const { chunks, currentInlineContentHeight } = chunkInlineContent(
          paragraphs,
          contentMeasurements,
          contentParameters,
        );

        const itemHeight =
          inlineContentHeight || contentMeasurements.itemHeight || 0;

        const requiredInlineContentHeight = Math.max(
          currentInlineContentHeight,
          itemHeight,
        );

        const chunkedInlineContent = chunks[0] || [];
        const chunkedOverflowContent = chunks[1] || [];

        const inlineItemToRender = (
          <View
            style={[
              styles.inlineItemContainer,
              {
                width: inlineItemWidth,
                height: isAd ? adContainerHeight : itemHeight,
              },
            ]}
          >
            {renderInlineItem(itemProps)}
          </View>
        );

        const inlineContentToRender = (
          <View
            style={{
              height: requiredInlineContentHeight,
              width: inlineContentWidth,
            }}
          >
            {chunkedInlineContent.map(renderItem(true))}
          </View>
        );

        return (
          <>
            <View
              style={[
                styles.container,
                {
                  height: requiredInlineContentHeight,
                  alignSelf: narrowContent ? "flex-start" : "center",
                },
                !isArticleTablet && { width: availableWidth },
              ]}
            >
              {isAd
                ? [inlineContentToRender, inlineItemToRender]
                : [inlineItemToRender, inlineContentToRender]}
            </View>
            {chunkedOverflowContent.map(renderItem(false))}
          </>
        );
      }}
    />
  );
};

export default InlineContent;
