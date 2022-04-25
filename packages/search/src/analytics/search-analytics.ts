import {
  TrackingData,
  TrackingAttributes,
  PageTrackingAttributes,
  NavigationEventAttributes,
} from "@times-components-native/types";
import { NativeModules } from "react-native";

const trackNative = NativeModules.ReactAnalytics.track;

export const trackSearchResultsPageView: () => void = () => {
  const attrs: PageTrackingAttributes = {
    eventTime: new Date(),
    pageName: "search results",
    pageSection: "search",
  };

  const trackingData = createSearchTrackingData({ attrs });

  trackNative(trackingData);
};

interface EventProps {
  article_name: string;
  other_details: string;
  article_parent_name: string;
  search_term?: string;
}

export const trackSearchResultClickedEvent = ({
  article_name,
  other_details,
  article_parent_name,
  search_term = "",
}: EventProps) => {
  const attrs: NavigationEventAttributes = {
    eventTime: new Date(),
    event_navigation_name: "search results article selected",
    event_navigation_action: "navigation",
    event_navigation_browsing_method: "click",
    article_name: article_name,
    other_details,
    article_parent_name,
    search_term,
  };

  const trackingData = createSearchTrackingData({ attrs });

  trackNative(trackingData);
};

export const trackEmptySearchResultsPageView: () => void = () => {
  const attrs: PageTrackingAttributes = {
    eventTime: new Date(),
    pageName: "no search results",
    pageSection: "search",
  };

  const trackingData = createSearchTrackingData({ attrs });

  trackNative(trackingData);
};

export const trackSearchNoInternetPageView: () => void = () => {
  const attrs: PageTrackingAttributes = {
    pageName: "no internet found",
    pageSection: "search",
    eventTime: new Date(),
  };

  const trackingData = createSearchTrackingData({ attrs });

  trackNative(trackingData);
};

export const trackSearchEmptyStatePageView: () => void = () => {
  const attrs: PageTrackingAttributes = {
    eventTime: new Date(),
    pageName: "search",
    pageSection: "search",
  };
  const trackingData = createSearchTrackingData({
    action: "Empty state",
    attrs: attrs,
  });

  trackNative(trackingData);
};

type CreateSearchTrackingDataParameters = {
  object?: string;
  action?: string;
  component?: string;
  attrs: TrackingAttributes;
};

const createSearchTrackingData = ({
  object = "Search",
  action = "Viewed",
  component = "Search",
  attrs,
}: CreateSearchTrackingDataParameters): TrackingData => ({
  object,
  action,
  component,
  attrs,
});
