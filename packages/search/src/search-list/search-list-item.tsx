import React, { FC } from "react";
import { View } from "react-native";
import { Hit } from "../types";
import {
  ArticleSummaryHeadline,
  ArticleSummaryLabel,
} from "@times-components-native/article-summary";
import { getHeadline } from "@times-components-native/utils";
import { ResponsiveContext } from "@times-components-native/responsive";
import styleguide from "@times-components-native/styleguide";
import Link from "@times-components-native/link";
import FormattedDate from "./formatted-date";
import SearchListItemByLine from "./search-list-item-by-line";
import SearchListItemSnippet from "./search-list-item-snippet";
import { styles } from "./styles/search-list-item-styles";
import { styles as searchListStyles } from "./styles/search-list-styles";

const { colours } = styleguide();

export interface SearchListItemProps {
  item: Hit;
  onItemPress: (item: Hit) => void;
}

const SearchListItem: FC<SearchListItemProps> = ({ item, onItemPress }) => {
  const {
    headline,
    shortHeadline,
    section,
    label,
    hasVideo,
    publishedTime,
    publicationName,
    byline,
  } = item;

  return (
    <ResponsiveContext.Consumer>
      {({ isTablet }) => (
        <View style={searchListStyles.container} testID="search-results-item">
          <View style={searchListStyles.subContainer}>
            <Link onPress={() => onItemPress(item)}>
              <View
                style={
                  isTablet
                    ? styles.listItemContainerTablet
                    : styles.listItemContainer
                }
              >
                <ArticleSummaryLabel
                  articleReadState={{ animate: false, read: false }}
                  title={label}
                  isVideo={hasVideo}
                  color={
                    (section &&
                      colours.section[
                        section as keyof typeof colours.section
                      ]) ||
                    colours.section.default
                  }
                />
                <ArticleSummaryHeadline
                  headline={getHeadline(headline, shortHeadline)}
                />
                <SearchListItemByLine byline={byline} />
                <SearchListItemSnippet attribute="content" hit={item} />
                <FormattedDate
                  publishedTime={publishedTime}
                  publicationName={publicationName}
                />
              </View>
            </Link>
          </View>
        </View>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default SearchListItem;
