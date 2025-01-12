import React from "react";
import PropTypes from "prop-types";
import { SupplementSecondaryFourSlice } from "@times-components-native/slice-layout";
import { TileAY } from "../../tiles";
import { ResponsiveSlice } from "../shared";

const SupplementSecondaryFour = props => {
  const render = breakpoint => {
    const {
      onPress,
      slice: { isConsecutive, secondary1, secondary2, secondary3, secondary4 },
    } = props;

    return (
      <SupplementSecondaryFourSlice
        breakpoint={breakpoint}
        isConsecutive={isConsecutive}
        secondary1={
          <TileAY
            breakpoint={breakpoint}
            onPress={onPress}
            tile={secondary1}
            tileName="secondary1"
          />
        }
        secondary2={
          <TileAY
            breakpoint={breakpoint}
            onPress={onPress}
            tile={secondary2}
            tileName="secondary2"
          />
        }
        secondary3={
          <TileAY
            breakpoint={breakpoint}
            onPress={onPress}
            tile={secondary3}
            tileName="secondary3"
          />
        }
        secondary4={
          <TileAY
            breakpoint={breakpoint}
            onPress={onPress}
            tile={secondary4}
            tileName="secondary4"
          />
        }
      />
    );
  };

  return <ResponsiveSlice renderSmall={() => null} renderMedium={render} />;
};

SupplementSecondaryFour.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    isConsecutive: PropTypes.bool,
    secondary1: PropTypes.shape({}).isRequired,
    secondary2: PropTypes.shape({}).isRequired,
    secondary3: PropTypes.shape({}).isRequired,
    secondary4: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default SupplementSecondaryFour;
