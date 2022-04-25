import { advanceTo as advanceDateTo, clear as clearDate } from "jest-date-mock";
import TestRenderer from "react-test-renderer";
import React from "react";
import FormattedDate from "../src/search-list/formatted-date";
import SearchListItemByLine from "../src/search-list/search-list-item-by-line";
import SearchListItemSnippet from "../src/search-list/search-list-item-snippet";
import SearchList from "../src/search-list/search-list";
import { NativeModules } from "react-native";
import link from "@times-components-native/link";

const mockHits = require("../__mocks__/mock-hits.json");

jest.mock("react-native", () => {
  const rn = jest.requireActual("react-native");
  rn.NativeModules.ReactAnalytics = { track: jest.fn() };
  return rn;
});

export default () => {
  describe("Search Bar List", () => {
    beforeAll(() => {
      jest.useFakeTimers();
      advanceDateTo(Date.now());
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    afterAll(() => {
      jest.useRealTimers();
      clearDate();
    });

    it("FormattedDate should render correctly", () => {
      const testInstance = TestRenderer.create(
        <FormattedDate
          publishedTime="2020-09-07T23:01:00.000Z"
          publicationName="times"
        />,
      );
      expect(testInstance).toMatchSnapshot();
    });

    it("SearchListItemByLine should render correctly", () => {
      const testInstance = TestRenderer.create(
        <SearchListItemByLine byline={mockHits[0].byline} />,
      );

      expect(testInstance).toMatchSnapshot();
    });

    it("SearchListItemSnippet should render correctly", () => {
      const testInstance = TestRenderer.create(
        <SearchListItemSnippet
          hit={mockHits[0]}
          attribute="content"
          key={mockHits[0].url}
        />,
      );

      expect(testInstance).toMatchSnapshot();
    });

    it("should trigger search result click event", () => {
      const mockArticlePress = jest.fn();

      const testInstance = TestRenderer.create(
        <SearchList
          hits={mockHits}
          onArticlePress={mockArticlePress}
          fetchMore={jest.fn()}
        />,
      );

      const linkComponents = testInstance.root.findAllByType(link);

      linkComponents[0].props.onPress();

      expect(mockArticlePress).toHaveBeenCalledWith(mockHits[0].url);

      expect(NativeModules.ReactAnalytics.track).toHaveBeenCalledWith({
        action: "Viewed",
        component: "Search",
        object: "Search",
        attrs: {
          eventTime: new Date(),
          event_navigation_name: "search results article selected",
          event_navigation_action: "navigation",
          event_navigation_browsing_method: "click",
          article_name: mockHits[0].headline,
          article_parent_name: mockHits[0].section,
          other_details: "1 : ",
          search_term: "",
        },
      });
    });
  });
};
