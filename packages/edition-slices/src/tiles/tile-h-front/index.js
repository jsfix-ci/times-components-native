/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { FrontTileSummary } from "@times-components-native/front-page";
import { getTileStrapline, TileLink } from "../shared";
import styles from "./styles";

const TileHFront = ({ onPress, tile, numberOfLines, colWidth }) => {
  const { article } = tile;

  const strapline = getTileStrapline(tile);

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <FrontTileSummary
        headlineStyle={styles.headline}
        headlineMarginBottom={styles.headlineMarginBottom}
        strapline={strapline}
        straplineStyle={styles.strapline}
        straplineMarginTop={styles.straplineMarginTop}
        straplineMarginBottom={styles.straplineMarginBottom}
        summary={article.content}
        summaryStyle={styles.summary}
        summaryLineHeight={styles.summary.lineHeight}
        bylines={article.bylines}
        bylineMarginBottom={styles.bylineMarginBottom}
        tile={tile}
        numberOfLines={numberOfLines}
        colWidth={colWidth}
      />
    </TileLink>
  );
};

TileHFront.defaultProps = {
  numberOfLines: 6,
  colWidth: 300,
};

TileHFront.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  numberOfLines: PropTypes.number,
  colWidth: PropTypes.number,
};

export default TileHFront;
