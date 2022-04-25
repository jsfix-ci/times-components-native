import React, { FC, useContext, useEffect } from "react";
import { FlatList } from "react-native";
import SearchListItem from "./search-list-item";
import { Hit } from "../types";
import ArticleListItemSeparator from "@times-components-native/article-list/src/article-list-item-separator";
import SearchListLoader from "@times-components-native/search/src/search-list/search-list-loader";
import { styles } from "./styles/search-list-styles";
import SearchListEmptyState from "./search-list-empty-state";
import {
  trackSearchResultClickedEvent,
  trackSearchResultsPageView,
  trackEmptySearchResultsPageView,
} from "../analytics/search-analytics";
import { SearchContext } from "../SearchContext";

const DEFAULT_NUMBER_OF_RESULTS_PER_QUERY = 20;

export interface SearchListProps {
  hits: Hit[];
  onArticlePress: (url: string) => void;
  fetchMore: () => void;
}

const SearchList: FC<SearchListProps> = ({
  hits,
  onArticlePress,
  fetchMore,
}) => {
  const { searchTerm } = useContext(SearchContext);

  const handleFetchMore = () => {
    // Workaround for iOS FlatList bug (https://github.com/facebook/react-native/issues/16067)
    if (hits.length > 0) return fetchMore();
  };

  const onItemPress = (hit: Hit) => {
    const batchNumber =
      parseInt(String(hit.__position / DEFAULT_NUMBER_OF_RESULTS_PER_QUERY)) +
      1;

    trackSearchResultClickedEvent({
      article_name: hit.headline,
      other_details: `${batchNumber} : ${searchTerm}`,
      article_parent_name: hit.section,
      search_term: searchTerm,
    });

    onArticlePress(hit.url);
  };

  useEffect(() => {
    trackSearchResultsPageView();
  }, []);

  return (
    <FlatList
      data={hits}
      renderItem={({ item }) => (
        <SearchListItem item={item} onItemPress={onItemPress} />
      )}
      ItemSeparatorComponent={ArticleListItemSeparator}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={
        <SearchListEmptyState
          icon="emptyResultsIcon"
          title="Sorry, we found no results"
          message="Please check all words are spelled correctly, or try a different search term"
          track={trackEmptySearchResultsPageView}
        />
      }
      ListFooterComponent={SearchListLoader}
      nestedScrollEnabled
      onEndReached={handleFetchMore}
      keyboardShouldPersistTaps={"always"}
    />
  );
};

export default SearchList;
