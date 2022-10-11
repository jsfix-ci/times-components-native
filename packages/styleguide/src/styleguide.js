import sectionColours, { secondarySectionColours } from "./colours/section";
import functionalColours from "./colours/functional";
import themeFactory from "./theme/theme-factory";
import columnToPercentage from "./grid/columnToPercentage";

import FadeIn from "./animations";
import breakpoints, {
  editionBreakpoints,
  editionBreakpointWidths,
  editionMaxWidth,
  sliceContentMaxWidth,
  getEditionBreakpoint,
  getNarrowArticleBreakpoint,
  getStyleByDeviceSize,
} from "./breakpoints";
import lineHeights from "./line-heights";
import fonts from "./fonts/fonts";
import fontSizes from "./fonts/font-sizes-base";

import scales from "./scales";
import spacing, { globalSpacingStyles } from "./spacing";
import { ARTICLE_READ_ANIMATION } from "./articleRead";

const {
  nativeTablet: tabletWidth,
  nativeTabletWide: tabletWidthMax,
} = breakpoints;
const tabletRowPadding = 20;

const colours = {
  functional: functionalColours,
  secondarySectionColours,
  section: sectionColours,
};

const Animations = {
  FadeIn,
};

const fontFactory = ({ font, fontSize }) => {
  return {
    fontFamily: fonts[font],
    fontSize: fontSizes[fontSize],
    lineHeight: lineHeights({ fontSize, font }),
  };
};

export {
  fontFactory,
  tabletWidth,
  tabletWidthMax,
  tabletRowPadding,
  columnToPercentage,
  scales,
  colours,
  Animations,
  globalSpacingStyles,
  fonts,
  fontSizes,
  lineHeights,
  ARTICLE_READ_ANIMATION,
  themeFactory,
  breakpoints,
  editionBreakpoints,
  editionBreakpointWidths,
  editionMaxWidth,
  sliceContentMaxWidth,
  getEditionBreakpoint,
  getNarrowArticleBreakpoint,
  getStyleByDeviceSize,
  spacing,
};

const styleguide = () => ({
  Animations,
  colours,
  fontFactory,
  fonts,
  fontSizes,
  lineHeights,
  spacing,
});

export default styleguide;
