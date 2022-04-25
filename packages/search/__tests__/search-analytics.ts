import { advanceTo as advanceDateTo, clear as clearDate } from "jest-date-mock";
import {
  trackEmptySearchResultsPageView,
  trackSearchEmptyStatePageView,
  trackSearchNoInternetPageView,
  trackSearchResultClickedEvent,
  trackSearchResultsPageView,
} from "../src/analytics/search-analytics";
import { NativeModules } from "react-native";
import {
  TrackingData,
  PageTrackingAttributes,
  NavigationEventAttributes,
} from "@times-components-native/types";

jest.mock("react-native", () => {
  const rn = jest.requireActual("react-native");
  rn.NativeModules.ReactAnalytics = { track: jest.fn() };
  return rn;
});

export default () => {
  describe("search analytics", () => {
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

    it("should track search results page correctly", () => {
      // When
      trackSearchResultsPageView();

      // Then
      expect(NativeModules.ReactAnalytics.track).toHaveBeenCalledWith(<
        TrackingData
      >{
        action: "Viewed",
        component: "Search",
        object: "Search",
        attrs: <PageTrackingAttributes>{
          eventTime: new Date(),
          pageName: "search results",
          pageSection: "search",
        },
      });
    });

    it("should track search empty results correctly", () => {
      // When
      trackEmptySearchResultsPageView();

      // Then
      expect(NativeModules.ReactAnalytics.track).toHaveBeenCalledWith(<
        TrackingData
      >{
        action: "Viewed",
        component: "Search",
        object: "Search",
        attrs: <PageTrackingAttributes>{
          eventTime: new Date(),
          pageName: "no search results",
          pageSection: "search",
        },
      });
    });

    it("should track search empty state page correctly", () => {
      // When
      trackSearchEmptyStatePageView();

      // Then
      expect(NativeModules.ReactAnalytics.track).toHaveBeenCalledWith(<
        TrackingData
      >{
        action: "Empty state",
        component: "Search",
        object: "Search",
        attrs: <PageTrackingAttributes>{
          eventTime: new Date(),
          pageName: "search",
          pageSection: "search",
        },
      });
    });

    it("should track search internet error correctly", () => {
      // When
      trackSearchNoInternetPageView();

      // Then
      expect(NativeModules.ReactAnalytics.track).toHaveBeenCalledWith(<
        TrackingData
      >{
        action: "Viewed",
        component: "Search",
        object: "Search",
        attrs: <PageTrackingAttributes>{
          eventTime: new Date(),
          pageName: "no internet found",
          pageSection: "search",
        },
      });
    });

    it("should track search results item clicked correctly", () => {
      // When
      trackSearchResultClickedEvent({
        article_name: "article_name",
        article_parent_name: "article_parent_name",
        other_details: "other_details",
      });

      // Then
      expect(NativeModules.ReactAnalytics.track).toHaveBeenCalledWith(<
        TrackingData
      >{
        action: "Viewed",
        component: "Search",
        object: "Search",
        attrs: <NavigationEventAttributes>{
          eventTime: new Date(),
          event_navigation_name: "search results article selected",
          event_navigation_action: "navigation",
          event_navigation_browsing_method: "click",
          article_name: "article_name",
          article_parent_name: "article_parent_name",
          other_details: "other_details",
          search_term: "",
        },
      });
    });
  });
};
