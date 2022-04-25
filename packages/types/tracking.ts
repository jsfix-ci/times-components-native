export interface TrackingAttributes {
  eventTime: Date;
}

export interface PageTrackingAttributes extends TrackingAttributes {
  pageName: string;
  pageSection: string;
}

export type NavigationEventBrowsingMethod = "click" | "automated";
export type NavigationEventBrowsingAction = "navigation";

export interface NavigationEventAttributes extends TrackingAttributes {
  /**
   * Unique name for the navigation event
   */
  event_navigation_name: string;
  event_navigation_action: NavigationEventBrowsingAction;
  event_navigation_browsing_method: NavigationEventBrowsingMethod;
  article_name: string;
  other_details: string;
  article_parent_name: string;
  search_term: string;
}

export type TrackingData = {
  object: string;
  action: string;
  component: string;
  attrs?: TrackingAttributes;
};
