/* eslint-disable prefer-destructuring */

import React, { Component } from "react";
import { shallow } from "enzyme";
import PropTypes from "prop-types";
import TestRenderer from "react-test-renderer";
import Link from "@times-components-native/link";
import RelatedArticleItem from "../src/related-article-item";
import * as util from "./shared-util.base";

export const testSummary = util.testSummary;

export const createRelatedArticlesProps = util.createRelatedArticlesProps;

export const noArticlesTests = util.noArticlesTests;

export const hasVideoTests = util.hasVideoTests;

export const noShortHeadlineTests = util.noShortHeadlineTests;

export const oneArticleTests = util.oneArticleTests(fixture => [
  {
    name: "callback triggered on related article press",
    test() {
      const onPressMock = jest.fn();
      const {
        items = [],
        lead = {},
        opinion = {},
      } = fixture.relatedArticleSlice;

      if (items.length === 0 && !lead && !opinion) return;

      const article = lead.article || opinion.article || items[0].article;

      const wrapper = shallow(
        <RelatedArticleItem article={article} onPress={onPressMock} />,
      );

      const eventMock = {};
      wrapper.dive().dive().find("Link").at(0).simulate("press", eventMock);

      expect(onPressMock).toHaveBeenCalledWith(eventMock, {
        url: article.url,
      });
    },
  },
  {
    name: "on press analytics triggered",
    test() {
      const stream = jest.fn();

      const {
        items = [],
        lead = {},
        opinion = {},
      } = fixture.relatedArticleSlice;

      if (items.length === 0 && !lead && !opinion) return;

      const article = lead.article || opinion.article || items[0].article;

      class WithTrackingContext extends Component {
        getChildContext() {
          return {
            tracking: {
              analytics: stream,
            },
          };
        }

        render() {
          return <RelatedArticleItem article={article} onPress={() => null} />;
        }
      }

      WithTrackingContext.childContextTypes = {
        tracking: PropTypes.shape({
          analytics: PropTypes.func,
        }),
      };

      const testInstance = TestRenderer.create(<WithTrackingContext />);

      const [link] = testInstance.root.findAllByType(Link);

      link.props.onPress();

      const [[call]] = stream.mock.calls;

      expect(call).toMatchSnapshot();
    },
  },
]);

export const twoArticlesTests = util.twoArticlesTests;

export const threeArticlesTests = util.threeArticlesTests;

export const threeArticlesWithLeadAssetOverrideTests =
  util.threeArticlesWithLeadAssetOverrideTests;
