import React from "react";
import { View } from "react-native";
import ArticleSummary from "./src/article-summary";

import defaultFixture from "./fixtures/default";
import withSummaryLinksFixture from "./fixtures/with-summary-links";
import articleMultiFixture from "./fixtures/article-multi";
import noBylineFixture from "./fixtures/no-byline";
import noLabelFixture from "./fixtures/no-label";
import videoLabelFixture from "./fixtures/video-label";
import reviewFixture from "./fixtures/review";
import straplineFixture from "./fixtures/strapline";

const story = m => <View style={{ padding: 20 }}>{m}</View>;
const isArticleTablet = true;

export default {
  children: [
    {
      component: () => story(<ArticleSummary {...defaultFixture()} />),
      name: "Default",
      type: "story",
    },
    {
      component: () =>
        story(
          <ArticleSummary
            {...defaultFixture()}
            isArticleTablet={isArticleTablet}
          />,
        ),
      name: "Default on tablet",
      type: "story",
    },
    {
      component: () =>
        story(
          <ArticleSummary
            {...defaultFixture({
              articleReadState: {
                read: true,
                animate: false,
              },
            })}
            isArticleTablet={isArticleTablet}
          />,
        ),
      name: "Article marked as read",
      type: "story",
    },
    {
      component: () =>
        story(
          <ArticleSummary
            {...defaultFixture({
              articleReadState: {
                read: true,
                animate: true,
              },
            })}
            isArticleTablet={isArticleTablet}
          />,
        ),
      name: "Article marked as read and should be animated",
      type: "story",
    },
    {
      component: () => story(<ArticleSummary {...withSummaryLinksFixture()} />),
      name: "With links in summary",
      type: "story",
    },
    {
      component: () => story(<ArticleSummary {...noBylineFixture()} />),
      name: "No byline",
      type: "story",
    },
    {
      component: () => story(<ArticleSummary {...articleMultiFixture()} />),
      name: "Summary with multiple paragraphs",
      type: "story",
    },
    {
      component: () => story(<ArticleSummary {...videoLabelFixture()} />),
      name: "Video label",
      type: "story",
    },
    {
      component: () => story(<ArticleSummary {...noLabelFixture()} />),
      name: "No label",
      type: "story",
    },
    {
      component: () => story(<ArticleSummary {...reviewFixture()} />),
      name: "Review/Rating summary",
      type: "story",
    },
    {
      component: () => story(<ArticleSummary {...straplineFixture()} />),
      name: "with Strapline",
      type: "story",
    },
  ],
  name: "Composed/Article Summary",
};
