import { createContext } from "react";

export default createContext<{
  isArticleTablet: boolean;
}>({
  isArticleTablet: false,
});
