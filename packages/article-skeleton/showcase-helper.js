/* eslint-disable react/prop-types */
import React from "react";
import { Platform, Text, View } from "react-native";
import pick from "lodash.pick";
import { sections } from "@times-components-native/storybook";
import articleAdConfig from "@times-components-native/ad/fixtures/article-ad-config.json";
import { ContextProviderWithDefaults } from "@times-components-native/context";
import { colours, scales } from "@times-components-native/styleguide";
import storybookReporter from "@times-components-native/tealium-utils";
import { MockBookmarksProvider } from "@times-components-native/provider-test-tools";
import {
  getNewsletter,
  subscribeNewsletter,
} from "@times-components-native/provider-queries";
import fullArticleFixture from "./fixtures/full-article";
import ArticleSkeleton from "./src/article-skeleton";
import Responsive, {
  ResponsiveContext,
} from "@times-components-native/responsive";

const mocks = [
  {
    request: {
      query: getNewsletter,
      variables: {
        code: "TNL-119",
      },
    },
    result: {
      data: {
        newsletter: {
          id: "a2l6E000000CdHzQAK",
          isSubscribed: false,
          __typename: "Newsletter",
        },
      },
    },
    delay: 2000,
  },
  {
    request: {
      query: subscribeNewsletter,
      variables: {
        code: "TNL-119",
      },
    },
    result: {
      data: {
        subscribeNewsletter: {
          id: "a2l6E000000CdHzQAK",
          isSubscribed: true,
          __typename: "Newsletter",
        },
      },
    },
    delay: 2000,
  },
];

const TestHeader = () => (
  <View
    style={{
      alignItems: "center",
      borderColor: "#66666",
      borderWidth: 1,
      justifyContent: "center",
      margin: 20,
      padding: 20,
    }}
  >
    <Text>THIS IS A TEST ARTICLE HEADER</Text>
  </View>
);

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    },
  ]);

const selectScales = select => select("Scale", scales, scales.medium);
const selectSection = select =>
  select("Section", pick(colours.section, sections), colours.section.default);

const renderArticleSkeleton = ({
  boolean,
  decorateAction,
  hasScaling,
  select,
}) => {
  const scale = hasScaling ? selectScales(select) : null;
  const sectionColour = selectSection(select);
  const commentsEnabled = boolean("Comments Enabled?", true);
  const relatedArticleSlice = boolean("Related Articles?", true);
  const topics = boolean("Topics?", true);
  const header = boolean("Header?", false);

  const config = {
    commentsEnabled: commentsEnabled ? undefined : false,
    relatedArticleSlice: relatedArticleSlice ? undefined : null,
    topics: topics ? undefined : [],
  };
  const data = fullArticleFixture(config);
  const showHeader = header ? () => <TestHeader /> : () => null;

  return (
    <MockBookmarksProvider otherMocks={mocks} delay={1000} articleId={data.id}>
      <Responsive>
        <ResponsiveContext.Consumer>
          {({ isArticleTablet }) => (
            <ContextProviderWithDefaults
              value={{ theme: { scale, sectionColour } }}
            >
              <ArticleSkeleton
                adConfig={articleAdConfig}
                analyticsStream={storybookReporter}
                data={data}
                Header={showHeader}
                interactiveConfig={{
                  environment: "prod",
                  platform: Platform.OS,
                  version: "7.0.0",
                  dev: false,
                }}
                onAuthorPress={preventDefaultedAction(decorateAction)(
                  "onAuthorPress",
                )}
                onCommentGuidelinesPress={preventDefaultedAction(
                  decorateAction,
                )("onCommentGuidelinesPress")}
                onCommentsPress={preventDefaultedAction(decorateAction)(
                  "onCommentsPress",
                )}
                onLinkPress={preventDefaultedAction(decorateAction)(
                  "onLinkPress",
                )}
                onRelatedArticlePress={preventDefaultedAction(decorateAction)(
                  "onRelatedArticlePress",
                )}
                onTopicPress={preventDefaultedAction(decorateAction)(
                  "onTopicPress",
                )}
                onTwitterLinkPress={preventDefaultedAction(decorateAction)(
                  "onTwitterLinkPress",
                )}
                onVideoPress={preventDefaultedAction(decorateAction)(
                  "onVideoPress",
                )}
                onImagePress={preventDefaultedAction(decorateAction)(
                  "onImagePress",
                )}
                onViewableItemsChanged={() => null}
                isArticleTablet={isArticleTablet}
                scale={scale}
              />
            </ContextProviderWithDefaults>
          )}
        </ResponsiveContext.Consumer>
      </Responsive>
    </MockBookmarksProvider>
  );
};

export default renderArticleSkeleton;
