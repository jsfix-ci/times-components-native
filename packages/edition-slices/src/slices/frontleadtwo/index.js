import React from "react";
import { ResponsiveSlice } from "@times-components-native/edition-slices/src/slices/shared";
import { FrontLeadTwoSlice } from "@times-components-native/slice-layout";
import { editionBreakpoints } from "@times-components-native/styleguide";
import {
  TileGFront,
  TileHFront,
} from "@times-components-native/edition-slices/src/tiles";
import InTodaysEdition from "@times-components-native/in-todays-edition";
import { getDimensions } from "@times-components-native/utils";

function renderMedium(props, breakpoint, orientation) {
  const { width: windowWidth } = getDimensions();
  const {
    onPress,
    onLinkPress,
    slice: { lead1, lead2 },
    inTodaysEditionSlice: { items: inTodaysEditionItems },
  } = props;

  const showSummary =
    breakpoint === editionBreakpoints.huge && orientation === "landscape";

  const showByline =
    (breakpoint === editionBreakpoints.huge && orientation === "landscape") ||
    (orientation === "portrait" && windowWidth >= 834);

  return (
    <FrontLeadTwoSlice
      lead1={
        <TileHFront
          onPress={onPress}
          tile={lead1}
          tileName="lead1"
          orientation={orientation}
        />
      }
      lead2={
        <TileGFront
          onPress={onPress}
          tile={lead2}
          tileName="lead2"
          orientation={orientation}
          showSummary={showSummary}
          showByline={showByline}
        />
      }
      inTodaysEdition={
        <InTodaysEdition
          items={inTodaysEditionItems}
          onArticlePress={onPress}
          onLinkPress={onLinkPress}
          orientation={orientation}
        />
      }
      breakpoint={breakpoint}
      orientation={orientation}
    />
  );
}

const FrontLeadTwo = (props) => {
  const renderSlice = (breakpoint, orientation) =>
    renderMedium(props, breakpoint, orientation);

  return (
    <ResponsiveSlice
      renderSmall={renderSlice}
      renderMedium={renderSlice}
      renderWide={renderSlice}
      renderHuge={renderSlice}
      grow
    />
  );
};

export default FrontLeadTwo;