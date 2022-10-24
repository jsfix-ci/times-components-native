import { EditionBreakpointKeys } from "@times-components-native/types";
import { ContextType, Orientation } from "./types";

interface IState {
  editionBreakpoint: EditionBreakpointKeys;
  narrowArticleBreakpoint: string;
  fontScale: number;
  isTablet: boolean;
  isArticleTablet: boolean;
  windowWidth: number;
  windowHeight: number;
  orientation: Orientation.PORTRAIT | Orientation.LANDSCAPE;
  isPortrait: boolean;
  isLandscape: boolean;
  sectionContentWidth: number;
  sectionContentHeightTablet: number;
}

export const getInitialState = (
  width: number,
  height: number,
  fontScale: number,
): ContextType => ({
  editionBreakpoint: getEditionBreakpoint(width),
  narrowArticleBreakpoint: getNarrowArticleBreakpoint(width),
  fontScale,
  isTablet: isTablet ? isTablet() : false,
  isArticleTablet: width >= minTabletWidth && isTablet && isTablet(),
  windowWidth: width,
  windowHeight: height,
  orientation: height > width ? Orientation.PORTRAIT : Orientation.LANDSCAPE,
  isPortrait: height > width,
  isLandscape: width > height,
  sectionContentWidth: width,
  sectionContentHeightTablet: calculateSectionContentHeightTablet(height),
});

const reducer = (state: IState, action: ReducerActions): IState => {
  switch (action.type) {
    case ActionTypes.setAdHeight:
      return {
        ...state,
        adHeight: action.payload,
      };
    case ActionTypes.setLoadAd:
      return {
        ...state,
        loadAd: action.payload,
      };
    case ActionTypes.setPadding:
      return {
        ...state,
        padding: action.payload,
      };
    default:
      throw new Error("Unknown action");
  }
};

export default reducer;
