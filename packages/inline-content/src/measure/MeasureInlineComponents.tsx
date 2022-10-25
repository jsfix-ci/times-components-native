import React, { memo } from "react";
import { View } from "react-native";

import renderTrees from "@times-components-native/markup-forest";
import getRenderers from "@times-components-native/article-skeleton/src/article-body/article-body-row.js";
import { ParagraphContent } from "@times-components-native/types";
import { useInlineMeasurementDispatchContext } from "./InlineMeasurementDispatchContext";
import { renderInlineItem } from "../utils/renderInlineItem";
import { InlineItemProps, SkeletonProps } from "../types";

interface Props {
  content: ParagraphContent;
  skeletonProps: SkeletonProps;
}

export const MeasureContent: React.FC<Props> = memo(
  ({ content, skeletonProps }) => {
    const dispatch = useInlineMeasurementDispatchContext();

    const inlineContent = {
      ...content,
      attributes: { ...content.attributes, inline: true },
    };

    const { isArticleTablet, narrowContent } = skeletonProps;

    const trees = renderTrees(
      [inlineContent],
      getRenderers({
        data: {},
        interactiveConfig: {},
        onLinkPress: null,
        onTwitterLinkPress: null,
        onVideoPress: null,
        onImagePress: null,
        isArticleTablet,
        adConfig: {},
        images: [],
        analyticsStream: null,
        narrowContent,
        onParagraphTextLayout: (event: any) => {
          const lines = event.nativeEvent.lines;
          dispatch({
            type: "SET_INLINE_CONTENT_LINES",
            id: inlineContent.id!,
            payload: lines,
          });
        },
        onCommentGuidelinesPress: () => null,
        onCommentsPress: () => null,
        onRelatedArticlePress: () => null,
        onTooltipPresented: () => null,
        tooltips: [],
        onTopicPress: () => null,
        scrollToRef: () => null,
      }),
    );
    //TODO Warning: Each child in a list should have a unique key prop
    return (
      <View
        onLayout={event => {
          const height = Math.floor(event.nativeEvent.layout.height);
          dispatch({
            type: "SET_INLINE_CONTENT_HEIGHT",
            id: inlineContent.id!,
            payload: height,
          });
        }}
      >
        {trees}
      </View>
    );
  },
);

export const MeasureItem: React.FC<{
  itemProps: InlineItemProps;
  width: number;
}> = memo(({ itemProps, width }) => {
  const dispatch = useInlineMeasurementDispatchContext();

  if (!itemProps || !width)
    dispatch({
      type: "SET_INLINE_ITEM_HEIGHT",
      height: 0,
    });

  return (
    <View
      style={{ width }}
      onLayout={event => {
        const height = event.nativeEvent.layout.height;
        dispatch({
          type: "SET_INLINE_ITEM_HEIGHT",
          height,
        });
      }}
    >
      {renderInlineItem(itemProps)}
    </View>
  );
});
