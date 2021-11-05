/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";

import { FrontTileSummary } from "@times-components-native/front-page";

import { getTileImage, TileImage, TileLink, withTileTracking } from "../shared";
import styles from "./styles";

const TileGFront = ({ onPress, tile, numberOfLines, colWidth }) => {
  const crop = getTileImage(tile, "crop45");

  if (!crop) {
    return null;
  }

  const { article } = tile;

  console.log("COLWIDTH: ", colWidth);

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TileImage
        aspectRatio={4 / 5}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        hasVideo={article.hasVideo}
        hideVideoIcon
      />
      <FrontTileSummary
        headlineStyle={styles.headline}
        summary={article.content}
        summaryStyle={styles.summary}
        tile={tile}
        bylines={article.bylines}
        template={article.template}
        bylineMarginBottom={styles.bylineMarginBottom}
        headlineMarginBottom={styles.headlineMarginBottom}
        straplineMarginTop={0}
        straplineMarginBottom={0}
        summaryLineHeight={styles.summary.lineHeight}
        containerStyle={styles.summaryContainer}
        hasVideo={article.hasVideo}
        numberOfLines={numberOfLines}
        colWidth={colWidth}
      />
    </TileLink>
  );
};

TileGFront.defaultProps = {
  numberOfLines: 6,
  colWidth: 0,
};

TileGFront.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  orientation: PropTypes.oneOf(["portrait" | "landscape"]),
  numberOfLines: PropTypes.number,
  colWidth: PropTypes.number,
};

export default withTileTracking(TileGFront);
