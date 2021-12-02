import React, {
  createContext,
  Dispatch,
  ReactChild,
  SetStateAction,
  useState,
} from "react";

interface SearchContextInterface {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>> | undefined;
}

export const SearchContext = createContext<SearchContextInterface>({
  searchTerm: "",
  setSearchTerm: undefined,
});

interface SearchProviderProps {
  children: ReactChild;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
