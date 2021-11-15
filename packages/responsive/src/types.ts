enum Orientation {
  PORTRAIT = "portrait",
  LANDSCAPE = "landscape",
}

type ContextType = {
  editionBreakpoint: string;
  narrowArticleBreakpoint: {
    container: number;
    content: number;
  };
  fontScale: number;
  isTablet: boolean;
  isArticleTablet: boolean;
  windowWidth: number;
  windowHeight: number;
  orientation: Orientation;
  isPortrait: boolean;
  isLandscape: boolean;
  sectionContentWidth: number;
  sectionContentHeightTablet: number;
};

export { Orientation, ContextType };
