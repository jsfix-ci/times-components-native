import React from "react";
import { NativeModules } from "react-native";
import { Search } from "@times-components-native/search";
import { withErrorBoundaries } from "@times-components-native/pages/src/with-error-boundaries";
import { SearchProps } from "@times-components-native/search/src/search";

const { onArticlePress, onSearchInputChanged } = NativeModules.SearchEvents;

export interface SearchPageProps {
  algoliaConfig: SearchProps["algoliaConfig"] | null;
  initialSearchTerm: SearchProps["initialSearchTerm"];
}

const SearchPage = withErrorBoundaries(
  ({ algoliaConfig = null, initialSearchTerm = "" }: SearchPageProps) => {
    if (!algoliaConfig) {
      return null;
    }

    return (
      <Search
        onArticlePress={onArticlePress}
        algoliaConfig={algoliaConfig}
        onSearchInputChanged={onSearchInputChanged}
        initialSearchTerm={initialSearchTerm}
      />
    );
  },
);

export default SearchPage;
