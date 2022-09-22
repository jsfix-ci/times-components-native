import React from "react";

import ArticleImage from "@times-components-native/article-image";
import DropCap from "@times-components-native/drop-cap";
import PullQuote from "@times-components-native/pull-quote";
import {
  ArticleImageProps,
  DropCapProps,
  InlineItemProps,
  PullQuoteProps,
} from "../types";

export const renderInlineItem = (itemProps: InlineItemProps) => {
  if (!itemProps) return null;

  const { originalName } = itemProps;

  if (originalName === "dropcap") {
    const dropCapProps = itemProps as DropCapProps;
    return <DropCap {...dropCapProps} />;
  }

  if (originalName === "image") {
    const articleImageProps = itemProps as ArticleImageProps;
    return <ArticleImage {...articleImageProps} />;
  }

  if (originalName === "pullQuote") {
    const pullQuoteProps = itemProps as PullQuoteProps;
    const { children } = pullQuoteProps;
    const itemContent = children[0].string;
    return <PullQuote {...pullQuoteProps}>{itemContent}</PullQuote>;
  }
};
