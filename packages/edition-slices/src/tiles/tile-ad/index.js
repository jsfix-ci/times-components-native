/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components-native/styleguide";
import {
  TileLink,
  TileSummary,
  withTileTracking,
  getTileSummary,
} from "../shared";
import stylesFactory from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";

const TileAD = ({ onPress, tile, breakpoint = editionBreakpoints.medium }) => {
  const styles = stylesFactory(breakpoint);
  const showSummary = ![
    editionBreakpoints.smallTablet,
    editionBreakpoints.medium,
  ].includes(breakpoint);

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <WithoutWhiteSpace
        style={styles.summaryContainer}
        render={whiteSpaceHeight => (
          <TileSummary
            headlineStyle={styles.headline}
            summary={showSummary ? getTileSummary(tile, 300) : null}
            summaryStyle={styles.summary}
            tile={tile}
            whiteSpaceHeight={whiteSpaceHeight}
          />
        )}
      />
    </TileLink>
  );
};

TileAD.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string,
};

export default withTileTracking(TileAD);
