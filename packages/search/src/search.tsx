import React, { FC, useEffect } from "react";
import { NativeModules, Keyboard, Platform } from "react-native";
import { SearchBarComponent } from "./search-bar/search-bar";
import SearchResults from "@times-components-native/search/src/search-results";
import {
  connectSearchBox,
  InstantSearch,
  Configure,
} from "react-instantsearch-native";
import algoliasearch, { SearchClient } from "algoliasearch";
import { useIsConnected } from "@times-components-native/utils/src/useIsConnected";
import { SearchProvider } from "./SearchContext";
import {
  getDeviceId,
  getDeviceType,
  getVersion,
} from "react-native-device-info";

const { track } = NativeModules.ReactAnalytics;

export interface SearchProps {
  onArticlePress: (url: string) => void;
  onSearchInputChanged?: (searchTerm: string) => void;
  algoliaConfig: {
    ALGOLIA_APP_ID: string;
    ALGOLIA_API_KEY: string;
    ALGOLIA_INDEX: string;
  };
  initialSearchTerm: string;
}

let searchClient: SearchClient | null = null;

const getSearchClient = (algoliaConfig: SearchProps["algoliaConfig"]) => {
  if (searchClient) return searchClient;

  searchClient = algoliasearch(
    algoliaConfig.ALGOLIA_APP_ID,
    algoliaConfig.ALGOLIA_API_KEY,
  );
  return searchClient;
};

const Search: FC<SearchProps> = ({
  onArticlePress,
  onSearchInputChanged,
  algoliaConfig,
  initialSearchTerm,
}) => {
  const isConnected = useIsConnected();
  const initialSearchTermIsEmpty = (!initialSearchTerm ||
    initialSearchTerm.length == 0) as boolean;
  const shouldFocus = initialSearchTermIsEmpty;

  /**
   * Variables used to segment searches in algolia analytics
   * using the analyticsTags prop
   */
  const platform = getDeviceType();
  const appVersion = getVersion();
  const deviceId = getDeviceId();
  const OS = Platform.OS;

  const ConnectedSearchBar = connectSearchBox((props) => (
    <SearchBarComponent
      {...props}
      isConnected={isConnected}
      initialSearchTerm={initialSearchTerm}
      onSearchInputChanged={onSearchInputChanged}
      shouldFocus={shouldFocus}
    />
  ));

  const handleOnArticlePress = (url: string) => {
    onArticlePress(url);
    Keyboard.dismiss();
  };

  useEffect(() => {
    track({
      object: "Search",
      action: "Viewed",
      component: "Page",
      attrs: {
        pageName: "search",
        pageSection: "search",
      },
    });
  }, []);

  return (
    <SearchProvider>
      <InstantSearch
        indexName={algoliaConfig.ALGOLIA_INDEX}
        searchClient={getSearchClient(algoliaConfig)}
      >
        <Configure
          analytics={true}
          analyticsTags={[OS, platform, appVersion, deviceId]}
        />
        <ConnectedSearchBar />
        <SearchResults
          onArticlePress={handleOnArticlePress}
          isConnected={isConnected}
        />
      </InstantSearch>
    </SearchProvider>
  );
};

export default Search;
