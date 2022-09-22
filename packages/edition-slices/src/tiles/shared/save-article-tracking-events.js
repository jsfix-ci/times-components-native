import { withTrackEvents } from "@times-components-native/tracking";

const withArticleSaveTracking = Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onArticleSavePress",
        getAttrs: ({
          articleId,
          savedArticles,
          headline = "unknown headline",
        }) => ({
          articleId,
          isSaved: !savedArticles[articleId],
          articleHeadline: headline,
        }),
        trackingName: "ArticleSave/Unsave",
      },
    ],
  });

export default withArticleSaveTracking;
