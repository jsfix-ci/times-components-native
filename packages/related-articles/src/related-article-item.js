import React from "react";
import Link from "@times-components-native/link";
import RelatedArticleItemBase from "./related-article-item.base";
import relatedArticlesItemTrackingEvents from "./related-articles-item-tracking-events";

const RelatedArticleItem = props => (
  <RelatedArticleItemBase {...props}>
    {({ article: { url }, card, onPress }) => (
      <Link
        linkStyle={{ padding: 10 }}
        onPress={e => onPress(e, { url })}
        url={url}
      >
        {card}
      </Link>
    )}
  </RelatedArticleItemBase>
);

RelatedArticleItem.displayName = "RelatedArticleItem";

export default relatedArticlesItemTrackingEvents(RelatedArticleItem);
