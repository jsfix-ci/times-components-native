import get from "lodash.get";
import { DateTime } from "luxon";
import { withTrackingContext } from "@times-components-native/tracking";
import { getActiveArticleFlags } from "@times-components-native/article-flag";

export default (Component) =>
  withTrackingContext(Component, {
    getAttrs: ({ data, pageSection, referralUrl = "" }) => {
      const published = DateTime.fromJSDate(
        new Date(get(data, "publishedTime", "")),
      );
      const current = DateTime.local();
      const diff = current.diff(published, "days");
      const { days } = diff.values || { days: 0.0 };
      const editionType = days > 1.0 ? "past 6 days" : "current edition";

      const activeArticleFlags = getActiveArticleFlags(data.expirableFlags);

      const articleFlag = activeArticleFlags?.length
        ? activeArticleFlags[0].type.toLowerCase()
        : "no flag";

      let articleTemplateName = "standard template";

      const articleWasLive = data?.expirableFlags?.some(
        (x) => x.type === "LIVE",
      );

      if (articleWasLive) {
        articleTemplateName = "live template";
      }

      return {
        articleId: get(data, "id", ""),
        article_topic_tags: data.topics
          ? data.topics.map((topic) => topic.slug)
          : [],
        bylines: get(
          data,
          "bylines[0].byline[0].children[0].attributes.value",
          "",
        ),
        headline: get(data, "headline", ""),
        label: get(data, "label", ""),
        pageName: `${get(data, "slug", "")}-${get(
          data,
          "shortIdentifier",
          "",
        )}`,
        edition_type: editionType,
        published_time: get(data, "publishedTime", ""),
        past_edition_date:
          editionType === "past 6 days" ? get(data, "publishedTime", "") : null,
        parent_site: get(data, "publicationName", ""),
        referral_url: referralUrl || get(data, "referralUrl", ""),
        section: pageSection || get(data, "section", ""),
        template: get(data, "template", "Default"),
        canonical_url: get(data, "url", ""),
        article_flag: articleFlag,
        article_template_name: articleTemplateName,
      };
    },
    trackingObjectName: "Article",
  });
