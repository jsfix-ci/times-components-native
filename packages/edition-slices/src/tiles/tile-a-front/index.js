/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { FrontTileSummary } from "@times-components-native/front-page";
import {
  getTileImage,
  TileLink,
  withTileTracking,
  TileImage,
  getTileStrapline,
} from "../shared";
import styles from "./styles";

const getAspectRatio = (crop) => (crop === "crop32" ? 3 / 2 : 5 / 4);

const TileAFront = ({ onPress, tile, orientation, colWidth }) => {
  const isPortrait = orientation === "portrait";
  const columnCount = isPortrait ? 2 : 1;
  const crop = isPortrait ? "crop32" : "crop54";
  const imageCrop = getTileImage(tile, crop);

  if (!imageCrop) return null;

  const { article } = tile;

  let strapline = getTileStrapline(tile);
  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TileImage
        aspectRatio={getAspectRatio(crop)}
        relativeWidth={imageCrop.relativeWidth}
        relativeHeight={imageCrop.relativeHeight}
        relativeHorizontalOffset={imageCrop.relativeHorizontalOffset}
        relativeVerticalOffset={imageCrop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={imageCrop.url}
        hasVideo={article.hasVideo}
      />
      <FrontTileSummary
        containerStyle={styles.summaryContainer}
        headlineStyle={styles.headline}
        summary={article.content}
        summaryStyle={styles.summary}
        strapline={strapline}
        straplineStyle={styles.strapline}
        tile={tile}
        justified={columnCount > 1}
        columnCount={columnCount}
        bylines={article.bylines}
        bylineMarginBottom={styles.bylineMarginBottom}
        straplineMarginTop={styles.straplineMarginTop}
        straplineMarginBottom={styles.straplineMarginBottom}
        headlineMarginBottom={styles.headlineMarginBottom}
        summaryLineHeight={styles.summary.lineHeight}
        colWidth={colWidth}
        numberOfLines={15}
      />
    </TileLink>
  );
};

TileAFront.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string,
  colWidth: PropTypes.number,
};

export default withTileTracking(TileAFront);
