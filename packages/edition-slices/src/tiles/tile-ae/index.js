/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components-native/styleguide";
import {
  getTileSummary,
  TileLink,
  TileSummary,
  withTileTracking,
} from "../shared";
import stylesFactory from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";
import PositionedTileStar from "../shared/positioned-tile-star";

const TileAE = ({ onPress, tile, breakpoint = editionBreakpoints.medium }) => {
  const styles = stylesFactory(breakpoint);
  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <WithoutWhiteSpace
        render={whiteSpaceHeight => (
          <TileSummary
            headlineStyle={styles.headline}
            summary={getTileSummary(tile, 800)}
            summaryStyle={styles.summary}
            tile={tile}
            whiteSpaceHeight={whiteSpaceHeight}
            withStar={false}
            linesOfTeaserToRender={5}
          />
        )}
      />
      <PositionedTileStar articleId={tile.article.id} />
    </TileLink>
  );
};

TileAE.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string,
};

export default withTileTracking(TileAE);
