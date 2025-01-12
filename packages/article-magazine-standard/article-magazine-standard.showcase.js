/* eslint-disable react/prop-types */
import React from "react";
import articleAdConfig from "@times-components-native/ad/fixtures/article-ad-config.json";
import {
  ContextProviderWithDefaults,
  defaults,
} from "@times-components-native/context";
import { ArticleProvider } from "@times-components-native/provider";
import {
  article as makeParams,
  MockFixture,
  MockedProvider,
} from "@times-components-native/provider-test-tools";
import { sections } from "@times-components-native/storybook";
import { scales, themeFactory } from "@times-components-native/styleguide";
import storybookReporter from "@times-components-native/tealium-utils";
import ArticleMagazineStandard from "./src/article-magazine-standard";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    },
  ]);

const templateName = "magazinestandard";

const renderArticle = ({
  adConfig = articleAdConfig,
  analyticsStream,
  decorateAction,
  id,
  scale,
  section,
}) => (
  <ArticleProvider debounceTimeMs={0} id={id}>
    {({ article, isLoading, error, refetch }) => {
      const data = {
        ...article,
        template: "magazinestandard",
      };

      return (
        <ContextProviderWithDefaults
          value={{
            theme: {
              ...themeFactory(section, templateName),
              scale: scale || defaults.theme.scale,
            },
          }}
        >
          <ArticleMagazineStandard
            adConfig={adConfig}
            analyticsStream={analyticsStream}
            article={data}
            error={error}
            isLoading={isLoading}
            onAuthorPress={preventDefaultedAction(decorateAction)(
              "onAuthorPress",
            )}
            onCommentGuidelinesPress={preventDefaultedAction(decorateAction)(
              "onCommentGuidelinesPress",
            )}
            onCommentsPress={preventDefaultedAction(decorateAction)(
              "onCommentsPress",
            )}
            onImagePress={preventDefaultedAction(decorateAction)(
              "onImagePress",
            )}
            onLinkPress={preventDefaultedAction(decorateAction)("onLinkPress")}
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
            refetch={refetch}
          />
        </ContextProviderWithDefaults>
      );
    }}
  </ArticleProvider>
);

const mockArticle = ({
  adConfig = articleAdConfig,
  analyticsStream = storybookReporter,
  decorateAction,
  id,
  params,
  scale,
  section,
}) => (
  <MockFixture
    params={params}
    render={mocks => (
      <MockedProvider mocks={mocks}>
        {renderArticle({
          adConfig,
          analyticsStream,
          decorateAction,
          id,
          scale,
          section,
        })}
      </MockedProvider>
    )}
  />
);

const selectScales = select => select("Scale", scales, scales.medium);
const selectSection = select =>
  sections[select("Section", sections, "The Sunday Times Magazine")];

export default {
  children: [
    {
      component: ({ select }, { decorateAction }) => {
        const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";
        const scale = selectScales(select);
        const section = selectSection(select);

        return mockArticle({
          decorateAction,
          id,
          params: makeParams({
            error: () => new Error("Article error"),
            variables: () => ({
              id,
            }),
          }),
          scale,
          section,
        });
      },
      name: "Magazine Standard - Error",
      platform: "native",
      type: "story",
    },
  ],
  name: "Pages/Templates",
};
